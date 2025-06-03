<?php
$servername = "mysqlsustentareserver.mysql.database.azure.com";
$username = "mysqlsustentareserver";
$password = "Azure123$";
$dbname = "cadastro-sustentare";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname, 3306, NULL, MYSQLI_CLIENT_SSL);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
echo "Conexão bem-sucedida ao Azure MySQL!";

// Exemplo de consulta
$sql = "SELECT * FROM produtos";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Nome: " . $row["nome"]. "<br>";
    }
} else {
    echo "0 resultados";
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cadastro</title>
    <link rel="stylesheet" href="./assets/css/pages/create_account/index.css" />
     <script src="scripts/auth.js" defer></script>
  </head>
  <body>
    <header class="main-header">
  <div class="top-header">
    <div class="logo">Sustentare</div>
    <div class="auth-buttons">
      <a href="./create_account.html" id="CadastroButton" class="button">Cadastrar</a>
      <a href="./login.html" id="loginButton" class="button">Login</a>
      <button id="logoutButton" class="button" style="display: none;" onclick="logout()">Sair</button>
    </div>
  </div>

  <nav class="main-nav">
    <ul>
      <li><a href="./index.html">Início</a></li>
      <li><a href="#">Sobre</a></li>
      <li><a href="#">Serviços</a></li>
      <li><a href="#">Contato</a></li>
      <li><a href="./map.html">Mapa</a></li>
    </ul>
  </nav>
</header>


    <main>
  <div class="form-container">
    <form action="cadastro.php" method="POST">
    <h2>Cadastro</h2>
    <p class="form-description">Preencha os campos abaixo para criar sua conta:</p>
    <br />
    <form onsubmit="registrarConta(); return false;">
      <!-- o # é o endereço que o dado sera enviado-->
      <div class="form-group">
        <label for="nome">Nome Completo</label>
        <input type="text" id="nome" name="nome" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="senha">Senha</label>
        <input type="password" id="senha" name="senha" required />
      </div>

      <div class="form-group">
        <label for="rua">Rua</label>
        <input type="text" id="rua" name="rua" required />
      </div>

      <div class="form-group">
        <label for="numero">Número</label>
        <input type="text" id="numero" name="numero" required />
      </div>

      <div class="form-group">
        <label for="bairro">Bairro</label>
        <input type="text" id="bairro" name="bairro" required />
      </div>

      <div class="form-group">
        <label for="cidade">Cidade</label>
        <input type="text" id="cidade" name="cidade" required />
      </div>

      <div class="form-group">
        <label for="estado">Estado</label>
        <select id="estado" name="estado" required>
          <option value="" disabled selected hidden>Selecione</option>
          <option value="AC">AC</option>
          <option value="AL">AL</option>
          <option value="AP">AP</option>
          <option value="AM">AM</option>
          <option value="BA">BA</option>
          <option value="CE">CE</option>
          <option value="DF">DF</option>
          <option value="ES">ES</option>
          <option value="GO">GO</option>
          <option value="MA">MA</option>
          <option value="MT">MT</option>
          <option value="MS">MS</option>
          <option value="MG">MG</option>
          <option value="PA">PA</option>
          <option value="PB">PB</option>
          <option value="PR">PR</option>
          <option value="PE">PE</option>
          <option value="PI">PI</option>
          <option value="RJ">RJ</option>
          <option value="RN">RN</option>
          <option value="RS">RS</option>
          <option value="RO">RO</option>
          <option value="RR">RR</option>
          <option value="SC">SC</option>
          <option value="SP">SP</option>
          <option value="SE">SE</option>
          <option value="TO">TO</option>
        </select>
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  </div>
</main>
    <footer>
      <div class="footer-container">
        <div class="footer-section">
          <h3>Sobre Nós</h3>
          <p>
            Somos uma empresa dedicada a fornecer as melhores soluções digitais
            para você.
          </p>
        </div>
        <div class="footer-section">
          <h3>Links Rápidos</h3>
          <ul>
            <li><a href="./index.html">Início</a></li>
            <li><a href="#">Serviços</a></li>
            <li><a href="#">Contato</a></li>
            <li><a href="#">Política de Privacidade</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Siga-nos</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2025 Sustentare. Todos os direitos reservados.
      </div>
    </footer>    
  </body>
  <script>
    function registrarConta() {
      const dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        rua: document.getElementById("rua").value,
        numero: document.getElementById("numero").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
      };
  
      fetch("/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      })
      .then(res => res.text())
      .then(msg => alert(msg))
      .catch(err => console.error("Erro:", err));
    }
  </script>
  
</html>