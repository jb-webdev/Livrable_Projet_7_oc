const bcrypt        = require('bcrypt');
const { json } = require('body-parser');
const jwt           = require('jsonwebtoken');
const mysql         = require('mysql');
const connection    = require('../config/dbconnect');
const { unsubscribe } = require('../routes/userRoute');


// enregistrement user
exports.signup = (req, res, next) => { 
  bcrypt.hash(req.body.password, 10)
    .then(hash =>{ 
      const email     = req.body.email;
      const username  = req.body.username;
      const password  = hash;
      const bio       = req.body.bio;
      const isAdmin   = 0;
      if (email != null || username != null || password != null) {
        const emailUsers = [email, username, password, bio, isAdmin];
        const valueEmail = email;
        connection.connect(function(err) {
          const sql = `INSERT INTO users VALUES (NULL, ?)`;
          const sql2 = `SELECT * FROM users WHERE email= ?;`;
          connection.query(sql, [emailUsers], function (err, result) {
            if (result){
              connection.query(sql2, [valueEmail], (err, result) => {
                const userIdRes = result[0].IdUSERS;
                const emailRes = result[0].email
                const usernameRes = result[0].username;
                const isAdminRes = result[0].isAdmin;
                const bioRes = result[0]. bio;
                  if (result){
                    return res.status(200).json({
                      isAdmin : isAdminRes,
                      userId : userIdRes ,
                      username: usernameRes,
                      email : emailRes,
                      bio : bioRes,
                      token: jwt.sign(
                        { IdUSERS: userIdRes },
                        'A156rt12345Ay11515QG335mOt153de955247PasSe1853459foRt',
                        {expiresIn: '24h'}
                        )
                      });    
                  } else {
                      return res.status(500).json({ error: "impossible d'enregistré l'utilisateur !" , connect: 'false',});
                  }
                })
            } else { return res.status(500).json({message: "Oups..! Impossible de vous enregistrer !"});}
          });
        });   
      } else {
        return res.status(400).json({ 'error': 'il manque des paramètres ! ...'});
      }
    })
    .catch(error => res.status(500).json({message: "erreur de connexion premier niveau !"})); // on renvoie une erreur    
};
// il faut dechiffre le mot de passe et assigner un TOKEN
exports.login = (req, res, next) => {
  const logEmail = req.body.email;
  const logPassword = req.body.password;
  // je controle que le formulaire ne soit pas vide
  if (logEmail == null || logPassword == null) {
    return res.status(400).json({ 'error': 'il manque des paramètres ! ...'})
  } else {
    const sqlPrepare = [logEmail];
      connection.connect(function(err) {
          const sql1 = `SELECT EXISTS( SELECT * FROM users WHERE email=? ) AS users_exists;`;
          const sql2 = `SELECT * FROM users WHERE email=?;`;
          connection.query(sql1, [sqlPrepare], (err, result) => {
              if (result[0].users_exists) {
                connection.query(sql2, [sqlPrepare], (err, result) => {
                  const passCrypt = result[0].password;
                  const userIdRes = result[0].IdUSERS;
                  const emailRes = result[0].email
                  const usernameRes = result[0].username;
                  const isAdminRes = result[0].isAdmin;
                  const bioRes = result[0].bio;

                  bcrypt.compare(logPassword, passCrypt)

                  .then(valid => {
                    if (valid){
                      return res.status(200).json({
                        isAdmin : isAdminRes,
                        userId : userIdRes ,
                        username: usernameRes,
                        bio: bioRes,
                        email : emailRes,
                        token: jwt.sign(
                          { IdUSERS: userIdRes  },
                          'A156rt12345Ay11515QG335mOt153de955247PasSe1853459foRt',
                          {expiresIn: '24h'}
                          )
                        });
                    } else {
                      res.status(401).json({ error: 'Mots de passe incorrect ! '});
                      return;
                    }
                  })
                  .catch(err => res.status(500).json({ error :  'Mauvais mot de passe...!'}));
                });
              }else {
                return res.status(400).json({ message: "l'utilisateur n'existe pas"});
              }
          });
      }); 
  }; 
}; 
exports.modifyBio = (req, res, next) =>{
  const bio = req.body.bio;
  const idUser = req.body.user;
  const isAdmin = req.body.isAdmin;
  if (bio === null || idUser === null) {
    return res.status(400).json({ 'error': 'il manque des paramètres ! ...'});
  }else {
    connection.connect(function(err) {
      const userExist = [idUser];
      const bioModify = [bio];
      const sql2 = `UPDATE users SET bio=? WHERE idUSERS=?;`;
      const sql1 = `SELECT EXISTS( SELECT * FROM users WHERE idUSERS=? ) AS users_exists;`;
      connection.query(sql1, [userExist], function (err, result) {
        if (result[0].users_exists){
          connection.query(sql2, [[bioModify], [userExist]], function (err, result){
          })
          return res.status(200).json({message :'biographie modifié !'})
        } else {
          return res.status(400).json({ 'error': "l'utilisateur n'existe pas ! ..."});
        }
      });
    }); 
  }
};
exports.getAllUser = (req, res, next) =>{
  connection.connect(function(err) {
    console.log("Connected!");
    const sql = `SELECT * FROM users`;
    connection.query(sql, function (err, result) {
      if (result){
        const results = JSON.parse(JSON.stringify(result));
        const stringJson =JSON.stringify(results);
        const json =  JSON.parse(stringJson);
        res.status(200).json(json)
      } else {
        return res.status(500).json({message: "Problème communication server "})
      }
    });
  });

  
};
exports.deleteOneUser = (req, res, next) =>{
    const idUser = req.body.idUser;
    const isAdmin = req.body.isAdmin;
    if (isAdmin != 1) {
      res.status(403).json({message: 'vous n\'avez pas l\'autorisation nécessaire!'});
    } else {
      const prepaSql1 = [idUser];
      const sql1 = ` SELECT * FROM users WHERE idUSERS = ?;`;
      connection.connect(function(err) {
          connection.query(sql1, [prepaSql1], function(err, result){
            if (result) {
              const results = JSON.parse(JSON.stringify(result));
              const stringJson =JSON.stringify(results);
              const json =  JSON.parse(stringJson);
              const UseDelete = json[0].username;
              const sql2 = `DELETE FROM users Where username = ?;`;
              connection.query(sql2, [UseDelete], function(err, valid){
                if (valid) {
                  res.status(200).json({message: 'suppression utilisateur effectué ..!'});
                } else {
                  res.status(500).json({message: 'Suppression utilisateur échoué..!'});
                }
              }); 
            } else { 
              res.status(403).json({message: 'vous n\'avez pas l\'autorisation nécesaire!'});
            };
        }); 
      });
    }
}; 

