// scripts/auth.js

// ========== REGISTRO ========== //
document.addEventListener('DOMContentLoaded', () => {
  const formCadastro = document.getElementById('form-cadastro');
  
  if (formCadastro) {
    formCadastro.addEventListener('submit', handleRegistro);
  }

  // Configurar botão de logout
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }

  // Verificar status de autenticação
  checkAuthStatus();
});

async function handleRegistro(event) {
  event.preventDefault();
  
  const dados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    senha: document.getElementById('senha').value,
    rua: document.getElementById('rua').value,
    numero: document.getElementById('numero').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value
  };

  try {
    const res = await fetch('http://localhost:3000/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error || 'Erro no cadastro');
    }
    
    alert('✅ Cadastro realizado com sucesso!');
    window.location.href = './login.html';
  } catch (err) {
    console.error('Erro no registro:', err);
    alert(`Erro: ${err.message}`);
  }
}

// ========== LOGIN ========== //
async function fazerLogin(event) {
  if (event) event.preventDefault();
  
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error || 'Credenciais inválidas');
    }
    
    // Salvar estado de autenticação
    localStorage.setItem('isAuthenticated', 'true');
    updateAuthUI();
    
    alert('✅ Login realizado com sucesso!');
    window.location.href = './index.html';
  } catch (err) {
    console.error('Erro no login:', err);
    alert(`Erro: ${err.message}`);
  }
}

// ========== LOGOUT ========== //
function logout() {
  localStorage.removeItem('isAuthenticated');
  updateAuthUI();
  window.location.href = './index.html';
}

// ========== GERENCIAMENTO DE UI ========== //
function checkAuthStatus() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (isAuthenticated) {
    updateAuthUI();
  }
}

function updateAuthUI() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const cadastroButton = document.getElementById('CadastroButton');
  const loginButton = document.getElementById('loginButton');
  const logoutButton = document.getElementById('logoutButton');

  if (cadastroButton && loginButton && logoutButton) {
    if (isAuthenticated) {
      cadastroButton.style.display = 'none';
      loginButton.style.display = 'none';
      logoutButton.style.display = 'block';
    } else {
      cadastroButton.style.display = 'block';
      loginButton.style.display = 'block';
      logoutButton.style.display = 'none';
    }
  }
}

// ========== EXPORTAR FUNÇÕES PARA HTML ========== //
// Necessário para que as funções sejam acessíveis via onclick no HTML
window.registrarConta = handleRegistro;
window.fazerLogin = fazerLogin;
window.logout = logout;