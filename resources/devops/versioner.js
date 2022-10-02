require('shelljs-plugin-inspect');

const shell = require('shelljs');
var regex = new RegExp("^[0-9].[0-9].[0-9]");

let versionAct = validateVer('git log --author="autoversioner" -n 1', regex);
if(versionAct !== '-1'){
    if(!existsFolder(versionAct)){
        createVer(versionAct);
    }else{
        throw 'Version already exists!';
    }
}else{
    throw 'Cannot obtain new version!';
}

function createVer(version){
    console.log('version')
    console.log(version)

    shell.exec("mkdir "+version);

    if(existsFolder(version)){
        shell.exec("cp -r files/* "+version+"/ ");

        shell.exec("git add .");
        shell.exec("git commit -m "+version);
        shell.exec("git push origin master");

        console.log("********** New version created successfully **********")
    }else{
        throw 'An error has ocurred creating new version!';
    }
}

function existsFolder(version){
    const listF = shell.exec("ls");

    if(listF.indexOf(version) !== -1){ return true; }
    return false;
}

function validateVer(commit, regex){
    const ultimoCommit = shell.exec(commit);
    const result = ultimoCommit.indexOf("chore(release)");

    if(result === -1){
        return '-1';
    }

    const version = ultimoCommit.substring(result+16, result+21);
    
    if(!regex.test(version)){
        return '-1';
    }else{
        return version;
    }
}
