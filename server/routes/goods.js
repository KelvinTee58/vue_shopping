let express = require('express');
let router = express.Router();

let mongoose = require("mongoose");
let Goods = require("../models/goods");
let User = require("../models/user");

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


router.get("/list",function (req, res, next) {
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

//添加购物车
router.post("/addCart",function (req,res,next) {
  var userId = '10001',productId = req.body.productId;

  User.findOne({userId:userId},function (err,userDoc) {
    if(err){

      res.json({
        status:"1",
        msg:err.message
      })
    }else{
     // console.log("ni"+userDoc);
      if(userDoc){
        let goodsItem ='';
        userDoc.cartList.forEach((item)=>{
          if(item.productId == productId){
            goodsItem = item;
            item.productNum++;
          }
        });
        if(goodsItem){
          userDoc.save(function (err2,doc2) {
            if(err2){
              res.json({
                status:"1",
                msg:err2.message
              })
            }
            else {

              res.json({
                status:"0",
                msg:"",
                result: 'suc'
              })
            }
          })
        }else{
          Goods.findOne({productId:productId},function (err1, prodoc) {
            if(err1){
              res.json({
                status:"1",
                msg:err1.message
              })
            }else {
              if(prodoc){

                prodoc.productNum=1;
                prodoc.checked='1';

                userDoc.cartList.push(prodoc);
                userDoc.save(function (err2,doc2) {
                  if(err2){

                    res.json({
                      status:"1",
                      msg:err2.message
                    })
                  }
                  else {

                    res.json({
                      status:"0",
                      msg:"",
                      result: 'suc'
                    })
                  }
                })
              }
            }


          })
        }

      }
    }
  })
});


module.exports = router;
