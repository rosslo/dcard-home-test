require('app-module-path').addPath(require('path').join(__dirname, '..'));
require('babel-register')({
  presets: [ 'env' ],
})

// Import the rest of our application.
module.exports = require('./server.js')
