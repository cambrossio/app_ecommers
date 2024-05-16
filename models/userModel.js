const mongoose = require("../config/mongodb")
const errorMessage = require("../util/errorMessage")
const bcryp = require("bcrypt")
const validat = require('../util/validators')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        minLenght:[3,errorMessage.GENERAL.minlength]
    },
    email:{
        type: String,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        unique:true, //codigo unico, no se puede repetir codigo!
        validate:{
            validator:function(value){
                return validat.emailValidate(value)
            },
            message:errorMessage.USUARIO.mailIncorrect
        }
    },
    password:{
        type: String,
        validate:{
            validator:function(value){
                return validat.isGoodPassword(value)
            },
            message:errorMessage.USUARIO.passIncorrect
        }
    },
    
})

//tambien se puede encriptar con un setters
//puede ser pre(se ejecuta antes de) o post(se ejecuta despues de) - (save, delete, update..)
userSchema.pre("save", function(next){
    this.password = bcryp.hashSync(this.password,10) //entre 10 y 15 seria lo optimo
    next()
})

module.exports = mongoose.model("users", userSchema)