<template>
    <div id="list" class="mui-scroll-wrapper">
        <div class="mui-scroll">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media"   v-for="(notice,index) in data"  v-bind:key="index">
                    <div class="mui-slider-right mui-disabled">
                        <div class="mui-btn mui-btn-red" @tap="del(notice.msgId,$event)">删除</div>
                    </div>
                    <div @tap= "query_detail(notice)" class="mui-slider-handle">
                        <img class="mui-media-object mui-pull-left" src="../../static/img/shuijiao.jpg">
                        <div class="mui-media-body">
                            {{notice.title}}
                            <p class='mui-ellipsis'>{{notice.summary}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    const mui = window.mui;

    export default {
        name: "Notice",
        created(){
            this.pullRe();
        },
        data(){
            return {
                data: [],
                btnArray:['确认','取消']
            }
        },
        mounted(){
            mui.init({
                pullRefresh: {
                    container: '#list',
                    down: {
                        style: 'circle',
                        offset: '0px',
                        auto: true,
                        callback: this.pulldownRefresh
                    },
                    up: {
                        contentrefresh: '正在加载...',
                        callback: this.pullupRefresh
                    }
                }
            });
        },
        methods:{
            //重新调用mui下拉刷新
            pullRe() {
                for (let i = mui.hooks.inits.length - 1, item; i >= 0; i--) {
                    item = mui.hooks.inits[i];
                    if (item.name == "pullrefresh") {
                        item.repeat = true;
                    }

                }
            },

            pulldownRefresh(){
                const that = this;
                this.getData().then((res)=>{
                    mui('#list').pullRefresh().endPulldownToRefresh();
                    that.data = res;
                })
            },

            pullupRefresh(){
                const that = this;
                this.getData().then((res)=>{
                    mui('#list').pullRefresh().endPullupToRefresh();
                    that.data = [...that.data,...res];
                })
            },

             async getData() {
                 let token =  this.$store.state.user.token;
                 let result = await this.$API.notice.getNotice({token});
                 if(result!=null && result.code == 0){
                    return result.data;
                 }
            },

            query_detail(data){
                this.$router.push({
                    name:'NoticeDetail',
                    params:{
                        id:data.msgId
                    }
                })
            },

            async del(msgId,elem){
                let token =  this.$store.state.user.token;
                let result = await this.$API.notice.delNotice({token,msgId});
                if(result!=null && result.code == 0){
                    var li = elem.target.parentNode.parentNode;
                    mui.confirm('确认删除该条记录？', '删除', this.btnArray, function(e) {
                        if (e.index == 0) {
                            li.parentNode.removeChild(li);
                        } else {
                            setTimeout(function() {
                                mui.swipeoutClose(li);
                            }, 0);
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../assets/mui/css/mui.min.css"
    .mui-scroll-wrapper
        margin-top 50px;
</style>