var express = require('express');
var router = express.Router();
const categoriesControllers = require('../controllers/categoriesController');

router.get('/', categoriesControllers.getAll);

//token para acceder
router.post('/',(req,res,next)=>{req.app.vToken(req,res,next)},categoriesControllers.create);
router.delete('/:id',(req,res,next)=>{req.app.vToken(req,res,next)}, categoriesControllers.delete);

module.exports = router;