exports.modifyStatus = (req, res, next) =>{
  const isAdmin = req.body.isAdmin;
  const idUser = req.body.idUser;
  const statusChange = req.body.status;

  if (isAdmin != 1){
    return res.status(401).json({ error: "vous n'avez pas l'authorisation necessaire !"});
  } else {
    const sql1 = `SELECT EXISTS( SELECT * FROM users WHERE idUSERS=? ) AS users_exists;`;
    const sql2 = `UPDATE users SET isAdmin=? WHERE IdUSERS=?;`;

    const researchUser = [idUser];
    const modifyStatus = [statusChange];

    connection.connect(function(err, result) {
      connection.query(sql1, [researchUser], function(err, result){
        console.log("juste avant de traiter le if-else => " + result[0].IdUSERS);
        console.log("idUser => " + idUser);
        if ( result[0].IdUSERS == idUser || isAdmin == 1 ) {
          console.log('on rentre pour envoyer')
          connection.query(sql2, [[statusChange], [researchUser]], function (err, result) {
            if (result) {
              return res.status(200).json({ message: 'status modifié  !' });
            } else {
              return res.status(500).json({message: "Problème avec la connection serveur"});
            }
          });       
        } else {
          return res.status(403).json({message: "Vous n'avez pas l'authorisation de modifié le status !"});
        }
      });
    });
  };
};