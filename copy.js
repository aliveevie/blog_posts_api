const fs = require('fs-extra');

// Copy public files to the build directory
fs.copySync('public', './build');