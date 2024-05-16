const usersModel = require("../models/userModel")
const bcryp = require("bcrypt")
const jwt = require('jsonwebtoken')

module.exports={
    create: async function(req, res, next) {
        try{
            const usuario = new usersModel({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
                //password:bcrypt.hashSync(this.password,10) tambien se podria encriptar de esta forma
            })
            const document = await usuario.save()
            console.log(req.body)
            res.status(201).json(document)  

        }catch(e){
            console.log("error create:",e)
            res.json(e.messege)
            //next(e)
        }
        
      },
    delete: async function(req, res, next) {
        try{
            const user = await usersModel.deleteOne({_id:req.params.id})
            res.status(200).json(user);
        }catch(e){
            console.log("Error Delete:", e)
            res.json(e.message)
        } 
      },
    update: async function(req, res, next) {
        try{
            const user = await usersModel.updateOne({_id:req.params.id}, req.body)
            res.status(200).json(user);
        }catch(e){
            console.log("Error Update:", e)
            res.json(e.message)
        } 
    },
    login: async function(req, res, next) {
        try{
            const user = await usersModel.findOne({email:req.body.email})
            if(!user){
               res.json({message:"Email o Password incorrecto"})
               return
            }
            if(bcryp.compareSync(req.body.password,user.password)){
                const token = jwt.sign({userId:user._id},req.app.get("stoken"),{expiresIn:"24h"}) //no poner datos sencibles
                res.status(200).json(token);    
            }else{
                res.json({message:"Email o Password incorrecto"})
                return
            }
            
        }catch(e){
            console.log("Error login:", e)
            res.json(e.message)
        } 
    }
    

}