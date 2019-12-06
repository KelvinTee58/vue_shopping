let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":[
    {
      "orderId":String,
      "orderSum":Number,
      "addressInfo":Object,
      "goodsList":Array,
      "orderStatus":String,
      "createDate":String,
    }
  ],
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
  "addressList":[
    {
    "addressId":String,
    "userName":String,
    "streetName":String,
    "postCode":String,
    "tel": Number,
    "isDefault": Boolean,
    }
  ]
},{
  collection:'Users'
});



module.exports = mongoose.model('user',userSchema);
