const express   = require('express');
const router    = express.Router();
const userCtrl = require("../controllers/user");
const auth      = require("../middleware/auth");

router.post     ('/signup', userCtrl.signup);
router.post      ('/login', userCtrl.login);
router.put      ('/', auth, userCtrl.modifyBio);
router.get      ('/all',auth, userCtrl.getAllUser);
router.delete   ('/deleteUser',auth, userCtrl.deleteOneUser); 
router.put      ('/status', auth, userCtrl.modifyStatus);

module.exports = router;