<template>
  <div>
    <div class="main">

      <!--address start-->
      <div class="row">
        <div class="col-6 col-md-3" v-for="(item,index) in addressListFilter"
             @click="setCheckoutDate(index,item.addressId)">
          <Card class="AddressCard" :class="{'AddressCardCheck':checkAddressIndex === index}">
            <div class="addressName" slot="title">{{item.userName}}</div>
            <a slot="extra" >
              <img src="@/assets/delete.png" class="deleteIcon" @click="tipModal(item.addressId)"/>
            </a>
            <div class="addressStreet">{{item.streetName}}</div>
            <div class="addressMes">{{item.tel}}</div>
            <div class="addressMes">{{item.postCode}}</div>
            <div class="addressDefault">{{item.isDefault | isDefaultCheckout}}</div>
            <div class="addressDefault" v-show="checkAddressIndex === index" v-if="!item.isDefault"><a @click="setDefaultAddress(item.addressId)">设置默认地址</a></div>

          </Card>
        </div>
      </div>
      <div class="addressMore" @click="showMoreFun">
        <a>More</a>
        <img src="@/assets/up.png" v-show="showMore!==4">
        <img src="@/assets/down.png" v-show="showMore===4">
      </div>

      <!--address end-->
      <div style="text-align: right">
        <Button type="dashed">添加新地址</Button>
      </div>
      <div class="myButton">
        <Button type="primary" @click="next">
          下一步
        </Button>
      </div>

    </div>
    <Modal>
      <p slot="message">是否删除该地址</p>
      <div slot="btn-group">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteAddress()">删除</button>
      </div>
    </Modal>

  </div>
</template>
<script>
    import bus from "@/router/bus"
    import Modal from "@/components/Modal.vue";
    import axios from 'axios';
    export default {
      components: {Modal},
      data() {
        return {
          addressList:[],
          showMore:4,
          checkAddressIndex:null,
          checkAddressId:'',
          addressId:''
        };
      },
      filters:{
        isDefaultCheckout:function (val) {
          if(val===true){
            return "默认地址";
          }
          else return "";
        }
      },
      computed:{
        addressListFilter:function () {
          return this.addressList.slice(0,this.showMore);
        }
      },
      mounted(){
        this.getAddressList();
      },
      methods: {
        next(){
          this.$emit('toOrder',1);
          bus.$emit('get-id',this.checkAddressId);
        },
        setCheckoutDate(index,id){
          this.checkAddressIndex = index;
          this.checkAddressId = id;
        },
        tipModal(addressId){
          $('#tipModal').modal('show');
          this.addressId = addressId;
        },
        getAddressList() {
          axios.get("/users/addressList").then((response) => {
            this.addressList = response.data.result;
          })
        },
        showMoreFun(){
          this.showMore = this.showMore===4?this.addressList.length:4;
          console.log(this.checkAddressIndex)
        },
        setDefaultAddress(addressId){
          axios.post('/users/addressList/setDefault',{
            addressId:addressId,
          }).then((response)=>{
            this.getAddressList();
          })
        },

        deleteAddress(){
          axios.post('/users/addressList/deleteAddress',{
            addressId:this.addressId,
          }).then((response)=>{
            console.log(response.data)
          })
        }

      }
    }
</script>

<style scoped>


  .AddressCard{
    height: 12rem;
    margin-bottom: 1rem;
  }
  .AddressCard:hover{
    border-color: #288cf0;
  }
  .AddressCardCheck{
     border-color: #288cf0;
   }
  .addressName{
    font-weight: bold;
    color: rgb(40,140,240);
    font-size: 1.5rem;
  }
  .addressDefault{
    font-size: 0.8rem;
    color: red;
    text-align: right;
  }
  .addressSetDefault{
    display: none;
  }

  .addressStreet{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 2.8rem;
  }
  .addressMes{
    color: #999;
    font-size: 0.8rem;
  }
  .deleteIcon{
    width: 1rem;
  }
  .addressMore{
    text-align: center;
    font-weight: bold;
    color: rgb(40,140,240);
    font-size: 0.8rem;
  }
  .addressMore img{
    width: 0.8rem;
  }
  .myButton{
    text-align: center;
  }
  .myButton Button{
    height: 2.3rem;
    font-size: 1.2rem;
    line-height: 2.3rem;
  }

</style>
