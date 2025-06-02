const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve arquivos HTML, CSS etc.

// Conexão com banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'cadastrodb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao banco MySQL!');
});

// Rota para registrar conta
app.post('/registrar', (req, res) => {
  const {
    nome, email, senha, rua,
    numero, bairro, cidade, estado
  } = req.body;

  const sql = `
    INSERT INTO usuarios 
    (nome, email, senha, rua, numero, bairro, cidade, estado) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [nome, email, senha, rua, numero, bairro, cidade, estado], (err, result) => {
    if (err) {
      console.error('Erro ao inserir:', err);
      return res.status(500).send('Erro ao registrar');
    }
    res.send('Cadastro realizado com sucesso!');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
