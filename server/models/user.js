let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[
    {
    "productId":String,
    "productName":String,
    "salePrice":Number,
    "productImage":String,
    "checked":String,
    "productNum":Number
    }
  ],
  "addressList":Array
},{
  collection:'Users'
});


module.exports = mongoose.model('user',userSchema);
