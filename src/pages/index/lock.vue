<template>
    <section class="user">
        <div class="search">
            <span class='input-wrap'>
                <div class="input-box">
                    <span class="icon"></span>
                    <input type="text" class="search-input" placeholder="">
                    <span class="icon-clear"></span>
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
                <div class="btn" :class="params.status==0 ? 'active' : '' " @click='handleGetList(0)'>未实名</div>
            </div>
            <div class="item ">
                <div class="btn" :class="params.status==2 ? 'active' : '' " @click='handleGetList(2)'>待审核</div>
            </div>
            <div class="item ">
                <div class="btn" :class="params.status==3 ? 'active' : '' " @click='handleGetList(3)'>已实名</div>
            </div>
            <div class="item ">
                <div class="btn" :class="params.status==1 ? 'active' : '' " @click='handleGetList(1)'>未通过</div>
            </div>
        </div>
        <div class="content">
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
                <li class='item title' >
                    <span class='number'>
                        zasd
                    </span>
                     <span>
                        zasd
                    </span>
                     <span>
                        zasd
                    </span>
                     <span>
                        zasd
                    </span>
                </li>
                <li class='item' v-for="item in list" :key='item'>
                    <span class='number'>
                        zasd
                    </span>
                     <span>
                        zasd
                    </span>
                     <span>
                        zasd
                    </span>
                     <span>
                        zasd
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
Vue.use(InfiniteScroll);
export default {
    components: {
        cusInput
    },

    props: {},

    data() {
        return {
            loading:false,
            list:[1,2,3,4,5,6,7,8,9,10,11,12],
            params:{
                status:null
            }
        }

    },

    watch: {},

    methods: {
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                let last = this.list[this.list.length - 1];
                for (let i = 1; i <= 10; i++) {
                this.list.push(last + i);
                }
                this.loading = false;
            }, 2500);
        },
        handleGetList(status){
            this.params.status = status;

        }
    },

    mounted() {
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
                    flex:1
                }
                .number{
                    flex:2;
                    
                }
            }
        }
    }

</style>
