<template>
  <section class="page">
    <van-cell-group class='avater-wrap'>
      <span class="avater">
        <img :src="formData.userPhoto" alt="头像">
      </span>
      <span class='name-wrap'>
        <span class='name'>{{formData.personName}}</span>
        <span class='phone'>{{formData.mobileNumber}}</span>
      </span>
      
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="formData.companyName"
        label="工作单位："
        :disabled='formData.status=="3"'
        placeholder="请输入工作单位"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="formData.organizationName"
        label="单位组别："
        placeholder="请选择单位组别"
        readonly
        @click='handleSelectOrganize'
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="formData.roleName"
        label="用户角色："
        placeholder="请选择用户角色"
        readonly
        @click='handleSelectRole'
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        label="管理锁具："
        placeholder="请选择锁具"
        readonly
        @click='handleSelectLock'
      />
    </van-cell-group>
    <div style='position:relative'>
      <div v-if='loadingLock' class="loading" style='position:absolute;top:50%;left:50%;margin-left:-.25rem;margin-top:-.25rem; z-index:222;width:.5rem;height:.5rem'>
        <van-loading />
      </div>
      
      <div style='padding:.3rem 0 !important;background:#fff;' class='lockitem' v-for='(item,index) in lockList' :key='item.id'>
        <span class='lock-text'>
          {{item.lockId}}
        </span>
        <span class="icon-clear" @click='handleDeleteLock(index)'></span>
        
      </div>
    </div>
    
    <van-collapse v-model="activeNames" style='margin-top:5px'>
      <van-collapse-item :title="statusTitle" name="1" style='text-align:left'>
        <div class="img-item">
          <div class="dec">
            <span>身份证正面</span>
          </div>
          <div class="img-wrap">
            <img :src="formData.facadePhoto" alt="身份证正面">
          </div>
        </div>
        <div class="img-item">
          <div class="dec">
            <span>身份证背面</span>
          </div>
          <div class="img-wrap">
            <img :src="formData.backPhoto" alt="身份证背面">
          </div>
        </div>
        <div class="img-item">
          <div class="dec">
            <span>手持身份证</span>
          </div>
          <div class="img-wrap">
            <img :src="formData.handheldPhoto" alt="手持身份证">
          </div>
        </div>
        <div class="img-item">
          <div class="dec">
            <span>附件1</span>
          </div>
          <div class="img-wrap">
            <img :src="formData.attachment1" alt="附件1">
          </div>
        </div>
        <div class="img-item">
          <div class="dec">
            <span>附件2</span>
          </div>
          <div class="img-wrap">
            <img :src="formData.attachment2" alt="附件2">
          </div>
        </div>
        <van-cell-group>
          <van-field
            v-model="formData.documentNumber"
            label="证件号码："
            :disabled='formData.status=="3"'
            placeholder="请输入证件号码"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="formData.documentAddress"
            label="证件地址："
            :disabled='formData.status=="3"'
            placeholder="请输入证件地址"
          />
        </van-cell-group>
        <p style='text-align: left;padding:.1rem 0.5rem;font-size:0.45rem;'>状态</p>
        <van-radio-group v-model="formData.status" :disabled='formData.status=="3"'>
          <van-cell-group>
            <van-cell title="已实名" clickable @click="formData.status = '3'" style='text-align: left;padding-left:0.5rem'>
              <van-radio name="3" />
            </van-cell>
            <van-cell title="通过" clickable @click="formData.status = '2'" style='text-align: left;padding-left:0.5rem'>
              <van-radio name="2" />
            </van-cell>
            <van-cell title="不予通过" clickable @click="formData.status = '1'" style='text-align: left;padding-left:0.5rem'>
              <van-radio name="1" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-collapse-item>
    </van-collapse>
    <div class="button-wrap">
      <van-button size='large' @click='handleSubmit' :loading='saveloading' type="primary" style='margin-bottom:5px'>保存并返回</van-button>
      <van-button type="default" size='large' @click='handleBack'>返回</van-button>
    </div>
    <van-popup v-model="roleStatus" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        title="选择用户角色"
        confirm-button-text='确认'
        cancel-button-text='取消'
        :columns=" roleColumns"
        @cancel="roleCancel"
        @confirm="roleConfirm"
        
      />
    </van-popup>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        title="选择单位组别"
        confirm-button-text='确认'
        cancel-button-text='取消'
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model="lockStatus" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        title="选择锁具ID"
        confirm-button-text='确认'
        cancel-button-text='取消'
        :columns="lockColumns"
        @cancel="onCancelLock"
        @confirm="onConfirmLock"
      />
    </van-popup>

    
  </section>
</template>

<script >

import Vue from 'vue'
import { Collapse, CollapseItem,Field,Picker,Toast,Popup,RadioGroup, Radio,Cell,CellGroup } from 'vant';
import { Row, Col } from 'vant';
import { Loading } from 'vant';

Vue.use(Loading);
Vue.use(Row).use(Col);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Collapse).use(CollapseItem);
Vue.use(Field);
Vue.use(Popup);
 
Vue.use(Picker);

Vue.use(Toast);

