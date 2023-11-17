// Importing the 'path' module, a core Node.js module used for handling and transforming file paths.
const path = require('path');

// Exporting a function that takes an Express app as an argument.
module.exports = (app) =>
  // Setting up a GET route for the root ('/') URL.
  app.get('/', (req, res) =>
    // Sending the 'index.html' file located in the '../client/dist' directory when the route is accessed.
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
