const shell = require('shelljs');
const ultimoCommit = shell.exec('git log -n 1');
const keyA = '[';
const commit = ultimoCommit.replace(/(\r\n|\n|\r)/gm, "<->");
const commitSplit = commit.split('<->');
const [filter=''] = commitSplit
    .filter(item =>
        (item.includes(keyA)))
    .map(item => item.trim());
console.log("Filter",filter);

switch (true) {
    case filter.includes('[major]'):
    case filter.includes('[release]'):
        console.log('version X.0.0');
        shell.exec('npm run release -- --release-as major');
        break;
    case filter.includes('[feature]'):
        console.log('version 0.X.0');
        shell.exec('npm run release -- --release-as minor');
        break;
    case filter.includes('[fix]'):
    case filter.includes('[hotfix]'):
    case filter.includes('[patch]'):
    case filter.includes('[minor]'):
        console.log('version 0.0.X');
        shell.exec('npm run release -- --release-as patch');
        break;
    default:
        console.log('version 0.0.X default');
        shell.exec('npm run release -- --release-as patch');
        break;
}