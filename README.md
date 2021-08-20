# Créez un réseau social d’entreprise
_Projet 7 - GROUPOMANIA - septembre 2020_

## Mission 
Créer le réseau social d'une entreprise et manipuler des bases de données SQL.  

## Compétences évaluées  

* Personnaliser le contenu envoyé à un client web
* Authentifier un utilisateur et maintenir sa session
* Gérer un stockage de données à l'aide de SQL
* Implémenter un stockage de données sécurisé en utilisant SQL

## Techno utilisés pour le projet  

* ### frontend
  * HTML
  * CSS
  * Bootstrap
  * ReactJs
  * Javascript
* ### Backend
  * Javascript
  * Express
* ## BDD
  * Mysql _*fichier groupomaniadb.sql*_

## API REST / Routes
_Côté user_


|-------|-------------------|----------------------------------------------------|
| POST  | /api/user/signup  | Pour la création d'un utilisateur                  |
| GET   | /api/user/login   | Pour recupere les infos de connection              |
| PUT   | /api/user/        | Pour modifier la bio de l'utilisateur              |
| GET   | /api/user/all     | Pour recuperer tous les utilisateurs               |     
| GET   | /api/user/admin   | Pour supprimer un utilisateur  // UNIQUEMENT ADMIN |  
  
### Côté Message
|-------------|-----------------|-----------------------------------------|
| POST | /api/message/ | Pour la création de message |    
| GET | /api/message/all | Pour recuperer tous les messages |
| GET | /api/message/author | Pour recuperer tous les message de l'utilisateur | 
| DELETE | /api/message/delete | Pour supprimer un message // UNIQUEMENT ADMIN ET L'UTILISATEUR |
| GET | /api/message/: | Pour recupere un message |
| PUT | /api/message/modify | Pour modifier un message // UNIQUEMENT ADMIN ET L'UTILISATEUR |

## Formation developpeur web Openclassrooms / projet 7