<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $rua = $_POST['rua'];
    $numero = $_POST['numero'];
    $bairro = $_POST['bairro'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];

    $conn = new mysqli("localhost", "usuario", "senha", "nome_do_banco");

    if ($conn->connect_error) {
        die("Erro de conexão: " . $conn->connect_error);
    }

    $sql = "INSERT INTO usuarios (nome, email, senha, rua, numero, bairro, cidade, estado)
            VALUES ('$nome', '$email', '$senha', '$rua', '$numero', '$bairro', '$cidade', '$estado')";

    if ($conn->query($sql) === TRUE) {
        echo "Cadastro realizado com sucesso!";
    } else {
        echo "Erro ao cadastrar: " . $conn->error;
    }

    $conn->close();
}
?>
