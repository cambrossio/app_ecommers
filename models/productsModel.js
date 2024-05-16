const mongoose = require("../config/mongodb")
const errorMessage = require("../util/errorMessage")


const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        minLenght:[3,errorMessage.GENERAL.minlength]
    },
    price:{
        type: Number,
        min:0, // No puedo introducir un valor menor a 0
        get: function(value){
            return value * 1.21
        }
    },
    codigo:{
        type: String,
        unique:true //codigo unico, no se puede repetir codigo!
    },
    description:String,
    quantity:Number,
    category: {
        type: mongoose.Schema.ObjectId,
        ref:"categories"
    },
    prominent:Boolean //Producto destacado
})

productSchema.virtual("price_c").get(function(){
    return "$" + this.price
})

productSchema.set('toJSON',{getters:true, virtuals:true});
module.exports = mongoose.model("products", productSchema)