<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item active" aria-current="page"><slot name="bread"></slot></li>
    </ol>
  </nav>
</template>

<script>
    export default {
        name: "NavBread"
    }
</script>

<style scoped>

</style>
