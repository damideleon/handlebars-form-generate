const dotenv = require('dotenv')
dotenv.config();

//console.log(process.env)

var mysql      = require('mysql2');

const pool = mysql.createPool({
  host: 'mysql.database',
  user: 'root',
  database: 'OBAcapuedo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = {
    query : (query, params, callback) =>{
        return pool.query(query, params, callback);
    }
};