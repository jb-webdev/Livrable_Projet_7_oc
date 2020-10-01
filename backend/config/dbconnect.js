const mysql = require("mysql");
const express = require('express');

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

