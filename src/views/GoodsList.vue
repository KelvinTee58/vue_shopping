<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Goods</span>
    </nav-bread>
    <!--this is goods List page start-->
    <div class="main" style="max-width: 80rem;margin: 0 auto;">

      <nav>
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
        <div class="col-md-2" style="min-width: 18rem;max-width: 20rem;" v-for="item in goodList">
          <div class="card">
            <a href="#"><img class="card-img-top" :src="'/static/img/'+item.productImage" alt="Card image cap"></a>
            <div class="card-body">
              <h5 class="card-title">{{item.productName}}</h5>
              <p class="card-text">{{item.salePrice}}</p>
              <a href="#" class="btn btn-primary">购买</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--this is goods List page end-->
    <nav-footer class="Footer"></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/base.css'
  import NavHeader from "@/components/NavHeader.vue";
  import NavFooter from "@/components/NavFooter.vue";
  import NavBread from "@/components/NavBread.vue";
  import  axios from 'axios';

    export default {
      data(){
        return{
          goodList:[],
          isChoose:true,
          page:1,
          pageSize:8,

        }
      },
      name: "GoodsList",
      components: {NavHeader,NavFooter,NavBread},
      mounted() {
        this.getGoodsList();
      },
      methods:{
        getGoodsList(){
          let param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.isChoose?1:-1
          };
          axios.get("/goods",{params:param}).then((response)=>{
            let res = response.data;
            if(res.status == "0"){
              this.goodList = res.result.list;
            }else{
              this.goodList =[];
            }
            console.log(this.goodList);
          })
        },
        toggleActive(){
          this.isChoose = !this.isChoose;
          this.page = 1;
          this.getGoodsList();

        }
      }
    }
</script>

<style scoped>
</style>
