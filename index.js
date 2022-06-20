const express = require('express')
var mysql = require('mysql2');

const app = express()
const port = 3000

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database: 'sistema_noticias'
  });

connection.connect();  

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/news-api/v1/categorias', (req, res) => {

    connection.query('SELECT id, nome FROM sistema_noticias.categoria', function(err, rows, fields) {
        if (err) throw err;

        res.send(rows)
              });

    
    
})
app.get('/news-api/v1/categorias/:categoriaid/noticias', (req, res) => {


    
    
    connection.query('SELECT id, title FROM  sistema_noticias.noticia WHERE id_categoria = ' + req.params.categoriaid, function(err, rows, fields) {
        if (err) throw err;

        res.send(rows)
              });

    
    
})

app.get('/news-api/v1/categorias/:categoriaid/noticias/:noticiaid', (req, res) => {


    
    
    connection.query('SELECT id, title, content FROM  sistema_noticias.noticia WHERE id_categoria = ' + req.params.categoriaid + ' AND id = ' + req.params.noticiaid, function(err, rows, fields) {
        if (err) throw err;

        res.send(rows[0])
              });

    
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})