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
      return res.status(400).json({ 'error': 'il manque des paramètres ! ...'})
    } else {
          //je recupere toutes les valeurs et je prépare avant l'enregistrement dans la BD
          const valuesCreate = [idAuthor, username, title, content, attachement, likes];
          // j'enregistre dans la base de donnée.
          connection.connect(function(err) {
            console.log("Connected!");
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
                  console.log("1 message viens de s'enregistré .....!");
                }else{
                  return res.status(500).json({message: "Problème de connexion BD"})
                }  // else
              }); // query sql
          }); // connect
      }
};
// voir comment recuperer les donnée mysql  // ok
exports.getAllMessage = (req, res, next) => {
    
  connection.connect(function(err) {
    console.log("Connected!");
    const sql = `SELECT * FROM messages`;
    connection.query(sql, function (err, result) {
      if (result){
        const results = JSON.parse(JSON.stringify(result));
              const stringJson =JSON.stringify(results);
              const json =  JSON.parse(stringJson);
              console.log('>> username: ', json);
        res.status(200).json(json)
      } else {
        return res.status(500).json({message: "Oups ! il y a eu un problème de connexion !"})
      }
    });
  });
};

exports.getUserAllMessage = (req, res, next) => {
  connection.connect(function(err) {
    const idAuthor = req.body.idUsers;

    const author = [req.body.idUsers];
    const sql = `SELECT * FROM messages WHERE idAuthor='?';`;
    connection.query(sql, [author], function (err, result) {
      if (result){
        const results = JSON.parse(JSON.stringify(result));
              const stringJson =JSON.stringify(results);
              const json =  JSON.parse(stringJson);
              console.log('>> username: ', json);
        res.status(200).json(json)
      } else {
        return res.status(500).json({message: "Oups ! recuperation imposible !"})
      }
    });   
  });  
};
exports.getOneMessage = (req, res, next) => {
  const idMessageBody = req.body.idMessage;
  const idUserBody = req.body.idUser;
  const isAdminBody = req.body.isAdmin;

  const oneMessage = [idMessageBody];
  
  const sql1 = ` SELECT * FROM messages WHERE IdMESSAGE = ?;`;
  connection.connect(function(err, result) {
    console.log("=> dedans")
    connection.query(sql1, [oneMessage], function(err, result){
      const results = JSON.parse(JSON.stringify(result));
      const stringJson =JSON.stringify(results);
      const json =  JSON.parse(stringJson);
      console.log(json[0].idAuthor);
      console.log(idUserBody)
      console.log( isAdminBody);

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

// Seul admin et l'utilisateur on le droit de supprimer le message
exports.deleteMessage = (req, res, next) => {
    const author = req.body.idUser;
    const isAdmin = req.body.isAdmin;
    const idMessage = req.body.IdMESSAGE;
    console.log(">>> auteur => " + author);
    console.log(">>> isAdmin => " + isAdmin);
    console.log(">>> idMessage => " + idMessage);

    const IdMessagePrepare = [idMessage];
    console.log(">>> message preparer => " + IdMessagePrepare)

    const sql2 = `Select * FROM messages WHERE idMESSAGE = ?;`
    connection.connect(function(err) {
        connection.query(sql2, [IdMessagePrepare],function(err, result){
          if ( result[0].idAuthor == author || req.body.isAdmin == 1 ) {
            console.log('on peut supprimer');
            connection.connect(function(err) {
              const sql = `DELETE FROM messages Where idMESSAGE = ?;`;
              connection.query(sql, [IdMessagePrepare], function (err, result) {
              console.log("Le message 1 est supprimer .....!");
              });
              res.status(201).json({message: 'suppression du message réalisé.......!'});
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
  
  const prepSql1 = [idMessage];
  
  const sql1 = `Select * FROM messages WHERE idMESSAGE = ?;`;
  const sql2 = `UPDATE messages SET title ='${titleToModify}', content ='${contentToModify}' WHERE idMESSAGE=?;`;

  connection.connect(function(err) {
    connection.query(sql1, [prepSql1], function(err, result){
      console.log("juste avant de traiter le if-else => " + result[0].idAuthor);
      console.log("auteur => " + idAuthor);
      
      if ( result[0].idAuthor == idAuthor || isAdmin == 1 ) {
        console.log('on rentre pour envoyer')
        connection.query(sql2, [prepSql1], function (err, result) {
          if (result) {
            return res.status(200).json({
              message: 'contenue du message modifié  !'
            });
          } else {
            return res.status(403).json({message: "Vous n'êtes pas autorisé à modifier ce message !"});
          }
        });       
      } else {
        return res.status(403).json({message: "Vous n'avez pas l'authorisation de modifié le message !"});
      } 
    });        
  });
};


    

    


