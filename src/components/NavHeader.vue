<template>
    <header class="row">
      <div class="col-md-6">
        <img src="@/assets/logo.png" class="logo">
      </div>
      <div class="col-md-6">
        <div class="loginButton">
          <a href="#">login in</a>/
          <a href="#">Sign in</a>
        </div>
      </div>
    </header>
</template>
<script>
    export default {
        name: "NavHeader"
    }
</script>
<style scoped>
  /*header{*/
    /*border: 1px solid #000;*/
  /*}*/
  .logo{
    width: 4rem;
    margin: 1rem;
  }
  .loginButton{
    font-size: 1.4rem;
    line-height: 6rem;
  }
</style>
