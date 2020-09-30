const express   = require('express');
const router    = express.Router();

const userCtrl = require("../controllers/user");
const { route } = require('./messageRoute');

router.post     ('/signup', userCtrl.signup);
router.post      ('/login', userCtrl.login);
router.put      ('/', userCtrl.modifyBio);
router.get      ('/all',userCtrl.getAllUser);

// UNIQUEMENT POUR L'ADMIN
router.delete   ('/deleteUser', userCtrl.deleteOneUser); // il rajouter un message d'erreur si l'utilisateur n'existe pas


module.exports = router;

