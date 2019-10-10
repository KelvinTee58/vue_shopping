let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "productImage":String,
  "checked":String,
  "productNum":Number
},{
  collection:'Goods'
});

module.exports = mongoose.model('Good',productSchema);

//商品模型
