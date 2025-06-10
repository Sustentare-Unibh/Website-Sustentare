require('dotenv').config(); // Adicione no topo para usar variáveis de ambiente
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs'); // Para ler o certificado SSL
const cors = require('cors'); // Adicione este pacote

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares ESSENCIAIS
app.use(cors()); // Habilita CORS para todas as rotas
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Configuração CORRETA para Azure MySQL
const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "mysqlsustentareserver.mysql.database.azure.com",
  user: process.env.DB_USER || "mysqlsustentareserver", // Formato obrigatório!
  password: process.env.DB_PASSWORD || "Azure123$",
  database: process.env.DB_NAME || "sustentare",
  port: 3306,
  ssl: {
    rejectUnauthorized: true,
     ca: fs.readFileSync(path.join(__dirname, '../BaltimoreCyberTrustRoot.crt.pem'))
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

// Rota de registro - CORRIGIDA
app.post("/registrar", (req, res) => {
  const { nome, email, senha, rua, numero, bairro, cidade, estado } = req.body;

  // Validação básica
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
  }

  const sql = `
    INSERT INTO usuarios 
    (nome, email, senha, rua, numero, bairro, cidade, estado) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nome, email, senha, rua, numero, bairro, cidade, estado],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir dados:", err);
        
        // Tratamento específico para email duplicado
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: "Email já cadastrado" });
        }
        
        return res.status(500).json({ error: "Erro ao registrar" });
      }
      res.json({ success: "✅ Cadastro realizado com sucesso!" });
    }
  );
});

// Rota de login - ADICIONADA
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
    
    res.json({ success: "✅ Login realizado com sucesso!" });
  });
});

// Rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota para servir arquivos JS corretamente
app.get("/scripts/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "scripts", req.params.filename), {
    headers: {
      'Content-Type': 'application/javascript'
    }
  });
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});