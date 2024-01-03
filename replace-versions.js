const { open, writeFile, readFile } = require('fs');
const { exit } = require('process');

const handleError = err => {
  if (err) {
    console.error(err);
    exit(1);
  }
};

readFile('./package.json', 'utf-8', (err, data) => {
  handleError(err);
  const packageJson = JSON.parse(data);
  const addonsVersion = packageJson.version;
  const clarityVersion = packageJson.dependencies['@clr/angular'];
  const cdsCoreVersion = packageJson.dependencies['@cds/core'];

  const envFile = './src/clr-addons/package.json';
  readFile(envFile, 'utf-8', (err, data) => {
    handleError(err);
    data = data.replaceAll('@VERSION', addonsVersion);
    data = data.replaceAll('@CLARITY_VERSION', clarityVersion);
    data = data.replaceAll('@CDS_CORE_VERSION', cdsCoreVersion);
    writeFile(envFile, data, 'utf-8', handleError);
  });
});
