<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Address</span>
    </nav-bread>

    <div class="main">
      <!--steps start-->
      <Steps :current="current" class="Steps">
        <Step title="选择地址"></Step>
        <Step title="订单" content="查看商品订单"></Step>
        <Step title="支付" content="进行支付"></Step>
        <Step title="支付成功"></Step>
      </Steps>
      <!--steps end-->



      <!--address start-->
      <div class="row">
        <div class="col-6 col-md-3" v-for="(item,index) in addressListFilter" @click="checkAddressIndex = index">
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
      <div style="text-align: center">
        <Button type="primary" @click="next">下一步</Button>
      </div>
    </div>
    <Modal>
      <p slot="message">是否删除该地址</p>
      <div slot="btn-group">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteAddress()">删除</button>
      </div>
    </Modal>
    <nav-footer></nav-footer>
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
      data() {
        return {
          current: 0,
          addressList:[],
          showMore:4,
          checkAddressIndex:0,
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
        next() {
          this.current++;
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
          axios.post('/users/setDefault',{
            addressId:addressId,
          }).then((response)=>{
            this.getAddressList();
          })
        },
        deleteAddress(){

        }
      }
    }
</script>

<style scoped>

  .main{
    max-width: 80rem;
    margin: 0 auto;
  }
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
  .Steps{
    margin-bottom: 3rem;
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

</style>
