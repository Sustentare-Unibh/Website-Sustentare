require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARES (ORDEM CORRIGIDA)
// ============================================

// 1. Configuração CORS personalizada
app.use(cors({
  origin: ['http://127.0.0.1:5502', 'http://localhost:5500', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 2. Pré-flight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  res.status(204).send();
});

// 3. Parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 4. Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// ============================================
// CONFIGURAÇÃO DO BANCO DE DADOS
// ============================================

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "mysqlsustentareserver.mysql.database.azure.com",
  user: process.env.DB_USER || "mysqlsustentareserver",
  password: process.env.DB_PASSWORD || "Azure123$",
  database: process.env.DB_NAME,
  port: 3306,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, 'DigiCertGlobalRootCA.crt.pem'))
  }
});

// Teste de conexão com o banco
db.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('✅ Banco de dados conectado com sucesso! Resultado do teste:', results[0].solution);
  }
});

// ============================================
// ROTAS SIMPLIFICADAS
// ============================================

// Rota de registro
app.post("/registrar", (req, res) => {
  const { nome, email, senha, rua, numero, bairro, cidade, estado } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
  }

  const sql = `INSERT INTO usuarios (nome, email, senha, rua, numero, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [nome, email, senha, rua, numero, bairro, cidade, estado], (err, result) => {
    if (err) {
      console.error("Erro ao inserir dados:", err);
      return res.status(500).json({ error: err.code === 'ER_DUP_ENTRY' ? "Email já cadastrado" : "Erro ao registrar" });
    }
    res.json({ success: "✅ Cadastro realizado com sucesso!" });
  });
});

// Rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  
  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  
  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    
    res.json({ 
      success: "✅ Login realizado com sucesso!",
      userId: results[0].id,
      userName: results[0].nome
    });
  });
});

// Rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Erro no servidor:', err.stack);
  res.status(500).send('Erro interno do servidor!');
});