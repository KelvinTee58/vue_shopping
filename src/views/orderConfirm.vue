<template>
  <div class="main">
    <div class="main table-responsive">
      <table class="table">
        <thead class="table-head">
        <tr>
          <th scope="col">商品</th>
          <th scope="col">价格</th>
          <th scope="col">数量</th>
          <th scope="col">总价</th>
        </tr>
        </thead>
        <tbody v-for="cartItem in cartList">
        <tr v-if="cartItem.checked === '1'">
          <td style="text-align: left">
            <img v-bind:src="'/static/img/'+ cartItem.productImage" class="goodsImg">
            <span>{{cartItem.productName}}</span>
          </td>
          <td>{{cartItem.salePrice|currency}}</td>
          <td>
            <span>x{{cartItem.productNum}}</span>
          </td>
          <td>{{cartItem.salePrice*cartItem.productNum|currency}}</td>
        </tr>
        </tbody>
      </table>
    </div>

      <table class="sumCart">
        <tr>
          <td><p>商品总价格:</p></td>
          <td><h3>{{sumCart|currency}}</h3></td>
        </tr>
        <tr>
          <td><p>配送费:</p></td>
          <td><h3>{{300|currency}}</h3></td>
        </tr>
        <tr>
          <td><p>总支付:</p></td>
          <td><h3>{{sumPay|currency}}</h3></td>
        </tr>
      </table>
    <div style="clear: both"></div>
    <div class="myButton">
      <Button @click="previous">
        上一步
      </Button>
      <Button type="success" @click="next" style="width: 7rem">
        支付
      </Button>
    </div>
  </div>
</template>

<script>
    import bus from "@/router/bus"
    import axios from 'axios';
    export default {
      name: "orderConfirm",
      data () {
        return {
          addressId: '',
          cartList:[],
          sumCart:0,
          sumPay:0,
        }
      },
      mounted () {
        bus.$on('get-id',checkAddressId=> {
          this.addressId = checkAddressId;
        });
        this.init();
      },
      beforeDestroy () {
        bus.$off('getAddressId')
      },
      methods: {
        next(){
          axios.post("/users/checkout/pay",{
            sumPay:this.sumPay,
            addressId:this.addressId
          }).then((response)=>{
            let res = response.data;
            if(res.status === "0"){
              bus.$emit('to-Success',res.result);
              this.$emit('toPay',2);
            }
          });
        },
        previous(){
          this.$emit('toPay',0);
        },
        init(){
          axios.get("/users/cartList").then((response)=>{
            let res = response.data;
            this.cartList = res.result;
            this.cartList.forEach((item)=>{
              if(item.checked === '1'){
                this.sumCart += item.salePrice*item.productNum;
              }
            });
            this.sumPay = this.sumCart+300;
          })
        },
      }
    }
</script>

<style scoped>


  .goodsImg{
    height: 3rem;
    margin-right: 2rem;
    border: #ccc 1px solid;
  }
  td{
    line-height: 3rem;
  }
  .main .table{
    box-shadow:-5px 5px 10px -4px #ccc,5px 5px 10px -4px #ccc;
    text-align: center;
    min-width: 50rem;
    margin-bottom: 3rem;
  }
  .table-head{
    background-color: rgb(40,140,240);
  }
  .myButton{
    text-align: center;
  }
  .myButton Button{
    height: 2.3rem;
    font-size: 1.2rem;
    line-height: 2.3rem;
  }

  .sumCart{
    line-height: 1rem;
    width: 20rem;
    float: right;
  }
  .sumCart p{
    color: #999;
    font-size: 0.8rem;
    text-align: right;
    padding-right:0.5rem;
  }
  .sumCart h3{
    font-size: 1.3rem;
    font-weight: bold;
    color: rgb(40,140,240);
    text-align: left;
  }
</style>
