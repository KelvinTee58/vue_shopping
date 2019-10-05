<template>
    <div class="footer">
      <img src="@/assets/css/mark-github.svg">
      <div>
        <a href="https://kevinjiezheng.github.io/">KevinJieZheng</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "NavFooter"
    }
</script>

<style scoped>
  .footer{
    height: 10rem;
    /*border: 1px solid #000;*/
    padding-top: 6rem;
  }
  img{
    width: 1rem;
  }
  a{
    font-size: 1rem;
    color: #000;
    text-decoration: none;
  }

</style>
