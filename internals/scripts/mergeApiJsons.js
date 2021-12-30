const fs = require('fs');
const glob = require('glob');

const output = {};

glob('src/**/*.api.json', (error, files) => {
  files.forEach((filename) => {
    const contents = JSON.parse(fs.readFileSync(filename, 'utf8'));
    Object.assign(output, contents);
  });

  const orderedOutput = {};
  Object.keys(output)
    .sort()
    .forEach((key) => {
      orderedOutput[key] = output[key];
    });

  // The output below would show the API endpoints being used during the build process
  console.log(orderedOutput);

  fs.writeFileSync(
    'src/app/config/autoGenApiEndpoints.json',
    JSON.stringify(orderedOutput, null, 2),
  );
});
