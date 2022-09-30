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
    const fs = require("fs");
    
    shell.exec("version=`git log --author=\"autoversioner\" -n 1`");
    shell.exec("echo $version > version.txt");
    
    const ultimoCommit = fs.readFile("version.txt", 'utf-8');

    console.log('ultimoCommit');
    console.log(ultimoCommit);

    const result = ultimoCommit.indexOf("chore(release)");

    if(result === -1){
        return '-1';
    }

    const version = ultimoCommit.substring(result+16, result+21);
    
    console.log('version');
    console.log(version);
    
    if(!regex.test(version)){
        return '-1';
    }else{
        return version;
    }
}
