/backend
│
├── node_modules/                 # Dependências do Node.js
├── package-lock.json             # Lockfile do Node.js
├── package.json                  # Configurações e dependências do projeto
├── server.js                     # Arquivo principal do servidor
├── /controllers                  # (Sugestão futura) Lógica dos controladores
├── /models                       # (Sugestão futura) Modelos de dados / banco
├── /routes                       # (Sugestão futura) Rotas da API
└── /middlewares                  # (Sugestão futura) Middlewares personalizados

/frontend
│
├── /pages                        # Páginas específicas do sistema
│   └── /Cadastro
│       ├── create-account.html   # Tela de criação de conta
│       ├── login.html           # Tela de login
│       └── map.html             # Tela de mapa
│
├── /public                       # Arquivos públicos e estáticos
│   ├── /components               # (Sugestão futura) Componentes reutilizáveis
│   │   └── ...                   # Ex: header.html, footer.html
│   │
│   ├── /css                     # Estilos do projeto
│   │   ├── index.css
│   │   ├── map.css
│   │   └── reset.css
│   │
│   ├── /img                     # Imagens usadas no frontend
│   │   └── ...                   # Ex: logos, ícones
│   │
│   └── /js                      # Scripts JS
│       ├── map.js
│       └── index.js             # (Sugestão futura) Script principal
│
└── index.html                    # Página inicial / landing page
