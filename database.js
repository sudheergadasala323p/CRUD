const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'sudheer1',
    password: 'Sudheer1@##$$$',
    database: 'dbSudheer1'
});

module.exports = db.promise();
