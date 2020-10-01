PORJET 7 - GROUPOMANIA - septembre 2020
## Auteur => j.boero

## Côté FRONTEND
Application réaliser avec REACT

lancement de l'application => npm start

Sur le port : 3000

## Côte BACKEND 

## API 
LANCEMENT SERVER =>  nodemon server => Sur le port : 4200

                Les routes à utilisé 
## ###################################################

## côté USER
post    => /api/user/signup  => Pour la création d'un utilisateur
get     => /api/user/login   => Pour recupere les infos de connection
put     => /api/user/        => Pour modifier la bio de l'utilisateur
get     => /api/user/all     => Pour recuperer tous les utilisateurs     
get     => /api/user/admin   => Pour supprimer un utilisateur  // UNIQUEMENT ADMIN

## côté MESSAGE
post    =>   /api/message/         => Pour la création de message    
get     =>   /api/message/all      => pour recuperer tous les messages
get     =>   /api/message/author   => pour recuperer tous les message de l'utilisateur 
delete  =>   /api/message/delete   => pour supprimer un message // UNIQUEMENT ADMIN ET L'UTILISATEUR
get     =>   /api/message/:        => pour recupere un message
put     =>   /api/message/modify   => pour modifier un message // UNIQUEMENT ADMIN ET L'UTILISATEUR

## Base de données 

Realisé Avec Mysql, 

Sauvegarde presente dans le fichier groupomaniadb.sql





