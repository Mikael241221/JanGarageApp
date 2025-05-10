// import the query function from the db.config.js file
const conn = require('../config/db.config');
// import the fs module to read the sql file
const fs = require('fs');
// write a function to create the database tables
async function install() {
    // create avariable to hold the sql file path
    const queryFile = __dirname + '/sql/initial-queries.sql';

     console.log(queryFile);
    // temorarry varriable used to store all queries the return message current query
    let queries = [];
    let finalMessage = {};
    let templine = '';
    // read the sql file
    const lines = fs.readFileSync(queryFile, 'utf-8').split('\n');
    // create  a promise to handle the asynchronous reading of the file 
    const executed = await new Promise((resolve, reject) => {
        // iterate over all lines
        lines.forEach((line) => {
            if(line.trim().startsWith('--') || line.trim() == '') {
                // skip the comment lines and empty lines
                return;
            }
            templine += line;
            if(line.trim().endsWith(';')) {
                // if the line ends with a semicolon, it means the end of the query
                // prepare the individual query to be executed
                const sqlQuery = templine.trim();
                // add queries to the list of queries
                queries.push(sqlQuery); 
                
                templine = ''; 
            }
        });
        // resolve the promise with the list of queries
        resolve("Queries are added to the list");
    });
    // loop thourgh the queries and execute these one by one asyncronously
    for (let i = 0; i < queries.length; i++) {
        try{
        const result = await conn.query(queries[i]);
        console.log("table created successfully");

        }catch(err){
        //console.log("Error  occured table not created",err.message)
       finalMessage.message = "not all tables are created successfully";
        finalMessage.error = err.message;

        }
    }
    // prepare the final message to return to the controller
    if (!finalMessage.message) {
        finalMessage.message = "All tables are created successfully";
        finalMessage.status = 200;

    }else{
        finalMessage.status = 500;
    }
    // return the final message to the controller
    return finalMessage;
}
// export the install function for use in the controller
module.exports = { install };