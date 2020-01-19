<template>
    <div class="mui-content">
        <div  id="msite_header" class="mui-bar-tab mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left">首页</a>
            <h1 class="mui-title">易上学</h1>
        </div>

        <div id="msite_body">
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

            <div v-if="menus.length > 0">
                <ul class="mui-table-view mui-grid-view mui-grid-9"  v-for="(menu) in menus">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a :href="menu.url">
                            <span class="mui-icon mui-icon-home"></span>
                            <div class="mui-media-body">{{menu.name}}</div>
                        </a>
                    </li>
                </ul>
            </div>

            <!--<ul class="mui-table-view mui-grid-view mui-grid-9" >-->


                <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">-->
                    <!--<a href="#">-->
                        <!--<span class="mui-icon mui-icon-home"></span>-->
                        <!--<div class="mui-media-body">一卡通充值</div>-->
                    <!--</a>-->
                <!--</li>-->

                <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">-->
                    <!--<a href="#">-->
                    <!--<span class="mui-icon mui-icon-home"></span>-->
                    <!--<div class="mui-media-body">一卡通充值</div>-->
                    <!--</a>-->
                <!--</li>-->
                <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
                    <!--<span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>-->
                    <!--<div class="mui-media-body">我的钱包</div></a></li>-->
                <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
                    <!--<span class="mui-icon mui-icon-chatbubble"></span>-->
                    <!--<div class="mui-media-body">通知</div></a></li>-->
                <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
                    <!--<span class="mui-icon mui-icon-location"></span>-->
                    <!--<div class="mui-media-body">平安校园</div></a></li>-->
                <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
                    <!--<span class="mui-icon mui-icon-search"></span>-->
                    <!--<div class="mui-media-body">请假管理</div></a></li>-->
                <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
                    <!--<span class="mui-icon mui-icon-phone"></span>-->
                    <!--<div class="mui-media-body">家庭作业</div></a></li>-->
                <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
                    <!--<span class="mui-icon mui-icon-gear"></span>-->
                    <!--<div class="mui-media-body">成绩</div></a></li>-->
                <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
                    <!--<span class="mui-icon mui-icon-info"></span>-->
                    <!--<div class="mui-media-body">班级圈</div></a></li>-->
                <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
                    <!--<span class="mui-icon mui-icon-more"></span>-->
                    <!--<div class="mui-media-body">more</div></a></li>-->
            <!--</ul>-->

        </div>

        <div id="msite_footer">
            <nav class="mui-bar mui-bar-tab">
                <div class="mui-tab-item mui-active" @click.prevent="nav_to('/msite')">
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </div>
                <div class="mui-tab-item" @click.prevent="nav_to('/message')">
                    <span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
                    <span class="mui-tab-label">消息</span>
                </div>
                <div class="mui-tab-item" @click.prevent="nav_to('/contact')">
                    <span class="mui-icon mui-icon-contact"></span>
                    <span class="mui-tab-label">通讯录</span>
                </div>
                <div class="mui-tab-item" @click.prevent="nav_to('/profile')">
                    <span class="mui-icon mui-icon-gear"></span>
                    <span class="mui-tab-label">我的</span>
                </div>
            </nav>
        </div>

    </div>
</template>

<script>

    import router from "../../router";

    const mui = window.mui;

    export default {
        name: "MSite",
        created() {
             this.get_menu()
        },
        data(){
            return {
                menus:[], // 菜单
            }
        },
        mounted(){
            let slider = mui(this.$refs.slider);
            slider.slider({interval:2000});
        },
        methods:{

            async get_menu(){
               let token =  this.$store.state.user.token;
               let result  = await this.$API.msite.getMenu({token});

                if(result!=null && result.code == 0){
                    this.menus = result.data;
                }

            },

            nav_to(url){
                router.push(url);
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .mui-content
        .mui-action-back
            margin-top:10px;
            font-size :18px;
        .mui-bar-tab
            padding-top :1px;

</style>