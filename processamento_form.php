<?php
// Dados de conexão com o banco de dados
$host = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'cadastro-sustentare';

$conn = new mysqli($host, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

$nome   = $_POST['nome'];
$email  = $_POST['email'];
$rua    = $_POST['rua'];
$numero = $_POST['numero'];
$bairro = $_POST['bairro'];
$cidade = $_POST['cidade'];
$estado = $_POST['estado'];

$stmt = $conn->prepare("INSERT INTO usuarios (nome, email, rua, numero, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $nome, $email, $rua, $numero, $bairro, $cidade, $estado);

if ($stmt->execute()) {
    echo "Dados inseridos com sucesso!";
} else {
    echo "Erro ao inserir dados: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>