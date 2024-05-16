var express = require('express');
const app = require('../app');
var router = express.Router();
const productsController = require('../controllers/productsControllers');

router.get('/', productsController.getAll);
router.get('/destaca', productsController.getDes);
router.get('/:id',productsController.getById);

//Es necesario un token para acceder (create,delete, update)
router.post('/',(req,res,next)=>{req.app.vToken(req,res,next)},productsController.create);
router.delete('/:id',(req,res,next)=>{req.app.vToken(req,res,next)},productsController.delete);
router.put('/:id',(req,res,next)=>{req.app.vToken(req,res,next)},productsController.update);

module.exports = router;
