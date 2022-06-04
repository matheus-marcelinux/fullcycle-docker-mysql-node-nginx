const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');

const sql = `INSERT INTO people(name) values ('Matheus')`;

app.get("/", (req, res) => {
    var response = '<h1> Full Cycle Rocks!</h1>';
    conn = mysql.createConnection(config);
    conn.query(sql);
    conn.query("SELECT * FROM people", function (err, result, fields) {
        response += '<table><tr><td>ID</th><th>Name</th></tr>';
        if (err) throw err;
        result.forEach(function(value){
            response += '<tr><td>' + value.id + '</td><td>' + value.name + '</td></tr>';
        });
        response += '</table>';
        conn.end();
        res.send(response);
    });
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})