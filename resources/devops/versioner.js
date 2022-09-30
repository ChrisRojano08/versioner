const shell = require('shelljs');
var regex = new RegExp("^[0-9].[0-9].[0-9]");

let versionAct = validateVer(regex);
if(versionAct !== '-1'){
    createVer(versionAct);
}/*else{
    versionAct = validateVer('git log -n 3', regex);

    if(versionAct !== '-1'){
        createVer(versionAct);
    }
}*/


function createVer(version){
    console.log('version')
    console.log(version)

    console.log('ls -l')
    console.log(shell.exec('ls -l'));
}

function validateVer(regex){
    shell.exec("version=`git log --author=\"autoversioner\" -n 1`");
    shell.exec("echo $version");
    shell.exec("echo $version > version.txt");
    shell.exec("folderName=`tail -c 6 version.txt`");
    shell.exec("echo $folderName");
    shell.exec("sudo mkdir $folderName");
    shell.exec("sudo cp -r files/* $folderName/");
    
    shell.exec("ls -l");
}
