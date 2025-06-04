<?php
$servername = "mysqlsustentareserver.mysql.database.azure.com";
$username = "mysqlsustentareserver";
$password = "Azure123$";
$dbname = "cadastro-sustentare";

$conn = new mysqli($servername, $username, $password, $dbname, 3306, NULL, MYSQLI_CLIENT_SSL);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
echo "Conexão bem-sucedida ao Azure MySQL!";

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