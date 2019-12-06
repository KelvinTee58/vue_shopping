<template>
    <div class="Success">
      <div class="successIcon">
        <img src="@/assets/success.png">
        <p>支付成功！</p>
      </div>

      <!--<span>订单号：{{orderId}}</span>-->
      <!--<span>总金额：{{orderSum}}</span>-->
      <div class="orderInfo">
        <p>订单号：{{orderId}}</p>
        <p>总金额：{{orderSum|currency}}</p>
      </div>
      <div class="myButton">
        <Button to="/" type="primary">商品页面</Button>
        <Button to="/cart" type="primary">购物车页面</Button>
      </div>
    </div>
</template>

<script>
  import bus from "@/router/bus"
    export default {
      name: "orderSuccess",
      data() {
        return {
          orderId:'',
          orderSum:'',
        };
      },
      mounted() {
          bus.$on('to-Success',data=>{
            this.orderId = data.orderId;
            this.orderSum = data.orderSum;
            console.log(data)
          });
      },
      beforeDestroy () {
        bus.$off('getAddressId')
      },
    }

</script>

<style scoped>

  .Success{
    text-align: center;
  }
  .Success .successIcon img{
    margin-top: 3rem;
    margin-bottom: 2rem;

  }
  .Success .successIcon p{
    color: rgb(40,140,240);
    margin-bottom: 3rem;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .Success .orderInfo{
    color: #999;
    margin-bottom: 1.2rem;
  }
  .Success .myButton{
    text-align: center;
  }
  .Success .myButton a{
    height: 2.3rem;
    line-height: 2.3rem;
    font-size: 1.2rem;
    width: 8rem;
  }

</style>
