// Import the express module
const express = require('express');
// call the router method from the express to create the router object
const router = express.Router();
// Import the install routes module
const installRouter = require('./install.routes');
// add the install router to the main router 
router.use(installRouter);
// export the router
module.exports = router;
