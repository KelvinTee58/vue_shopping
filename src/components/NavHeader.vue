<template>
  <header>
    <div class="row">
      <div class="col-md-6" v-on:click="toHome" style="text-align: center;">
        <img src="@/assets/logo.png" class="logo">
      </div>
      <div class="col-md-6">
        <div class="loginButton">

          <img src="@/assets/person.png" v-if="getUserName !== ''">
          <span style="color:red;" v-text="getUserName" v-if="getUserName !== ''"></span>
          <a href="#" data-toggle="modal" data-target="#myModal" v-if="getUserName === ''">Login in</a>
          <a href="#" data-toggle="modal" @click="loginOut" v-if="getUserName !== ''" style="padding-left: 3rem;padding-right: 3rem">Login out</a>
          <router-link to="/cart"  v-if="getUserName !== ''">
            <Badge :count="getCartCountDate">
              <img src="@/assets/shopping_cart.png">
            </Badge>
          </router-link>
        </div>
      </div>
    </div>

    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
         data-backdrop="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <!--登陆框头部-->
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">
              欢迎登陆！
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              ×
            </button>
          </div>
          <!--登陆框中间部分(from表单)-->
          <div class="modal-body">
            <form class="form-horizontal" role="form">
              <!--用户框-->
              <div class="err-Tip" v-show="errTip">
                密码或者账号错误
              </div>
              <div class="form-group">
                <label for="username" class="control-label">用户名</label>
                <div>
                  <input type="text" class="form-control" id="username" placeholder="username" required="required" v-model="userName">
                </div>
              </div>
              <!--密码框-->
              <div class="form-group">
                <label for="password" class="control-label">密码</label>
                <div>
                  <input type="password" class="form-control" id="password" placeholder="password" required="required" v-model="userPwd">
                </div>
              </div>
              <!--登陆按钮-->
              <div class="form-group">
                <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary" @click="loginIn">登录</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  import './../../node_modules/bootstrap/dist/js/bootstrap';
  import './../../node_modules/bootstrap/dist/css/bootstrap.css';
  import './../../node_modules/jquery/dist/jquery';
  import axios from 'axios'

  export default {
    data(){
      return{
        userName:'',
        userPwd: '',
        errTip:false,
      }
    },
    computed:{
      getUserName(){
        return this.$store.state.userName;
      },
      getCartCountDate(){
        return this.$store.state.cartCount;
      }
    },
    mounted(){
      this.checkLogin();
      this.getCartCount();
    },

    methods:{
      loginIn(){
        axios.post("/users/login",{
          userName:this.userName,
          userPwd:this.userPwd,
        }).then((response)=>{
          let res = response.data;
          if(res.status==="0"){
            this.errTip = false;
            this.hideModal();
            this.$store.commit("upDataUserInfo",res.result.userName);
          }else {
            this.errTip = true;
          }
        })
      },
      hideModal(){
        $('#myModal').modal('hide');
      },
      loginOut(){
        axios.post("/users/logout").then((response)=>{
          let res = response.data;
          if(res.status === '0'){
            this.$store.commit("upDataUserInfo",'');
            this.$store.commit("initCartCount",0);
          }
        })
      },
      toHome(){
        this.$router.push({ path:'/' })
      },
      checkLogin(){
        axios.get("/users/checkLogin").then((response)=>{
          let res = response.data;
          if(res.status === '0'){

            //this.loginName = res.result;
            this.$store.commit("upDataUserInfo",res.result);
          }
        });
      },
      getCartCount(){
        axios.get("/users/goodCartCount").then((response)=>{
          let res = response.data;
          this.$store.commit("initCartCount",res.result);
        })
      }
    }
  }
</script>
<style scoped>

  .logo {
    width: 4rem;
    margin: 2rem;
  }
  .loginButton {
    font-size: 1.4rem;
    padding: 3rem 0 3rem 0;

    text-align: center;
  }
  .loginButton a{
    font-size: 1rem;

  }
  .loginButton img{
    height: 1.6rem;
  }
  .err-Tip{
    font-size: 0.6rem;
    color: red;
  }

</style>
