require('shelljs-plugin-inspect');

const shell = require('shelljs');
var regex = new RegExp("^[0-9].[0-9].[0-9]");

let versionAct = validateVer('echo `git log --author="autoversioner" -n 1` > version.txt', regex);
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
}

function validateVer(commit, regex){
    shell.exec(commit);
    const ultimoCommit = shell.cat("version.txt");

    console.log(ultimoCommit)

    const result = ultimoCommit.indexOf("chore(release)");

    if(result === -1){
        return '-1';
    }

    const version = ultimoCommit.substring(result+16, result+21);
    
    shell.exec("echo `tail -c 6 version.txt`");
}
