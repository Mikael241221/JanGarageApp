// import the express module
const express = require('express');
// call the router method from the express to create the router object
const router = express.Router();
// import the install controller
const installController = require('../controllers/install.controller');
// create a route to handle the install request on get
router.get('/install', installController.install);
// export the router 
module.exports = router;
