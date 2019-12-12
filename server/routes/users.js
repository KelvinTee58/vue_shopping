var express = require('express');
var router = express.Router();
var User = require("./../models/user");
require('./../util/util');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//登录
router.post("/login",function (req,res,next) {
  let param = {
    userName :req.body.userName,
    userPwd:req.body.userPwd,
  };

  User.findOne(param,function (err,doc) {
    if(err){

      res.json({
        status:"1",
        msg:err.message
      })
    }else {
      if(doc){
        res.cookie("userId",doc.userId,{
          path:"/",
          maxAge:1000*60*60
        });
        res.cookie("userName",doc.userName,{
          path:"/",
          maxAge:1000*60*60
        });
        res.json({
          status: '0',
          msg:'',
          result:{
            userName: doc.userName,
          }
        })
      }else {
        res.json({
          status:"1",
          msg:"密码错误"
        })
      }
    }
  })
});


//登出
router.post("/logout",function (req,res,next) {
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.cookie("userName","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'成功登出',
    result:""
  })
});

//校验登录状态
router.get("/checkLogin",function (req,res,next) {
  if(req.cookies.userId){
   res.json({
     status:'0',
     msg:'',
     result:req.cookies.userName
   })
  }else {
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    })
  }
});

//使用cookie中的userId查询用户的cartList
router.get("/cartList",function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:'',
        result:''
      })
    }else {
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.cartList
        })
      }
    }
  });

});

//购物车删除
router.post("/cart/delete",function (req,res,next) {
  let userId = req.cookies.userId,productId = req.body.productId;
  User.update({
    userId:userId
  }, {
    $pull:{
      'cartList':{
        productId:productId
      }
    }
  },function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else {
      res.json({
        status:'0',
        msg:'',
        result:'delete product success'
      })
    }
  })
});


//修改购物车信息
router.post("/cartEdit",function (req,res,next) {
  let userId = req.cookies.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked = req.body.checked;
  User.update({userId:userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,   //更新子文档
    "cartList.$.checked":checked,
  },function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else {
      res.json({
        status:'0',
        msg:'',
        result:'Product Data Change Success'
      })
    }
  })
});

//全选商品
router.post("/editCheckAll",function (req,res,next) {
  let userId = req.cookies.userId,
    checkAll = req.body.checkAllList;
  User.findOne({userId:userId},function(err,user){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else {
      if(user){
        user.cartList.forEach((item)=>{
          item.checked = checkAll;
        });
        user.save(function (err1,doc2) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            })
          }else {
            res.json({
              status:'0',
              msg:'',
              result:'Product Success CheckAll'
            })
          }
        })
      }
    }
  })
});

//获取地址列表
router.get("/addressList",function (req,res,next) {
  let userId = req.cookies.userId;

  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else {
      if(doc){
        res.json({
          status: "0",
          msg:'成功',
          result: doc.addressList,
        })
      }
    }
  })
});


//修改默认地址
router.post("/addressList/setDefault",function (req,res,next) {
  let userId = req.cookies.userId,
    addressId = req.body.addressId;
  if(!addressId) {
      res.json({
        status: '1001',
        msg: 'addressId is null',
        result: ''
      });
    }
  else{
      User.findOne({userId:userId}, function (err1, doc) {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        }
        else {
          let addressList = doc.addressList;
          addressList.forEach((item) => {
            if(item.addressId === addressId){
              item.isDefault = true;
            }else {
              item.isDefault = false;
            }
          });
          doc.save(function (err2, doc1) {
            if (err2) {
              res.json({
                status: '1',
                msg: err2.message,
                result: ''
              })
            }
            else {
              res.json({
                status: '0',
                msg: '',
                result: 'seting isDefault Success'
              })
            }
          })
        }
      })
    }
});

//删除地址
router.post("/addressList/deleteAddress",function (req,res,next) {
  let userId = req.cookies.userId,
    addressId = req.body.addressId;
  User.update({
   userId:userId
  },{
    $pull: {
      'addressList':{
        'addressId':addressId
      }
    }
  },function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:'',
      })
    }else {
      res.json({
        status:"0",
        msg:'',
        result:'delete address success',
      })
    }
  })
});

//订单支付
router.post('/checkout/pay',function (req,res,next) {
  let userId = req.cookies.userId,
    sumPay = req.body.sumPay,
    addressId = req.body.addressId ;
    User.findOne({userId:userId},function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:'no users'
        })
      }
      else {

        let address = null,goodsList = [];
        //保存选中的地址信息
        doc.addressList.forEach((item)=>{
          if(addressId === item.addressId){
            address = item;
          }
        });
        //保存选中的购物选中的购买商品信息
        doc.cartList.forEach((item)=>{
          if(item.checked === '1'){
            goodsList.push(item);
          }
        });

        let r1=Math.floor(Math.random()*10);

        let sysDate = new Date().Format('yyyyMMddhhmmss');
        let CreateDat = new Date().Format('yyyy-MM-dd hh:mm:ss');
        let orderId = userId+r1+sysDate;

        let order = {
          "orderId":orderId,
          "orderSum":sumPay,
          "addressInfo":address,
          "goodsList":goodsList,
          "orderStatus":"1",
          "createDate":CreateDat,
        };

        doc.orderList.push(order);
        doc.save(function (err2,doc1) {
          if(err2){
            res.json({
              status:'1',
              msg:err2.message,
              result:'err save order'
            })
          }
          else{
            res.json({
              status:'0',
              msg:'',
              result: {
                orderId: order.orderId,
                orderSum:order.orderSum,
              }
            })
          }
        });
      }
    })
});


router.get("/goodCartCount",function (req,res,next) {
  if(req.cookies && req.cookies.userId){
    let userId = req.cookies.userId;
    User.findOne({userId:userId},function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:'',
        })
      }else {
        let cartCount = 0;
        doc.cartList.forEach((item)=>{
          cartCount += parseInt(item.productNum);
        });
        res.json({
          status:'0',
          msg:'',
          result:cartCount,
        })
      }
    })
  }
});

module.exports = router;
