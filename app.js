// import the express module
const express = require('express');
// import the dotenv module to load environment variables from a .env file
require('dotenv').config();
// create a variable to hold the port number
const PORT = process.env.PORT;
// import the router
const router = require('./routes');
// create a web server 
const app = express();
// add the router to the application as middleware
app.use(router);
// start the web server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// export the web server for use in the application
module.exports = app;