let {
    promisify
} = require('util');
let path = require('path')
let fs = require('fs');
let readdir = promisify(fs.readdir);
let stat = promisify(fs.stat);
async function getFilesDeep(dir) {
    let subdirs = await readdir(dir);
    let files = await Promise.all(subdirs.map(async (subdir) => {
        let res = path.resolve(dir, subdir);
        return (await stat(res)).isDirectory() ? getFilesDeep(res) : res;
    }));
    return files.reduce((a, f) => a.concat(f), []);
}

module.exports = {
    getFilesDeep
}