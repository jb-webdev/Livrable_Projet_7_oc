const express       = require('express');
const router        = express.Router();
const messageCtrl   = require("../controllers/message");
const auth          = require("../middleware/auth");

router.post     ('/', auth,  messageCtrl.createMessage);  
router.get      ('/all', auth,  messageCtrl.getAllMessage); // on recupere tous les messages
router.get      ('/author', auth,  messageCtrl.getUserAllMessage) // on recupere tous les messages de l'utilisateur
router.delete   ('/delete', messageCtrl.deleteMessage); // on suprime un  message
router.post     ('/:', auth,  messageCtrl.getOneMessage); // on recupere un message
router.put      ('/modify', auth,  messageCtrl.modifyMessage)

module.exports = router;