<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Cart</span>
    </nav-bread>
    <div class="main table-responsive">
      <table class="table table-hover">
        <thead class="table-head">
          <tr>
            <th scope="col">选择</th>
            <th scope="col">商品</th>
            <th scope="col">价格</th>
            <th scope="col">数量</th>
            <th scope="col">总价</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody v-for="cartItem in cartList">
        <tr>
          <td class="check-btn" @click="editCart('checked',cartItem)" >
            <img v-bind:class="{'check':cartItem.checked == '1'}" src="@/assets/check_default.png" />
            <img v-bind:class="{'check':cartItem.checked != '1'}" src="@/assets/check_full.png"/>
          </td>
          <td style="text-align: left">
            <img v-bind:src="'/static/img/'+ cartItem.productImage" class="goodsImg">
            <span>{{cartItem.productName}}</span>
           </td>
          <td>{{cartItem.salePrice|currency}}</td>
          <td>
            <img src="@/assets/add.png" @click="editCart('add',cartItem)" class="num-btn">
            <span>{{cartItem.productNum}}</span>
            <img src="@/assets/minus.png" @click="editCart('minus',cartItem)" class="num-btn">
          </td>
          <td>{{cartItem.salePrice*cartItem.productNum|currency}}</td>
          <td class="check-btn">
            <img src="@/assets/delete.png" @click="tipModal(cartItem.productId)" />
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td class="check-btn" @click="checkAll()">
            <img src="@/assets/check_default.png" v-bind:class="{'check':checkAllList === '1'}" />
            <img src="@/assets/check_full.png" v-bind:class="{'check':checkAllList !== '1'}" />
            <span>全选</span>
          </td>
          <td colspan="4" class="text-right">总价格 <span class="PriceCount">{{PriceCount|currency}}</span></td>
          <td class="checkout_default checkout" v-bind:class="{'uncheckout':checkCount===0}" @click="checkout">
            结 算
          </td>
        </tr>
        </tfoot>
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
          productId:'',
        }
      },
      mounted(){
        this.init();
      },
      computed:{
        checkAllList(){
          return this.checkCount === this.cartList.length?"1":"0";
        },
        checkCount(){
          let i = 0;
          this.cartList.forEach((item)=>{
            if(item.checked === '1') i++;
          });
          return i;
        },
        PriceCount(){
          let i = 0;
          this.cartList.forEach((item)=>{
            if(item.checked === '1'){
              i+=item.salePrice*item.productNum;
            }
          });
          return i;
        }
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
          axios.post('/users/cart/delete',{
            productId:this.productId,
          }).then((response)=>{
            let res = response.data;
            if(res.status === '0'){
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
        },
        //选择全部
        checkAll(){
          let flag = this.checkAllList ==="1"?"0":"1"; //修改列表状态，保存到flag上同时改变页面上的值，进而改变checkCount
          this.cartList.forEach((item)=>{
            item.checked = flag;
          });
          axios.post('/users/editCheckAll',{
            checkAllList:this.checkAllList,
          }).then((response)=>{
            let res = response.data;
            if(res.status==='0'){
              console.log(res.result)
            }
            else {
              console.log(res.msg)
            }
          })
        },
        //修改购物车信息
        editCart(flag,item){
          if(flag === 'add'){
            item.productNum ++;
          }else if(flag === 'minus'){
            if(item.productNum>1){
              item.productNum --;
            }
          }
          else if(flag === 'checked'){
            item.checked = item.checked ==="1"?"0":"1";
          }
          axios.post('/users/cartEdit',{
            productId:item.productId,
            productNum:item.productNum,
            checked:item.checked,
          }).then((response)=>{
            let res = response.data;
            console.log("修改成功")
          })
        },
        //结算跳转
        checkout(){
          if(this.checkCount>0){
            this.$router.push({'path':'/address'});
          }
        },


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
    text-align: center;
    min-width: 50rem;
  }
  .num-btn{
    width: 1.3rem;
  }
  .check{
    display: none;
  }
  .PriceCount{
    text-align: right;
    padding-right: 5rem;
    font-weight: bold;
    font-size: 1.3rem;
  }
  .checkout_default{
    color:#fff;
    font-size: 1.3rem;
    text-align: center;
  }
  .checkout{
    /*background-color: #28a745;*/
    background-color: rgb(18,150,219);
    text-align: center;
  }
  .uncheckout{
    background-color: #ccc;
    text-align: center;
  }
  .table-head{
    background-color: rgb(18,170,219);
  }
  .main{
    max-width: 80rem;
    margin: 0 auto;
  }
</style>
