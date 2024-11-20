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
  let angularVersion = packageJson.dependencies['@angular/core'];
  let clarityVersion = packageJson.dependencies['@clr/angular'];
  let cdsCoreVersion = packageJson.dependencies['@cds/core'];

  if (angularVersion.indexOf('.') > 0) {
    angularVersion = angularVersion.substring(0, angularVersion.indexOf('.')) + '.0.0';
  }

  angularVersion = prependCaretIfMissing(angularVersion);
  clarityVersion = prependCaretIfMissing(clarityVersion);
  cdsCoreVersion = prependCaretIfMissing(cdsCoreVersion);

  const envFile = './src/clr-addons/package.json';
  readFile(envFile, 'utf-8', (err, data) => {
    handleError(err);
    data = data.replaceAll('@VERSION', addonsVersion);
    data = data.replaceAll('@ANGULAR_VERSION', angularVersion);
    data = data.replaceAll('@CLARITY_VERSION', clarityVersion);
    data = data.replaceAll('@CDS_CORE_VERSION', cdsCoreVersion);
    writeFile(envFile, data, 'utf-8', handleError);
  });
});

function prependCaretIfMissing(version) {
  return version.startsWith('^') ? version : '^' + version;
}
