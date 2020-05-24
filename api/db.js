'use strict';
const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: process.env.DB_HOST || "us-cdbr-east-06.cleardb.net",
//     //port: process.env.DB_PORT || "3306",
//     user: process.env.DB_USER || "b406b4c927e28e",
//     password: process.env.DB_PASSWORD || "eaf6ae71",
//     database: process.env.DB_NAME || "heroku_e57f098503ff54d"
// });
// module.exports = db
var db_config = {
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b406b4c927e28e',
    password: 'eaf6ae71',
    database: 'heroku_e57f098503ff54d'
};
//23/05 
  var connection;
  
  function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  
  handleDisconnect();
module.exports = connection

// let pool = mysql.createPool(db_config);

// pool.on('connection', function (_conn) {
//     if (_conn) {
//         logger.info('Connected the database via threadId %d!!', _conn.threadId);
//         _conn.query('SET SESSION auto_increment_increment=1');
//     }
// });