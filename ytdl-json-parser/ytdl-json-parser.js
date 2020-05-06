const util = require('util');

module.exports = async ({$log, $moment, $fs, sceneName, scenePath}) => {

    const tubeSites = [ "Pornhub", "XHamster", "Xvideos", "YouPorn"];
    const isTubeFile = tubeSites.some(site => scenePath.toLowerCase().includes(site.toLowerCase()));

    if(!isTubeFile) {
        $log(`Scene '${sceneName}' is not a scene from a tube site`);
        return {}
    }
  
    const tubeSite = tubeSites.filter(site => scenePath.toLowerCase().includes(site.toLowerCase()))[0];
    $log('tube site: ' + tubeSite);

    const promisifiedFs = util.promisify($fs.readFile);

    const jsonFilePath = scenePath.replace(".mp4", ".info.json");
    $log('filePath: ' + jsonFilePath);

    const jsonFileContent = await promisifiedFs(jsonFilePath);
  
    const jsonData = JSON.parse(jsonFileContent);
    const uploader = getUploader(tubeSite, jsonData);
    const date = $moment(jsonData.upload_date);
    $log(`uploader: ${uploader} | date: ${date} | title: ${jsonData.title} | studio: ${jsonData.extractor}`);
    
    function getUploader(site, data) {
        let uploaderName;
        switch (site) {            
            default: uploaderName = data.uploader; break;
        }
        return uploaderName;
    }
    
    return {
      releaseDate: date.valueOf(),
      name: jsonData.title,
      actors: [ uploader ],
      studio: jsonData.extractor,
      labels: [ "TubeSite" ]
      //link: jsonData.webpage_url
    }
  }
