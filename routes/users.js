var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')

router.post('/', usersController.create);
router.post('/login', usersController.login);

//Es necesario el token
router.delete('/:id',(req,res,next)=>{req.app.vToken(req,res,next)}, usersController.delete);
router.put('/:id',(req,res,next)=>{req.app.vToken(req,res,next)}, usersController.update);


module.exports = router;
