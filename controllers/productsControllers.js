const productsModel = require("../models/productsModel")

module.exports={
    getAll: async function(req, res, next) {
        try{
            let qryFind={}
            if(req.query.buscar){
                qryFind={name:{$regex:".*"+req.query.buscar+".*",$options:"i"}}
            }
            const products = await productsModel.find(qryFind).populate("category")
            res.status(200).json(products);
        }catch(e){
            console.log("Error All:", e)
            res.json(e.message)
        } 
      },
    getDes: async function(req, res, next) {
        try{
            let qryFind={prominent:true}
            const products = await productsModel.find(qryFind).populate("category")
            res.status(200).json(products);
        }catch(e){
            console.log("Error All:", e)
            res.json(e.message)
        } 
    },  
    getById: async function(req, res, next) {
        try{
            const products = await productsModel.findById(req.params.id)
            res.status(200).json(products);
        }catch(e){
            console.log("Error Id:", e)
            res.json(e.message)
        } 

      },
    create: async function(req, res, next) {
        try{
            const producto = new productsModel({
                name:req.body.name,
                price:req.body.price,
                codigo:req.body.codigo,
                description:req.body.description,
                quantity:req.body.quantity,
                category:req.body.category,
                prominent:req.body.prominent
            })
            const document = await producto.save()
            console.log(req.body)
            res.status(201).json(document)  

        }catch(e){
            console.log("error create:",e)
            res.json(e.messege)
        }
        
      },
    delete: async function(req, res, next) {
        try{
            const document = await productsModel.deleteOne({_id:req.params.id})
            res.status(200).json(document);
        }catch(e){
            console.log("Error Delete:", e)
            res.json(e.message)
        } 
      },
    update: async function(req, res, next) {
        try{
            const document = await productsModel.updateOne({_id:req.params.id}, req.body)
            res.status(200).json(document);
        }catch(e){
            console.log("Error Update:", e)
            res.json(e.message)
        } 
    
    }

}