const express       = require('express');
const router        = express.Router();
const messageCtrl   = require("../controllers/message");
const auth          = require("../middleware/auth");

router.post     ('/',  messageCtrl.createMessage);  
router.get      ('/all',  messageCtrl.getAllMessage); // on recupere tous les messages
router.get      ('/author',  messageCtrl.getUserAllMessage) // on recupere tous les messages de l'utilisateur
router.delete   ('/delete',  messageCtrl.deleteMessage); // on suprime un  message
router.get     ('/:',  messageCtrl.getOneMessage); // on recupere un message
router.put      ('/modify',  messageCtrl.modifyMessage)

module.exports = router;