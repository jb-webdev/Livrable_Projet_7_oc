## ###################################################  
  LANCEMENT SERVER AVEC : nodemon server sur port :4200
## ###################################################


## ################################################### 
   Les routes à utilisé pour les requêtes du front 
## ###################################################

USER
        post    => /api/user/signup      => Pour la création d'un utilisateur
        get     => /api/user/login       => Pour recupere les infos de connection
        put     => /api/user/            => Pour modifier la bio de l'utilisateur
        get     => /api/user/all         => Pour recuperer tous les utilisateurs 
         
        PARTIE ADMIN        
        get     => /api/user/admin       => Pour supprimer un utilisateur  // UNIQUEMENT ADMIN

MESSAGE
        post    =>   /api/message/              => Pour la création de message    
        get     =>   /api/message/all           => pour recuperer tous les messages
        get     =>   /api/message/author        => pour recuperer tous les message de l'utilisateur 

        PARTIE ADMIN
        delete  =>   /api/message/delete        => pour supprimer un message // UNIQUEMENT ADMIN ET L'UTILISATEUR
        get     =>   /api/message/:             => pour recupere un message
        put     =>   /api/message/modify        => pour modifier un message // UNIQUEMENT ADMIN ET L'UTILISATEUR


## ################################################### 
                INSTALATION
## ###################################################
npm init 
## ################################################### 
                 DEPENDENCES 
## ###################################################
npm install --save express
npm install -g nodemon
npm install --save nodemon
npm install --save mysql
npm install --save mysql2
npm install --save bcrypt
npm install --save jsonwebtoken

npm install --save body-parser  
const bodyParser = require('body-parser');






