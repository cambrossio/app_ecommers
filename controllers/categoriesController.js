const categoriesModel = require("../models/categoriesModel")

module.exports={
    getAll: async function(req, res, next) {
        try{
            const products = await categoriesModel.find()
            res.status(200).json(categories);
        }catch(e){
            console.log("Error All:", e)
            res.json(e.message)
        } 
      },
      create: async function(req, res, next) {
        try{
            const categoria = new categoriesModel({
                name:req.body.name
            })
            const document = await categoria.save()
            console.log(req.body)
            res.status(201).json(document)  

        }catch(e){
            console.log("error create:",e)
            res.json(e.messege)
        }
        
      },
      delete: async function(req, res, next) {
        try{
            const document = await categoriesModel.deleteOne({_id:req.params.id})
            res.status(200).json(document);
        }catch(e){
            console.log("Error Delete:", e)
            res.json(e.message)
        } 
      }

}