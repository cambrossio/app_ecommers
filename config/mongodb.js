const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/cursoutn", function(error){
    if(error){
        throw error
    }else{
        console.log("Conectado con Mongo DB")
    }
})
module.exports=mongoose