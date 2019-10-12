<template>
  <div class="modal fade" id="tipModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Tips</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name = "message"></slot>
        </div>
        <div class="modal-footer">
          <slot name="btn-group"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './../../node_modules/bootstrap/dist/js/bootstrap';
  import './../../node_modules/bootstrap/dist/css/bootstrap.css';
  import './../../node_modules/jquery/dist/jquery';
    export default {
      props:["mdShow"],

    }
</script>

<style scoped>

</style>
