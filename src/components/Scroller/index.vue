<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        // 组件名
        name: 'Scroller',
        // 父组件自定义的事件
        props:{
            handleToScroll : {
                type: Function,
                default : function(){}
            },
            handleToTouchEnd : {
                type: Function,
                default: function(){}
            }
        },
        mounted () {
            // 定义一个scroll变量，将BScroll对象赋值，ref是为操作dom元素的属性，通过$refs调用wrapper这个div
            var scroll = new BScroll(this.$refs.wrapper,{
                tap : true,
                probeType: 1
            });

            this.scroll = scroll;
            // 监听自定义的事件
            scroll.on('scroll',(pos) => {
                this.handleToScroll(pos)
            });

            scroll.on('touchEnd', (pos) => {
                this.handleToTouchEnd(pos)
            })
        },
        methods: {
            // 滚动到指定的位置
            toScrollTop(y){
                this.scroll.scrollTo(0,y);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .wrapper{
        height: 100%;
    }
</style>