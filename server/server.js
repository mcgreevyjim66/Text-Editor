// Importing the Express module, a popular web framework for Node.js.
const express = require('express');

// Creating an instance of an Express application.
const app = express();
// Setting the port for the server to listen on. It uses the PORT environment variable or defaults to 3000 if PORT isn't set.
const PORT = process.env.PORT || 3000;

// Serving static files from the '../client/dist' directory. This is typically where the built files of a client-side application reside.
app.use(express.static('../client/dist'));
// Enabling Express to parse URL-encoded bodies (form data).
app.use(express.urlencoded({ extended: true }));
// Enabling Express to parse JSON bodies, which is useful for API requests that send JSON data.
app.use(express.json());

// Requiring the HTML routes module and passing the Express app to it for route configuration.
require('./routes/htmlRoutes')(app);

// Starting the Express server on the specified PORT and logging a message to the console when the server starts.
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