import {getUserInfo, getOrgList,getRoleListOfOrganization, editCertification,getLocks,getAllLocks,addLock,deleteLock} from 'api/certification'
export default {
  components: {},

  props: {},

  data() {
    return {
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      show:false,
      message:'',
      formData:{},
      organizationList:[],
      roleList:[],
      roleColumns:[],
      roleStatus:false,
      saveloading:false,
      activeNames:['1'],
      radio:'1',
      statusTitle:'',
      lockList:[{
        text:"222"
      },{
        text:"2232322"
      }],
      lockStatus:false,
      allLockList: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      lockColumns:[],
      loadingLock:false
    }

  },

  watch: {},

  methods: {
    onConfirm(value, index) {
      this.show = false;
      this.formData.organizationName = value;
      this.formData.organizationId = this.organizationList[index].id;
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      this.show = false;
      // Toast('取消');
    },
    onCancelLock(){
      this.lockStatus = false;
    },
    handleDeleteLock(index){
      deleteLock(this.lockList[index].id).then(res=>{
        if(res.code ==204){
          Toast('删除成功');
          this.handleGetLocks();
        }else{
          Toast('删除失败');
        }
      }).catch((e)=>{
        Toast('删除失败');
      })
    },
    onConfirmLock(value, index){
      this.lockStatus = false;
      const principalId = this.$route.params.id;
      const lockInfoId = this.allLockList[index].id;
      addLock({lockInfoId,principalId}).then(res=>{
        if(res.code ==200){
          Toast('保存成功');
          this.handleGetLocks();
        }else{
          Toast('保存失败');
        }
      }).catch((e)=>{
        Toast('保存失败');
      })
    },
    roleConfirm(value, index) {
      this.roleStatus = false;
      this.formData.roleName = value;
      this.formData.roleId = this.roleList[index].id;
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },
    roleCancel() {
      this.roleStatus = false;
      // Toast('取消');
    },
    handleSelectOrganize(){
      if(this.formData.status =='3') return;
      this.show = true;
    },
    handleSelectRole(){
      if(this.formData.status =='3') return;
      this.roleStatus = true;
    },
    handleSelectLock(){
      this.lockStatus = true;
    },
    
    handleSubmit(){
      this.saveloading = true;
      editCertification(this.formData).then(res=>{
        this.saveloading = false;
        if(res.code == 201){
            Toast('保存成功');
            this.handleBack();
        }else if(res.code == 101){
            Toast('操作失败,没有审核权限 ');
        }else{
            Toast('保存失败');
        }
      }).catch((e)=>{
        this.saveloading = false;
        Toast('保存失败');
      })
    },
    handleBack(){
      this.$router.push({
        name:'user',
      })
    },
    handleGetLocks(){
      this.loadingLock = true;
      getLocks(this.$route.params.id).then(res=>{
        this.loadingLock = false;
        if (res.code == 200) {
            this.lockList = res.content;
          }
      }).catch((e) =>{
        this.loadingLock = false;
      })
    }
  },

  mounted() {
    getOrgList({}).then(res=>{
      if(res.code == 200){
        this.organizationList = res.content;
        this.columns = [];
        this.organizationList.forEach((item) => {
          this.columns.push(item.organizationName)
        });
      }
    })
    getRoleListOfOrganization().then(res=>{
      if (res.code == 200) {
          this.roleList = res.content
          this.roleColumns = []; 
          this.roleList.forEach((item) => {
            this.roleColumns.push(item.roleName)
          });
        }
    })
    getUserInfo(this.$route.params.id).then(res=>{
        if(res.code == 200){
          this.formData = res.content;
          this.formData.organizationName =res.content.organizationInfo.organizationName; 
          this.formData.status = this.formData.status + '';
          this.statusTitle = `实名信息——${this.formData.displayStatus}`
        }else{
            
        }
    }).catch(()=>{
        
    })

    this.handleGetLocks();
    getAllLocks().then(res=>{
      if(res.code == 200){
        this.allLockList = res.content;
        this.lockColumns=[];
        this.allLockList.forEach((item) => {
          this.lockColumns.push(item.lockId)
        });
      }
    })
  },

}
</script>

<style lang='less' scoped>
.button-wrap{
  padding:10px;
}
.avater-wrap{
  padding:.2rem .8rem;
  text-align: left;
  span{
    display: inline-block;
  }
  .avater{
    width:1.6rem;
    height:1.6rem;
    border-radius: 50%;
    vertical-align: middle;
    img{
      width:100%;
      height:100%;
      display: inline-block;
      border-radius: 50%;
    }
  }
  .name-wrap{
    width:5rem;
    height:1.6rem;
    vertical-align: middle;
    padding-left:.4rem;
    box-sizing: border-box;
    .name{
      width:5rem;
      line-height: 1rem;
    }
    .phone{
      width:5rem;
      line-height: .6rem;
    }
  }
  
}
.img-item{
  .dec{
    padding: 0 10px;
    span{
      display: inline-block;
      padding:3px 5px;
      border-radius: 10%;
      background-color: rgba(246, 247, 246, 1);
      border: 1px solid rgba(235, 235, 235, 1);
    }
  }
  .img-wrap{
    width:4rem;
    height:4rem;
    border:1px solid rgba(235, 235, 235, 1);
    margin: .3rem auto;
    img{
      width:100%;
      height:100%;
    }
  }
}
.lockitem{
  position: relative;
  span{
    display: inline-block;
    
  }
  .lock-text{
    width: 5rem;
    text-align: left;
  }
  .icon-clear{
    position: absolute;
    display: inline-block;
    width:0.53rem;
    height:0.53rem;
    top: 50%;
    margin-top: -0.26rem;
    right:.5rem;
    background: #fff;
    background-image: url("../../assets/imgs/clear.svg");
    background-size: cover;
  }
}

</style>
