<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Address</span>
    </nav-bread>
    <div class="main">
      <!--steps start-->
      <Steps :current="current" class="Steps">
        <Step title="地址"></Step>
        <Step title="订单" content="查看商品订单"></Step>
        <Step title="成功"></Step>
      </Steps>
      <!--steps end-->
      <Body-Address @toOrder="toNext" v-show="current === 0"></Body-Address>
      <Order-Confirm @toPay="toNext" v-show="current === 1"></Order-Confirm>
      <Order-Success v-show="current === 2"></Order-Success>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>

  import NavHeader from "@/components/NavHeader.vue";
  import NavFooter from "@/components/NavFooter.vue";
  import NavBread from "@/components/NavBread.vue";
  import BodyAddress from "@/views/address.vue"
  import OrderConfirm from "@/views/orderConfirm.vue"
  import OrderSuccess from "@/views/orderSuccess.vue"
    export default {
      components: {NavHeader,NavFooter,NavBread,BodyAddress,OrderConfirm,OrderSuccess},
      data() {
        return {
          current: 0,
        };
      },
      methods:{
        next() {
          if(this.current<3)this.current++;
        },
        toNext(date){
          this.current = date;
        },

      }
    }
</script>

<style scoped>
  .main{
    max-width: 80rem;
    margin: 0 auto 3rem auto;
  }
</style>
