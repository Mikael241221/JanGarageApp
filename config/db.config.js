// import the mysql2 module Promise wrapper
const mysql = require('mysql2/promise');
// Prepare connection parameters we use to connect to the database
const dbConfig = {
    connectionLimit: 10,
    password:process.env.DB_PASS,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,

    port: process.env.DB_PORT,
};

// Create a connection pool to the database using the connection parameters
const pool = mysql.createPool(dbConfig);

// prepare a function that will excute the sql query asynchronouly
async function query(sql, params) {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
}

// Export the query function for use in the application
module.exports = { query };