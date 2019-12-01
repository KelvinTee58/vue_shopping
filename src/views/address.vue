<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Address</span>
    </nav-bread>

    <div class="main">
      <!--steps start-->
      <Steps :current="current">
        <Step title="选择地址" content="选择您的收货地址"></Step>
        <Step title="订单" content="查看您的商品订单"></Step>
        <Step title="支付" content="对商品订单进行支付"></Step>
        <Step title="支付成功" content="支付成功查看你的商品订单"></Step>
      </Steps>
      <!--steps end-->
      <!--address start-->
      <div v-for="item in addressList">
        <Card style="width:320px">
          <div>{{item.userName}}</div>
          <div>{{item.streetName}}</div>
          <div>{{item.postCode}}</div>
          <div>{{item.tel}}</div>
          <div>{{item.isDefault | isDefaultCheckout}}</div>
        </Card>
      </div>
      <!--address end-->
      <div style="text-align: center">
        <Button type="primary" @click="next">下一步</Button>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
    import NavHeader from "@/components/NavHeader.vue";
    import NavFooter from "@/components/NavFooter.vue";
    import NavBread from "@/components/NavBread.vue";
    import axios from 'axios';
    export default {
      components: {NavHeader,NavFooter,NavBread},
      data() {
        return {
          current: 0,
          addressList:[],
        };
      },
      filters:{
        isDefaultCheckout:function (val) {
          if(val===true){
            return "默认地址"
          }
          else return ""
        }
      },
      mounted(){
        this.getAddressList();
      },
      methods: {
        next() {
          this.current++;
        },
        getAddressList(){
          axios.get("/users/addressList").then((response)=>{
            this.addressList = response.data.result;
          })
        }
      }
    }
</script>

<style scoped>

  .main{
    max-width: 80rem;
    margin: 0 auto;
  }
</style>
