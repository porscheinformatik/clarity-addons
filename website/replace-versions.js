const { open, writeFile, readFile } = require('fs');
const { exit } = require('process');

const handleError = err => {
  if (err) {
    console.error(err);
    exit(1);
  }
};

readFile('package-lock.json', 'utf-8', (err, data) => {
  handleError(err);
  const json = JSON.parse(data);
  const addonsVersion = json.packages['../dist/clr-addons'].version;
  const angularVersion = json.packages['node_modules/@angular/core'].version;
  const clarityVersion = json.packages['node_modules/@clr/angular'].version;
  const envFile = './src/environments/environment.prod.ts';

  readFile(envFile, 'utf-8', (err, data) => {
    handleError(err);
    data = data.replace('@ADDONS_VERSION', addonsVersion);
    data = data.replace('@ANGULAR_VERSION', angularVersion);
    data = data.replace('@CLARITY_VERSION', clarityVersion);
    writeFile(envFile, data, 'utf-8', handleError);
  });
});
