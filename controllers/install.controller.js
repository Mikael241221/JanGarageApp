// import the install service to handle communication with the database
const installService = require('../services/install.service');
// create a function to handle the install request
async function install(req, res, next) {
    // call the install service to create the database tables
    const installMessage = await installService.install();
    // check if the install was successful or not and send the appropriate response
    if (installMessage.status == 200) {
        res.status(200).json({
            message: installMessage
        }); 
    } else{
        res.status(500).json({
            message: installMessage
        });
    }

}
// export the install function for use in the application
module.exports = { install };


