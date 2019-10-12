<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Cart</span>
    </nav-bread>
    <div class="main" style="max-width: 80rem;margin: 0 auto;">
      <table class="table table-hover">
        <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">商品</th>
          <th scope="col">价格</th>
          <th scope="col">数量</th>
          <th scope="col">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="cartItem in cartList">
          <td class="check-btn">
            <img src="@/assets/check_default.png"/>
          </td>
          <td style="text-align: left">
            <img v-bind:src="'/static/img/'+ cartItem.productImage" class="goodsImg">
            <span>{{cartItem.productName}}</span>
           </td>
          <td>{{cartItem.salePrice}}</td>
          <td>
            <span>+</span>
            <span>{{cartItem.productNum}}</span>
            <span>-</span>
          </td>
          <td class="check-btn">
            <img src="@/assets/delete.png" @click="tipModal(cartItem.productId)" />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <Modal>
      <p slot="message">是否删除此商品</p>
      <div slot="btn-group">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteGoods()">删除</button>
      </div>
    </Modal>
    <nav-footer class="Footer"></nav-footer>
  </div>
</template>
<script>
  import NavHeader from "@/components/NavHeader.vue";
  import NavFooter from "@/components/NavFooter.vue";
  import NavBread from "@/components/NavBread.vue";
  import Modal from "@/components/Modal.vue";
  import axios from 'axios';
    export default {

      components: {NavHeader,NavFooter,NavBread,Modal},
      data(){
        return{
          cartList:[],
          productId:''
        }
      },
      mounted(){
        this.init();
      },
      methods:{
        init(){
          axios.get("/users/cartList").then((response)=>{
            let res = response.data;
            this.cartList = res.result;
          })
        },
        tipModal(productId){
          $('#tipModal').modal('show');
          this.productId = productId;
        },
        //请求后端删除
        deleteGoods(){

          axios.post("/users/cart/delete",{
            productId:this.productId,
          }).then((response)=>{
            let res = response.data;
            console.log(res)
            if(res.status == '0'){
              $('#tipModal').modal('hide');
              this.deleteDatePro();
            }
          })
        },
        //前端删除
        deleteDatePro(){
          let item;
          for (item in this.cartList){
            if(this.cartList[item].productId === this.productId){
              this.cartList.splice(item,1);
            }
          }
        }
      }
    }
</script>

<style scoped>
  td{
    line-height: 5rem;
  }
  .check-btn img{
    height: 1.5rem;
  }
  .goodsImg{
    height: 5rem;
    margin-right: 2rem;
    border: #ccc 1px solid;
  }
  .main table{
    box-shadow:-5px 5px 10px -4px #ccc,5px 5px 10px -4px #ccc;
  }
</style>
