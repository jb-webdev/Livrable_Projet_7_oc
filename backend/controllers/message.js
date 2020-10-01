const express       = require('express');
const mysql         = require('mysql');
const connection    = require('../config/dbconnect');
const bodyParser      = require('body-parser');
const { json } = require('body-parser');

exports.createMessage = (req, res, next) => {
  // je recuperer les parametre a enregistre dans la  BD
  const idAuthor          = req.body.idUser;
  const username          = req.body.username;
  const title             = req.body.title;
  const content           = req.body.content;
  const attachement       = req.body.attachement;
  const likes             =  0;

  if (title == null || content == null) {
      return res.status(403).json({ 'error': 'il manque des paramètres ! ...'})
    } else {
          //je recupere toutes les valeurs et je prépare avant l'enregistrement dans la BD
          const valuesCreate = [idAuthor, username, title, content, attachement, likes];
          // j'enregistre dans la base de donnée.
          connection.connect(function(err) {
              const sql = `INSERT INTO messages VALUES (NULL, ?);`;
              connection.query(sql, [valuesCreate], function (err, result) {
                if (result) {
                  res.status(201).json({
                    title: title,
                    content: content,
                    attachement: attachement,
                    author: idAuthor,
                    message: 'Message enregistré.......!'
                  });
                }else{
                  return res.status(500).json({message: "Problème de connexion BD"})
                }
              });
          }); 
      }
};

exports.getAllMessage = (req, res, next) => { 
  connection.connect(function(err) {
    const sql = `SELECT * FROM messages`;
    connection.query(sql, function (err, result) {
      if (result){
        const results = JSON.parse(JSON.stringify(result));
        const stringJson =JSON.stringify(results);
        const json =  JSON.parse(stringJson);
        res.status(200).json(json)
      } else {
        return res.status(500).json({message: "Oups ! il y a eu un problème de connexion !"})
      }
    });
  });
};

// Seul admin et l'utilisateur on le droit de supprimer le message
exports.deleteMessage = (req, res, next) => {
  const author = req.body.idUser;
  const isAdmin = req.body.isAdmin;
  const IdMESSAGE = req.body.IdMESSAGE;
  
  const IdMessagePrepare = [IdMESSAGE];
  const sql2 = `Select * FROM messages WHERE idMESSAGE = ?;`
  
  connection.connect(function(err, result) {
    connection.query(sql2, [IdMessagePrepare], function(err, result){
      if ( result[0].idAuthor == author || req.body.isAdmin == 1 ) {
        connection.connect(function(err) {
          const sql = `DELETE FROM messages Where idMESSAGE = ?;`;
          connection.query(sql, [IdMessagePrepare], function (err, result) {
          });
          res.status(200).json({message: 'suppression du message réalisé.......!'});
        });
      } else {
        return res.status(403).json({message: 'vous n\'avez pas l\'autorisation nécesaire!'});
      }
    });
  });
};

// Seul admin et l'utilisateur on le droit de modifié un message 
exports.modifyMessage = (req, res, next) => {
  const idAuthor = req.body.idUser;
  const isAdmin = req.body.isAdmin;
  const idMessage = req.body.idMESSAGES;
  const titleToModify = req.body.title;
  const contentToModify = req.body.content;

  if (titleToModify == null || contentToModify == null || idMessage == null ) {
    return res.status(400).json({ 'error': 'il manque des paramètres ! renseigner tous les champs ...'})
  }else {
    const prepSql1 = [idMessage];
    const prepSql2Title = [titleToModify];
    const prepSql2Content = [contentToModify];
    
    const sql1 = `Select * FROM messages WHERE idMESSAGE = ?;`;
    const sql2 = `UPDATE messages SET title =?, content =? WHERE idMESSAGE=?;`;

    connection.connect(function(err) {
      connection.query(sql1, [prepSql1], function(err, result){
        console.log("juste avant de traiter le if-else => " + result[0].idAuthor);
        console.log("auteur => " + idAuthor);
        
        if ( result[0].idAuthor == idAuthor || isAdmin == 1 ) {
          console.log('on rentre pour envoyer')
          connection.query(sql2, [[prepSql2Title], [prepSql2Content], [prepSql1]], function (err, result) {
            if (result) {
              return res.status(200).json({
                message: 'contenue du message modifié  !'
              });
            } else {
              return res.status(500).json({message: "Oups une erreur avec notre server !"});
            }
          });       
        } else {
          return res.status(403).json({message: "Vous n'avez pas l'authorisation de modifié le message !"});
        } 
      });        
    });
  } 
};

exports.getOneMessage = (req, res, next) => {
  const idMessageBody = req.body.idMessage;
  const idUserBody = req.body.idUser;
  const isAdminBody = req.body.isAdmin;
  
  const oneMessage = [idMessageBody];
  
  const sql1 = ` SELECT * FROM messages WHERE IdMESSAGE = ?;`;
  connection.connect(function(err, result) {
    connection.query(sql1, [oneMessage], function(err, result){
      const results = JSON.parse(JSON.stringify(result));
      const stringJson =JSON.stringify(results);
      const json =  JSON.parse(stringJson);
      
      if (json[0].idAuthor == idUserBody || isAdminBody == 1){
        const idAuthorJson= json[0].idAuthor;
        const idMessageJson= json[0].idMESSAGE;
        const titleJson= json[0].title;
        const contentJson= json[0].content;
        
        return res.status(200).json({
          idAuthor: idAuthorJson,
          idMessage: idMessageJson,
          title: titleJson,
          content: contentJson,
        });
      } else {
        return res.status(403).json({message: 'vous n\'avez pas l\'autorisation nécesaire!'});
      }
    })
  });
};
exports.getUserAllMessage = (req, res, next) => {
  connection.connect(function(err) {

    const author = [req.body.idUsers];
    const sql = `SELECT * FROM messages WHERE idAuthor='?';`;
    connection.query(sql, [author], function (err, result) {
      if (result){
        const results = JSON.parse(JSON.stringify(result));
        const stringJson =JSON.stringify(results);
        const json =  JSON.parse(stringJson);
        res.status(200).json(json)
      } else {
        return res.status(500).json({message: "Oups ! recuperation imposible !"})
      }
    });   
  });  
};


    

    


