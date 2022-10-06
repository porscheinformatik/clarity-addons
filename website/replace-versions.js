const { open, writeFile, readFile } = require('fs');
const { exit } = require('process');

const handleError = err => {
  if (err) {
    console.error(err);
    exit(1);
  }
};

readFile('../package.json', 'utf-8', (err, data) => {
  handleError(err);
  const packageJson = JSON.parse(data);
  const addonsVersion = packageJson.version;
  const clarityVersion = packageJson.dependencies['@clr/angular'];

  const envFile = './src/environments/environment.prod.ts';
  readFile(envFile, 'utf-8', (err, data) => {
    handleError(err);
    data = data.replace('@ADDONS_VERSION', addonsVersion);
    data = data.replace('@CLARITY_VERSION', clarityVersion);
    writeFile(envFile, data, 'utf-8', handleError);
  });
});
