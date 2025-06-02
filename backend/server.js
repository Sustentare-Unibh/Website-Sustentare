const express = require("express")
const mysql = require("mysql2")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()
const PORT = 3000

// Conexão direta com banco MySQL da Railway
const db = mysql.createConnection({
  host: "mysql://root:qyEtPfqCXwzLsydEBmaBWrDKVtGNHVag@caboose.proxy.rlwy.net:30939/railway",
  port: 3306,
  user: "root",
  password: "oBholOMNblvITdSNJTrGQJLNazaPZdPD",
  database: "railway",
})

// Conecta ao banco
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err)
  } else {
    console.log("✅ Conectado ao banco MySQL na Railway!")
  }
})

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

// Rota de registro
app.post("/registrar", (req, res) => {
  const { nome, email, senha, rua, numero, bairro, cidade, estado } = req.body

  const sql = `
    INSERT INTO usuarios 
    (nome, email, senha, rua, numero, bairro, cidade, estado) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

  db.query(
    sql,
    [nome, email, senha, rua, numero, bairro, cidade, estado],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir dados:", err)
        return res.status(500).send("Erro ao registrar")
      }
      res.send("✅ Cadastro realizado com sucesso!")
    }
  )
})

// Inicia servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})
