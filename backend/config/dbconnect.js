const mysql = require("mysql");
const express = require('express');
// rajouter un mots de passe robuste  à la ligne 8
// pour sécuriser la connection à la base de données très très important 
// préconiser une injection de variable
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "groupomaniadb"
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;

