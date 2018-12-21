<template>
    <section class='feedback' v-html='helpContent'>
       
    </section>
</template>

<script type="text/ecmascript-6">
import { getFeedback } from 'api/feedback';
    export default {
    components: {},

    props: {},

    data() {
        return {
            helpContent:''
        }

    },

    watch: {},

    methods: {},

    mounted() {
        getFeedback().then(response => {
            if(response.code == 200 ){
                this.helpContent = response.content.helpContent;
                
            }
            
        }).catch(error => {
            
           
        })
    },

}
</script>

<style lang='less' scoped>
.feedback{
    text-align: left;
    box-sizing: border-box;
    word-break: break-all;
    text-indent: 2em;
    padding:2vh 10px;
    line-height: 4vh;
    background: #FFF;
}
</style>
