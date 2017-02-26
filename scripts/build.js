/* global ShellString:false, test:false exec:false mv:false */
require('shelljs/global');
const chalk = require('chalk');
const dedent = require('dedent');
const path = require('path');
const manifest = require('../src/manifest.json');
const meta = require('../package.json');

let p = fn => path.resolve(__dirname, fn);
let log = {
  info: s => console.info(s.trim()),
  error: s => console.error(chalk.red(s.trim())),
  warn: s => console.warn(chalk.yellow(s.trim()))
};

// safety check
if (process.platform === 'win32') {
  console.log(chalk.red('Windows is not supported.'));
}

// get app name, refresh manifest
let appName = meta.name.replace(/^@[^/]*\//, '').replace(/\.ext$/, '');
manifest.version = meta.version;
manifest.description = meta.description;
manifest.name = appName;
ShellString(JSON.stringify(manifest, null, '  ')).to(p('../src/manifest.json'));

// check for private key
// see also: https://support.google.com/gsa/answer/6055166?hl=en
if (!test('-e', p(`../${appName}.pem`))) {
  log.warn(`Private key "${appName}.pem" not found!`);
  log.info(dedent`
    I will try to generate one with openssl, which will
    be gitignored and must be kept in a safe place.
  `);
  exec(`openssl genrsa -out ${appName}.pem 2048`);
}

// the script uses xxd
if (exec('which xxd', { silent: true }).code !== 0) {
  log.error('Vim not installed, xxd binary not found.');
}

// call the bash script
let crxMakeResult = exec(p('./crxmake.sh') + ` src ${appName}.pem`, { silent: true });
if (crxMakeResult.code !== 0) {
  log.error('Crxmake failed, sorry.');
  log.error(crxMakeResult.stderr);
  process.exit(1);
}

// move the dumped file into build
mv('src.crx', `build/${appName}.crx`);
