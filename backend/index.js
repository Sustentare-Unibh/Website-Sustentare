const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Usar body-parser para ler o corpo das requisições JSON
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    if (email === "teste@dominio.com" && senha === "senha123") {
        res.json({ sucesso: true, mensagem: 'Login realizado com sucesso!' });
    } else {
        res.json({ sucesso: false, mensagem: 'Email ou senha inválidos' });
    }
});

// Definir uma rota para a raiz (GET /)
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando!');
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
