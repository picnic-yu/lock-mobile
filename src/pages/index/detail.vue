<template>
  <section class="page">
    <van-cell-group>
      <van-field
        v-model="formData.companyName"
        label="工作单位："
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
        v-model="formData.documentNumber"
        label="证件号码："
        placeholder="请输入证件号码"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="formData.documentAddress"
        label="证件地址："
        placeholder="请输入证件地址"
      />
    </van-cell-group>
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

    
  </section>
</template>

<script >

import Vue from 'vue'
import { Field } from 'vant';

import { Picker } from 'vant';
import { Toast } from 'vant';

import { Popup } from 'vant';
Vue.use(Field);
Vue.use(Popup);
 
Vue.use(Picker);

Vue.use(Toast);

import {getUserInfo, getOrgList,getRoleListOfOrganization, editCertification} from 'api/certification'
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
      saveloading:false
    }

  },

  watch: {},

  methods: {
    onConfirm(value, index) {
      this.show = false;
      this.formData.organizationName = value;
      this.formData.organizationId = this.organizationList[index].id;
      console.log(this.formData.organizationId)
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      this.show = false;
      // Toast('取消');
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
      this.show = true;
    },
    handleSelectRole(){
      this.roleStatus = true;
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
    console.log(this.$route.params)
    getUserInfo(this.$route.params.id).then(res=>{
        if(res.code == 200){
          this.formData = res.content;
          this.formData.organizationName =res.content.organizationInfo.organizationName; 
        }else{
            
        }
    }).catch(()=>{
        
    })
  },

}
</script>

<style lang='less' scoped>
.button-wrap{
  padding:10px;
}
</style>
