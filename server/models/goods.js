var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "productImage":String,
},{
  collection:'Goods'
});

module.exports = mongoose.model('Good',productSchema);

//商品模型
