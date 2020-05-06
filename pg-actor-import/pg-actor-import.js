const util = require('util');

module.exports = async ({args, $log, $moment, $fs, actorName}) => {

    if(args === undefined) {
      $log("No arguments provided!");
      return { }
    }
    $log(`verbose log enabled: ${args.verboseLog}`);
    $log('Trying to get data from pornganizer json for ' + actorName);
    const promisifiedFs = util.promisify($fs.readFile);

    const pornstarFilePath = args.pornstarFilePath;
    const keyFilePath = args.keyFilePath;

    $log(`pornstarFilePath: ${pornstarFilePath}`)
    $log(`keyFilePath: ${keyFilePath}`)

    const actorJson = await promisifiedFs(pornstarFilePath);
    const keyFileJson = await promisifiedFs(keyFilePath);

    const actorData = JSON.parse(actorJson);
    const keys = JSON.parse(keyFileJson);
    const customFieldKeys = keys.customFieldKeys;
    const pornganizerKeys = keys.pornganizerKeys;

    if(1==2) {
      $log("Keys for CustomFields and / or Pornganizer are missing!")
      return { }
    }

    if(args.verboseLog) {
      $log("keys");
      $log(keys);
      $log("customFieldKeys");
      $log(customFieldKeys);
      $log("pornganizerKeys");
      $log(pornganizerKeys);
    }

    const actor = actorData.find(actor => actor[pornganizerKeys.name].includes(actorName));
    if(args.verboseLog)
      $log(actor);

    if(actor === undefined) {
        $log('No actor found..');
        return {}
    }    
    
    let customFields = new Object();
    for(let customKey in customFieldKeys) {
      if(args.verboseLog)
        $log(`customKey: ${customKey}`);

      for(let pornganizerKey in pornganizerKeys) {
        if(args.verboseLog)
          $log(`pornganizerKey: ${pornganizerKey}`);

        if(customKey === pornganizerKey) {
          if(args.verboseLog)
            console.log(`match! ${customKey} - ${pornganizerKey}`);

          const actorValue = actor[pornganizerKeys[pornganizerKey]];

          if(args.verboseLog)
            console.log(`actor value ${actorValue}`);
          
          customFields[customKey] = actorValue;
          break;
        }
      }
    }

    const birthDate = $moment(actor[pornganizerKeys.birthDate]);

    $log(`name: ${actor[pornganizerKeys.name]}, birthDate: ${actor[pornganizerKeys.birthDate]}`);
    $log(customFields);

    return {
      bornOn: birthDate.valueOf(),
      description: actor[pornganizerKeys.description],
      custom: customFields,
      name: actor[pornganizerKeys.name]
    }
  }
