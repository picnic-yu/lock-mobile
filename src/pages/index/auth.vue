<template>
    <section class="user">
        <div class="search">
            <span class='input-wrap'>
                <div class="input-box">
                    <span class="icon"></span>
                    <input type="text" @input='handleInputChange' v-model="params.keyWords" class="search-input" placeholder="">
                    <span class="icon-clear" v-if='params.keyWords' @click='handleClear'></span>
                </div>
            </span>
            <span class='sure'>
                确定
            </span>
        </div>
        <div class="state-wrap">
            
            <div class="item ">
                <div class="btn" :class="params.status==null ? 'active' : '' " @click='handleGetList(null)'>全部</div>
            </div>
            <div class="item ">
                <div class="btn" :class="params.status==2 ? 'active' : '' " @click='handleGetList(2)'>未执行</div>
            </div>
            <div class="item ">
                <div class="btn" :class="params.status==1 ? 'active' : '' " @click='handleGetList(1)'>申请中</div>
            </div>
            <div class="item ">
                <div class="btn" :class="params.status==3 ? 'active' : '' " @click='handleGetList(3)'>已执行</div>
            </div>
            <div class="item ">
                <div class="btn" :class="params.status==4 ? 'active' : '' " @click='handleGetList(4)'>未通过</div>
            </div>
        </div>
        <div class="content">
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
                <li class='item title' >
                    <span class='number'>
                        锁具ID
                    </span>
                     <span>
                        授权日期
                    </span>
                     <span>
                        申请人
                    </span>
                     <span>
                        授权人
                    </span>
                    <span>
                        状态
                    </span>
                </li>
                <li class='item list-content' v-for="item in listData" :key='item.id'>
                    <span class='number'>
                        {{item.lockId}}
                    </span>
                     <span>
                        {{item.displayAuthTime.slice(5,10)}}
                    </span>
                     <span>
                        {{item.applyName}}
                    </span>
                     <span>
                        {{item.authorizerName}}
                    </span>
                    <span>
                        {{item.displayStatus}}
                    </span>
                </li>
            </ul>
            
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
import { InfiniteScroll } from 'mint-ui';
import Vue from 'vue';
import cusInput from 'common/cus-input'
import {getAuthList} from 'api/auth'
Vue.use(InfiniteScroll);
export default {
    components: {
        cusInput
    },

    props: {},

    data() {
        return {
            loading:false,
            listData:[],
            params:{
                status:null,
                keyWords:'',
                pageNumber:0,
                pageSize:20
            },
            total:0
        }

    },

    watch: {},

    methods: {
        loadMore() {
            if(this.listData.length>=this.total) return;
            this.loading = true;
            this.params.pageNumber += 1;
            getAuthList(this.params).then(res=>{

                if(res.code == 200){
                    this.listData.push(...res.content.data) ;
                }
                this.loading = false;
            }).catch(()=>{
               this.loading = false;
            })
        },
        handleGetList(status){
            this.params.status = status;
            this.params.pageNumber = 0;
            this.params.pageSize = 20;
            this.getList();
        },
        handleClear(){
            this.params.keyWords = '';
            this.getList();
        },
        handleInputChange(){
           this.getList();
        },
        getList(){
            getAuthList(this.params).then(res=>{

                if(res.code == 200){
                    this.listData = res.content.data;
                    this.total = res.content.rowCount;
                }else{
                    this.total = 0
                    this.listData = [];
                }
            }).catch(()=>{
               this.listData = [];
            })
        }
    },
    
    mounted() {
        this.getList();
        // this.loadMore();
    },

}
</script>

<style lang='less' scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.input-box{
  position: relative;
  .icon{
    position: absolute;
    display: inline-block;
    .w(45);
    .h(45);
    top: 50%;
    .mt(-18);
    .left(-20);
    background-image: url("../../assets/imgs/search.svg");
    background-size: cover;
  }
  .icon-clear{
    position: absolute;
    display: inline-block;
    .w(40);
    .h(40);
    top: 50%;
    .mt(-18);
    .right(-0);
    background: #fff;
    background-image: url("../../assets/imgs/clear.svg");
    background-size: cover;
  }
  .search-input{
    .b-radius(8);
    .h(50);
    .lh(50);
    width: 95%;
    outline: none;
    .pl(50);
    .pt(5);
    .pt(5);
    .ml(-25);
    .fs(26);
  }
}
    .user{
        height:calc(~"100% - 1.31rem");
        .search{
            padding:0.3rem 0rem 0.1rem ;
            height:1rem;
            width:100%;
            .input-wrap{
                display: inline-block;
                width:8rem;
            }
            .sure{
                display: inline-block;
                padding:0 3px;
            }
        }
        .state-wrap{
            background: #fff;
            height:1.2rem;
            width:100%;
            display: flex; 
            .item{
                flex: 1;
                padding:3px;
                .active{
                    background: #2d8cf0;
                    color:#fff;
                }
                .btn{
                    height:0.8rem;
                    width:90%;
                    margin:0.2rem 5%;
                    border:1px solid #2d8cf0;
                    border-radius: 3px;
                    box-sizing: border-box;
                    line-height: 0.8rem;
                }
            }
        }
        .content{
            background: #fff;
            height:calc(~"100% - 2.2rem");
            width:100%;
            overflow: auto;
            .title{
                background-color: rgba(211, 211, 211, 1);
                position:fixed;
            }
            .list-content{
                .number{
                    color:#2d8cf0;
                }
            }
            .item{
                height:1rem;
                line-height: 1rem;
                width:95%;
                display: flex;
                border-bottom: 1px solid #e6e6e6;
                text-align: left;
                margin:0 auto;
                padding:0 .2rem;
                span{
                    flex:1;
                    // 超过文本省略号显示
                    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
                }
                .number{
                    flex:2;
                }
            }
        }
    }

</style>
