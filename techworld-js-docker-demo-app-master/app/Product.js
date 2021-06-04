var mongoose = require("mongoose");
var Schema = mongoose.Schema;
ProductSchema = new Schema({name:{
                type: String,
                required: true
              }, quantity:{
               type: Number,
               required: true
             }, departments:{
                type: Array,
                required: true
             }
         });
var Product = mongoose.model("Product", ProductSchema);
module.exports = Product; 
