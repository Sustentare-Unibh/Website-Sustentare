// Importando dependências
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

// Inicializando o Express
const app = express();
const PORT = 3000;

// Usando middlewares
app.use(cors()); // Permite requisições de outros domínios
app.use(bodyParser.json()); // Permite que o servidor entenda JSON nas requisições

// Caminho para o arquivo onde os usuários serão armazenados
const dbPath = './usuarios.json';

// Rota para cadastrar um usuário
app.post('/api/usuarios', (req, res) => {
    const novoUsuario = req.body;

    // Validando os dados recebidos
    if (!novoUsuario.nome || !novoUsuario.email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
    }

    // Lendo os usuários já cadastrados
    let usuarios = [];
    if (fs.existsSync(dbPath)) {
        const dados = fs.readFileSync(dbPath);
        usuarios = JSON.parse(dados);
    }

    // Adicionando o novo usuário à lista
    usuarios.push(novoUsuario);

    // Salvando a lista de usuários de volta no arquivo
    fs.writeFileSync(dbPath, JSON.stringify(usuarios, null, 2));

    // Respondendo ao cliente que o usuário foi cadastrado com sucesso
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
