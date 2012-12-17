var mysql = require('mysql');
//var connection = mysql.createConnection('mysql://root:111111@localhost/demo');
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '111111',
      database : 'demo',
    }
);
 
connection.connect();

var queryString = 'SELECT * FROM customer';

var insertString = 'insert into customer(name) values(?)';

var delString = "delete from customer where name = ?";

connection.query(insertString,['hahah']);

connection.query(delString,['hahah']);

connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log(rows[i].customer_id+':'+ rows[i].name);
    }
});



connection.end();