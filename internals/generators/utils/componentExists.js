/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const glob = require('glob');

const components = [];

glob(`${process.cwd()}/src/**/hoc/*`, (error, files) => {
  files.forEach(filename => {
    components.push(
      filename
        .split('/')
        .slice(-1)[0]
        .toLowerCase(),
    );
  });
});

glob(`${process.cwd()}/src/**/components/*`, (error, files) => {
  files.forEach(filename => {
    components.push(
      filename
        .split('/')
        .slice(-1)[0]
        .toLowerCase(),
    );
  });
});

if (process.env.APP_SHORT_NAME) {
  glob(`${process.cwd()}/src/**/screens/*`, (error, files) => {
    files.forEach(filename => {
      components.push(
        filename
          .split('/')
          .slice(-1)[0]
          .toLowerCase(),
      );
    });
  });
}

function componentExists(comp) {
  return components.indexOf(comp.toLowerCase()) >= 0;
}

module.exports = componentExists;
