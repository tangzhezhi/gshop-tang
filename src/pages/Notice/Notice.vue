<template>
    <div >
        <!-- 这里不能用mui-action-back class 要不然会触发 mui.js 点击事件 -->
        <header id="header" class="mui-bar mui-bar-nav">
                <h1 class="mui-title">通知列表</h1>
                <button class="mui-btn mui-btn-blue mui-btn-link mui-btn-nav mui-pull-left" @click="go_msite">
                    <span class="mui-icon mui-icon-left-nav"></span>首页</button>
                <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click="edit">编辑</button>
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
    // const mui = window.mui;

    export default {
        name: "Notice",
        created() {
        },
        data(){
            return {
                list:[], // 菜单
            }
        },
        mounted(){
        },
        methods:{

            go_msite(){
                this.$router.push("/msite");
            },

            edit(){
                this.$router.push("/notice/edit");
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../assets/mui/css/mui.min.css"
    .mui-bar-nav
        & ~ .mui-content
            padding-top:35px;
</style>