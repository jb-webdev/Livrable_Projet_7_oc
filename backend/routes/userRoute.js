const express   = require('express');
const router    = express.Router();
const auth      = require("../middleware/auth");

const userCtrl = require("../controllers/user");


router.post     ('/signup', userCtrl.signup);
router.post      ('/login', userCtrl.login);
router.put      ('/', auth, userCtrl.modifyBio);
router.get      ('/all',auth, userCtrl.getAllUser);

// UNIQUEMENT POUR L'ADMIN
router.delete   ('/deleteUser',auth, userCtrl.deleteOneUser); 
router.put      ('/status', auth, userCtrl.modifyStatus);


module.exports = router;

