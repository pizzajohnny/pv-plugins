const util = require('util');

async ({$log, $moment, $fs, actorName}) => {

    $log('Trying to get pg json data for ' + actorName);
    const promisifiedFs = util.promisify($fs.readFile);

    // edit this path 
    const jsonFilePath = "D:\\Programme\\pm.smoke-test\\pornstars.json"
    const jsonFileContent = await promisifiedFs(jsonFilePath);
  
    const jsonData = JSON.parse(jsonFileContent);

    const actor = jsonData.find(actor => actor.name.includes(actorName));

    if(actor === undefined) {
        $log('No actor found..')
        return {}
    }

    // the key values such as breast_size have to match the names in porn-manager
    const customFields = {
        breast_size: actor.breast_size,
        butt_size: actor.butt_size,
        ethnicity: actor.ethnicity,
        eye_color: actor.eye_color,
        hair_color: actor.hair_color,
        height_metric: actor.height_metric,
        nationality: actor.nationality,
        waist_size: actor.waist_size,
        weight_metric: actor.Weight_metric
    }
    
    const birthDate = $moment(actor.birth_date);

    $log(`name: ${actor.name}, birthDate: ${actor.birth_date}`)
    $log(customFields)

    return {
      bornOn: birthDate.valueOf(),
      description: actor.description,
      custom: customFields,
      name: actor.name
    }
  }
