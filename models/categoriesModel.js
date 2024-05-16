const mongoose = require("../config/mongodb")
const errorMessage = require("../util/errorMessage")

const categorySchema = mongoose.Schema({
   name:String,
})

module.exports = mongoose.model("categories", categorySchema)