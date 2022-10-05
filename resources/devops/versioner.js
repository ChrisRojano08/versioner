require('shelljs-plugin-inspect');
const shell = require('shelljs');
var regex = new RegExp("^[0-9].[0-9].[0-9]");

//Get and validate version from last autoversioner commit
let versionAct = validateVer('git log --author="autoversioner" -n 1', regex);
if(versionAct !== '-1'){
    // Verify to prevent duplicated folder
    if(!existsFolder(versionAct)){
        //Create folder
        createVer(versionAct);

        // Push new folder changes in release branch
        makeCommit(versionAct, 'release');

        // Get hash from last commit
        hashComm = obtainHash();

        // Change to master and pull folder changes
        shell.exec('git checkout master');
        shell.exec('git cherry-pick '+hashComm);
        makeCommit(versionAct, 'master');

        // Change to dev and pull folder changes
        shell.exec('git checkout dev');
        shell.exec('git cherry-pick '+hashComm);
        makeCommit(versionAct, 'dev');

    }else{
        throw 'Version already exists!';
    }
}else{
    throw 'Cannot obtain new version!';
}

function createVer(version){
    shell.exec("mkdir "+version);

    if(existsFolder(version)){
        shell.exec("cp -r files/* "+version+"/ ");

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

    const version = ultimoCommit.substring(result+16, ultimoCommit.length-1);
    if(!regex.test(version)){
        return '-1';
    }else{
        return version;
    }
}

function makeCommit(msg, branch){
    shell.exec("git add .");
    shell.exec("git commit -m "+msg);
    shell.exec("git push origin "+branch);
}

function obtainHash(){
    ultimoCommit = shell.exec('git log -n 1');

    const commitSplit = ultimoCommit.split(' ');
    console.log(commitSplit[1]);

    return commitSplit[1];
}
