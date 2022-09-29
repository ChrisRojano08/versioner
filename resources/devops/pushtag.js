const shell = require('shelljs');
const packageApp = require('../../package.json');
const {version} = packageApp;
shell.exec(`git tag -a v${version} -m "v${version}"`);
shell.exec('git push --follow-tags origin master');
console.log('push tag success');