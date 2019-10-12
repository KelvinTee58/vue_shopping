<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Goods</span>
    </nav-bread>
    <!--this is goods List page start-->
    <div class="main" style="max-width: 80rem;margin: 0 auto;">
      <nav style="margin-bottom: 3rem">
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link active" href="#">默认</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">价格排序</a>
            <div class="dropdown-menu" role="menu" aria-labelledby="dLabel">
              <a class="dropdown-item" :class="{'active':isChoose}" @click="toggleActive" href="#">按价格由高到低</a>
              <a class="dropdown-item" :class="{'active':!isChoose}" @click="toggleActive" href="#">按价格由低到高</a>
            </div>
          </li>

        </ul>
      </nav>

      <div class="row justify-content-left" >
        <div class="col-md-3 goodsCard" style="min-width: 18rem;max-width: 20rem;" v-for="item in goodList">
          <div class="card">
            <a href="#">
              <img class="card-img-top" :src="'/static/img/'+item.productImage" v-bind:alt="item.productName">
            </a>
            <div class="card-body">
              <h5 class="card-title">{{item.productName}}</h5>
              <p class="card-text">{{item.salePrice}}</p>
              <a href="#" class="btn btn-primary" @click="addCart(item.productId)">加入购物车</a>
            </div>
          </div>
        </div>
      </div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
        加载中...
      </div>
    </div>
    <modal v-if="!isLogin">
      <p slot="message">
        先登录
      </p>
      <div slot="btn-group">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>
    </modal>
    <modal v-if="isLogin">
      <p slot="message">
        加入购物车成功
      </p>
      <div slot="btn-group">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="toCart">查看购物车</button>
      </div>
    </modal>
    <!--this is goods List page end-->
    <nav-footer class="Footer"></nav-footer>
  </div>
</template>

<script>
  import NavHeader from "@/components/NavHeader.vue";
  import NavFooter from "@/components/NavFooter.vue";
  import NavBread from "@/components/NavBread.vue";
  import Modal from "@/components/Modal.vue";
  import  axios from 'axios';

    export default {
      data(){
        return{
          goodList:[],
          isChoose:true,
          page:1,
          pageSize:8,
          busy:true,
          isLogin:false,
        }
      },
      name: "GoodsList",
      components: {NavHeader,NavFooter,NavBread,Modal},
      mounted() {
        this.getGoodsList();
      },
      methods:{
        getGoodsList(flag){
          let param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.isChoose?1:-1
          };
          axios.get("/goods/list",{params:param}).then((response)=>{
            let res = response.data;
            if(res.status === "0"){
              if(flag){
                this.goodList = this.goodList.concat(res.result.list);
                if (res.result.count == 0){
                  this.busy = true;
                }else {
                  this.busy = false;
                }
              }else {
                this.goodList = res.result.list;
                this.busy = false;
              }
            }else{
              this.goodList =[];
            }
          })
        },
        toggleActive(){
          this.isChoose = !this.isChoose;
          this.page = 1;
          this.getGoodsList();
        },

        loadMore(){
          this.busy = true;
          setTimeout(() => {
            this.page++;
            this.getGoodsList(true);
          }, 1000);
        },

        addCart(productId){
          axios.post("/goods/addCart",{
            productId:productId
          }).then((res)=>{
            if(res.data.status == 0){
              this.isLogin = true;
            }else{
              this.isLogin = false;
            }
            $('#tipModal').modal('show');
          })
        },
        toCart(){
          this.$router.push({ path:'/cart' })
        }
      }
    }
</script>

<style>
  .goodsCard{
    margin-bottom: 1.2rem;
  }
  .card:hover{
    box-shadow: 0 0 2rem #ccc;
    -moz-box-shadow:0 0 2rem #ccc;
  }
</style>
