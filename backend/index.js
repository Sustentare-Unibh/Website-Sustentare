const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../public')));

const usuarios = []; // Armazena usuários em memória

// Rota de teste
app.get('/api', (req, res) => {
  res.send('API Sustentare rodando!');
});

// Cadastro
app.post('/registrar', (req, res) => {
  const { nome, email, senha, rua, numero, bairro, cidade, estado } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).send('Preencha todos os campos obrigatórios.');
  }
  if (usuarios.find(u => u.email === email)) {
    return res.status(409).send('Email já cadastrado.');
  }
  usuarios.push({ nome, email, senha, rua, numero, bairro, cidade, estado });
  res.send('Usuário cadastrado com sucesso!');
});

// Login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (!usuario) {
    return res.status(401).send('Email ou senha inválidos.');
  }
  res.send('Login realizado com sucesso!');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});