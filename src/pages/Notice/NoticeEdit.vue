<template>
    <div class="mui-content">
        <header id="header" class="mui-bar mui-bar-nav">
            <h1 class="mui-title">通知内容</h1>
            <router-link to="/notice">
            <button class=" mui-btn mui-btn-blue mui-btn-link mui-btn-nav mui-pull-left" >
                <span class="mui-icon mui-icon-left-nav"></span>返回</button>
            </router-link>
            <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click="save">保存</button>
        </header>
        <!-- 子传父用@接收,父方法用一个方法接收 -->
        <MyTinymce :value="content"  @input="getContent"></MyTinymce>
    </div>
</template>

<script>

    import MyTinymce from '../../components/tinymce/MyTinymce'

    export default {
        name: "NoticeEdit",
        components: {MyTinymce},
        data(){
            return {
                content: '',
                height:document.documentElement.clientHeight-50
            }
        },
        mounted(){

        },
        beforeDestroy() {

        },
        methods:{
            getContent(content){
              this.content = content;
            },

            async save(){
               let token =  this.$store.state.user.token;
               let param = {
                   "token":token,
                   "content":this.content,
               }
               let result  = await this.$API.notice.addNotice(param);

                if(result!=null && result.code == 0){
                    let item = result.data;
                    console.log(item);
                }

            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .mui-content
        margin-top :5px;
</style>