<template>
    <section class="user">
        <div class="search">
            <span class='input-wrap'>
                <div class="input-box">
                    <span class="icon" @click='handleInputChange'></span>
                    <input type="text" @input='handleInputChange' v-model="params.keyWords" class="search-input" placeholder="">
                    <span class="icon-clear" v-if='params.keyWords' @click='handleClear'></span>
                </div>
            </span>
            <span class='sure' @click='handleInputChange'>
                确定
            </span>
        </div>
       
        <div class="content">
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
                <li class='item title' >
                    <span class='number' >
                        锁具ID
                    </span>
                     <span>
                        操作时间
                    </span>
                     <span>
                        执行人
                    </span>
                     <span>
                        动作
                    </span>
                </li>
                <li class='item list-content' v-for="item in listData" :key='item.id'>
                    <span class='number' @click='handlePreview(item)'>
                        {{item.lockId}}
                    </span>
                     <span>
                        {{item.displayAT.slice(5,10)}}
                    </span>
                     <span>
                        {{item.executorName}}
                    </span>
                     <span>
                        {{item.displayActionType}}
                    </span>
                </li>
            </ul>
            
        </div>
        <div class="mark" v-if='detailStatus'>
            <div class="content-wrap">
                <div class="mark-content">
                    <p class='title'>
                        <span>锁具ID：</span>
                        <span>{{detailItem.lockId}}</span>
                    </p>
                    <p>
                        <span>地址：</span>
                        <span>{{detailItem.locationAddress}}</span>
                    </p>
                    <p>
                        <span>设施名称</span>
                        <span>{{detailItem.lockInfo.facilityName}}</span>
                    </p>
                    <p>
                        <span>位置编号</span>
                        <span>{{detailItem.lockInfo.locationCode}}</span>
                    </p>
                    <p>
                        <span>执行人：</span>
                        <span>{{detailItem.executorName}}</span>
                    </p>
                    
                    <p>
                        <span>工作任务：</span>
                        <span>{{detailItem.displayTaskType}}</span>
                    </p>
                    <p>
                        <span>锁具动作：</span>
                        <span>{{detailItem.displayActionType}}</span>
                    </p>
                    <p>
                        <span>操作时间：</span>
                        <span>{{detailItem.displayAT}}</span>
                    </p>
                </div>
                <div class="btn" @click='closeDetail'>
                    确定
                </div>
            </div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
import { InfiniteScroll } from 'mint-ui';
import Vue from 'vue';
import cusInput from 'common/cus-input'
import {getUnlockList} from 'api/unlock'
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
                keyWords:'',
                pageNumber:0,
                pageSize:20
            },
            total:0,
            detailStatus:false,
            detailItem:{}
        }

    },

    watch: {},

    methods: {
        handlePreview(row){
            this.detailStatus = true;
            this.detailItem = row;
        },
        // 关闭查看
        closeDetail(){
            this.detailStatus = false;
        },
        loadMore() {
            if(this.listData.length>=this.total) return;
            this.loading = true;
            this.params.pageNumber += 1;
            getUnlockList(this.params).then(res=>{

                if(res.code == 200){
                    this.listData.push(...res.content.data) ;
                }
                this.loading = false;
            }).catch(()=>{
               this.loading = false;
            })
        },
        handleClear(){
            this.params.keyWords = '';
            this.getList();
        },
        handleInputChange(){
           this.getList();
        },
        getList(){
            getUnlockList(this.params).then(res=>{

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
        
        .content{
            background: #fff;
            height:calc(~"100% - 1rem");
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
                width:100%;
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
        .mark{
            position:fixed;
            left:0;
            top:0;
            // opacity:.5;
            width:100%;
            height:100%;
            // background:#000;
            z-index:998;
            // pointer-events: none; //不能操作
            .content-wrap{
                position:fixed;
                left:10%;
                top:20%;
                width:80%;
                background:#fff;
                z-index:999;
                box-sizing: border-box;
                border: 1px solid rgba(68, 138, 255, 1);
                .b-radius(14);
                .mark-content{
                    text-align: left;
                    .pt(15);
                    .pl(20);
                    .pr(20);
                    .pb(15);
                    p{
                        .lh(40);
                        color:#AEAEAE;
                        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
                    }
                    .title{
                        .lh(70);
                        color:#333;
                    }
                }
                .btn{
                    .h(100);
                    .lh(100);
                    color:rgba(68, 138, 255, 1);
                    .border-before-1px(#e6e6e6);
                    text-align: center;
                }
                
            }
        }
    }

</style>
