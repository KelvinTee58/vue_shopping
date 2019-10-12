<template>
  <header>
    <div class="row">
      <div class="col-md-6">
        <img src="@/assets/logo.png" class="logo">
      </div>
      <div class="col-md-6">
        <div class="loginButton">

          <img src="@/assets/person.png" v-if="loginName">
          <span style="color:red;" v-text="loginName" v-if="loginName"></span>
          <a href="#" data-toggle="modal" data-target="#myModal" v-if="!loginName">Login in</a>
          <a href="#" data-toggle="modal" @click="loginOut" v-if="loginName">Login out</a>
          <router-link to="/cart">
            <img src="@/assets/shopping_cart.png" v-if="loginName">
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
        loginName:''
      }
    },
    mounted(){
      this.checkLogin();
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
            this.loginName = res.result.userName;
          }else {
            this.errTip = true;
            console.log("err")
          }
        })
      },
      hideModal(){
        $('#myModal').modal('hide');
      },
      loginOut(){
        axios.post("/users/logout").then((response)=>{
          let res = response.data;
          console.log("1+"+res);
          if(res.status === '0'){
            this.loginName = '';
          }
        })
      },
      checkLogin(){
        axios.get("/users/checkLogin").then((response)=>{
          let res = response.data;
          if(res.status === '0'){

            this.loginName = res.result;

          }
        });
      }
    }
  }
</script>
<style scoped>
  .logo {
    width: 4rem;
    margin: 1rem;
  }

  .loginButton {
    font-size: 1.4rem;
    line-height: 6rem;
  }
  .loginButton a{
    font-size: 1rem;
    padding-left: 3rem;
  }
  .loginButton img{
    height: 1.6rem;
  }
  .err-Tip{
    font-size: 0.6rem;
    color: red;
  }
</style>
