const dotenv = require('dotenv').config();

const { Callbacks } = require('jquery');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE,
  port     : process.env.DB_PORT
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

module.exports = {
    query : (query, params, callback) =>{
        return connection.query(query, params, callback);
    }
};