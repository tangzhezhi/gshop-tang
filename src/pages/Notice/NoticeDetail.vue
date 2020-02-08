<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">
            <h1 class="mui-title">通知详情</h1>
            <router-link to="/notice">
            <button class=" mui-btn mui-btn-blue mui-btn-link mui-btn-nav mui-pull-left" >
                <span class="mui-icon mui-icon-left-nav"></span>返回</button>
            </router-link>
        </header>

        <div class="mui-content">
            <h3>{{title}}</h3>
            <p v-html=content></p>
        </div>
    </div>
</template>

<script>

    // const mui = window.mui;

    export default {
        props: ['id'],
        name: "NoticeDetail",
        created() {
            // 方法一:this.get_detail(this.$route.params.id) 直接路由传参
             // 方法二：props传参
            this.get_detail(this.$props.id)
        },
        data(){
            return {
                title:'',
                content:''
            }
        },
        mounted(){

        },
        methods:{
            async get_detail(id){
               let token =  this.$store.state.user.token;
               let result  = await this.$API.notice.getNoticeDetail({token,id});

                if(result!=null && result.code == 0){
                    let item = result.data;
                    this.title = item.title;
                    this.content = item.content;
                }

            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .mui-content
        padding-top :1px;

</style>