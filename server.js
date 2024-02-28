const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_db',
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/entries', (req, res) => {
    let sql = 'SELECT * FROM entries';

    if (req.query.title || req.query.author || req.query.content) {
        sql += ' WHERE ';
        const conditions = [];

        if (req.query.title) {
            conditions.push(`title LIKE '%${req.query.title}%'`);
        }

        if (req.query.author) {
            conditions.push(`author LIKE '%${req.query.author}%'`);
        }

        if (req.query.content) {
            conditions.push(`content LIKE '%${req.query.content}%'`);
        }

        sql += conditions.join(' AND ');
    }

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al obtener las entradas:', err);
            res.status(500).send('Error al obtener las entradas');
        } else {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});

app.post('/entries', (req, res) => {
    const { title, author, content } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({ error: 'Se requieren los campos title, author y content.' });
    }

    const sql = 'INSERT INTO entries (title, author, content) VALUES (?, ?, ?)';
    const values = [title, author, content];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al agregar una nueva entrada:', err);
            res.status(500).send('Error al agregar una nueva entrada');
        } else {
            res.status(201).json({ message: 'Nueva entrada agregada con éxito.' });
        }
    });
});

app.get('/entries/:id', (req, res) => {
    const entryId = req.params.id;

    if (!entryId) {
        return res.status(400).json({ error: 'Se requiere proporcionar una ID de entrada.' });
    }

    const sql = 'SELECT * FROM entries WHERE id = ?';

    db.query(sql, [entryId], (err, result) => {
        if (err) {
            console.error('Error al obtener detalles de la entrada:', err);
            res.status(500).send('Error al obtener detalles de la entrada');
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'No se encontró la entrada con la ID proporcionada.' });
            } else {
                res.json(result[0]);
            }
        }
    });
});