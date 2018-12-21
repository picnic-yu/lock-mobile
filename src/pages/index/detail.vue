<template>
  <div class="newslist">
    <ul>
      <li v-for="(item,index) in newslist" :key="index">
        <p class="p" ref="liCon">{{item.content}}</p>
        <div class="open" @click="open(item,index)">
          <div v-if="!item.openFlag">【展开】</div>
          <div v-else>【收缩】</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
 
  export default {
    // props: ['newslist'],
    data() {
      return {
        newslist:[{}],
        liConHeight: 50 // 两行文字的高度
      }
    },
    methods: {
      open(item, i) {
        const liCon = this.$refs.liCon[i]
        var height = liCon.offsetHeight
        if (height === this.liConHeight) { // 展开
          liCon.style.height = 'auto'
          height = liCon.offsetHeight
          liCon.style.height = this.liConHeight + 'px'
          var f = document.body.offsetHeight  // 必加
          liCon.style.height = height + 'px'
        } else { // 收缩
          liCon.style.height = this.liConHeight + 'px'
        }
        if (!item.openFlag) {
          Vue.set(item, 'openFlag', true)
        } else {
          Vue.set(item, 'openFlag', false)
        }
      }
    }
  }
</script>
<style lang='less' scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.newslist ul li p {
  font-size: 14px;
  color: #555;
  line-height: 25px;
  height: 50px;
  overflow: hidden;
  transition: height .3s;
}

</style>
