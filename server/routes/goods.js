var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var Goods = require("../models/goods");

//链接数据库
mongoose.connect('mongodb://Localhost:27017/vue_mall',{useNewUrlParser: true});
//mongoose.connect("mongodb://root:123456@127.0.0.1:270.17/vue_mall");

mongoose.connection.on("connected",function () {
  console.log("------------success------------------");
});

mongoose.connection.on("error",function () {
  console.log("------------error------------------");
});

mongoose.connection.on("disconnection",function () {
  console.log("------------disconnected------------------");
});


router.get("/",function (req, res, next) {
  let sort = req.param("sort");
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));

  let params = {};
  let skip = (page-1)*pageSize;

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);

  goodsModel.sort({'salePrice':sort});
  //查找，第一个查找条件
  goodsModel.exec({},function (err,doc) {
    if(err){
      res.json({
        stauts:'1',
        msg:err.message,
      });
    }else {
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
});


module.exports = router;
