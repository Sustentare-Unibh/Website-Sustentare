<?php

$dbhost = 'localhost;
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'cadastro-sustentare';


$conexao = new mysqli($dbhost,$dbUsername,$dbPassword,$dbName);

if(conexao->connect_errno)
{
    echo "Erro";
}
else
{
    echo "Conexão efetuada com sucesso"
}
    
?>
