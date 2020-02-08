<template>
    <div class="mui-content">
        <header  id="msite_header" class="mui-bar-tab mui-bar-nav">
            <h1 class="mui-title">易上学</h1>
        </header>

        <div id="mui-content">
            <div id="slider" ref="slider" class="mui-slider" >
                <div class="mui-slider-group mui-slider-loop">
                    <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
                    <div class="mui-slider-item  mui-slider-item-duplicate">
                        <a href="#">
                            <img src="../../static/img/shuijiao.jpg" style="height: 180px;">
                        </a>
                    </div>
                    <div class="mui-slider-item">
                        <a href="#">
                            <img src="../../static/img/yuantiao.jpg" style="height: 180px;">
                        </a>
                    </div>
                    <div class="mui-slider-item  mui-slider-item-duplicate">
                        <a href="#">
                            <img src="../../static/img/shuijiao.jpg" style="height: 180px;">
                        </a>
                    </div>
                    <!-- 第一张 -->
                    <div class="mui-slider-item">
                        <a href="#">
                            <img src="../../static/img/yuantiao.jpg" style="height: 180px;">
                        </a>
                    </div>
                </div>
                <div class="mui-slider-indicator">
                    <div class="mui-indicator mui-active"></div>
                    <div class="mui-indicator"></div>
                </div>
            </div>

            <div class="mui-scroll">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-if="user">
                        <a> <span><svg-icon icon-class="touxiang" class="icon"></svg-icon></span>姓名<span class="mui-pull-right">{{userName}}</span></a>
                    </li>
                </ul>


                <div v-if="menus.length > 0">
                    <ul class="mui-table-view mui-grid-view mui-grid-9">
                        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 "   v-for="(menu,index) in menus"  v-bind:key="index">
                            <router-link :to="menu.url">
                                <div>
                                    <span class="icon"><svg-icon :icon-class="menu.iconUrl" class="menu"></svg-icon></span>
                                    <div class="mui-media-body">{{menu.name}}</div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div id="msite_footer">
            <nav class="mui-bar mui-bar-tab">
                <div class="mui-tab-item mui-active" @tap="nav_to('/msite')">
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </div>
                <div class="mui-tab-item" @tap="nav_to('/message')">
                    <span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
                    <span class="mui-tab-label">消息</span>
                </div>
                <div class="mui-tab-item" @tap="nav_to('/contact')">
                    <span class="mui-icon mui-icon-contact"></span>
                    <span class="mui-tab-label">通讯录</span>
                </div>
                <div class="mui-tab-item" @tap="nav_to('/profile')">
                    <span class="mui-icon mui-icon-gear"></span>
                    <span class="mui-tab-label">我的</span>
                </div>
            </nav>
        </div>

    </div>
</template>

<script>

    const mui = window.mui;

    export default {
        name: "MSite",
        created() {

        },
        data(){
            return {
                user:{},
                menus:[], // 菜单
            }
        },
        mounted(){
            this.get_menu()
            let slider = mui(this.$refs.slider);
            slider.slider({interval:2000});
            this.user = this.get_user();
        },
        computed :{
            userName(){
                return   this.$store.state.user.user.name;
            }
        },
        methods:{

            async get_user(){
                let user =  this.$store.state.user.user;
                if(user.name == undefined ){
                    let result  =   await this.$API.user.getUserInfo({"token":this.$store.state.user.token});

                    if(result!=null && result.code == 0){
                        this.user  = result.data;
                        this.$store.dispatch('getUserInfo', this.user)
                    }
                }
            },

           async get_menu(){
               let token =  this.$store.state.user.token;

               if(this.$store.state.msite.menus.length == 0){
                   let result  =  await this.$API.msite.getMenu({token});

                   if(result!=null && result.code == 0){
                       this.menus = result.data;
                       this.$store.dispatch('saveMenus', this.menus)
                   }
               }
               else{
                   this.menus = this.$store.state.msite.menus
               }
            },

            nav_to(url){
                this.$router.push(url);
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>


    body
        background-color:#fff
    .mui-content
        .mui-action-back
            margin-top:10px;
            font-size :18px;
        .mui-bar-tab
            padding-top :1px;

    .icon
        margin-left  5px;
        margin-right 5px;
        font-size 24px;
        .menu
            margin-left  1px;
            margin-right 1px;
            font-size 36px;



</style>