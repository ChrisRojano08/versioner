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
}

function validateVer(regex){
    shell.exec("echo `git log --author=\"autoversioner\" -n 1`");
    shell.exec("echo `git log --author=\"autoversioner\" -n 1` > version.txt");
    
    shell.exec("echo `tail -c 6 version.txt`");
    shell.exec("sudo mkdir `tail -c 6 version.txt`");
    
    shell.exec("sudo cp -r files/* `tail -c 6 version.txt`/");
    
    shell.exec("ls");
}
