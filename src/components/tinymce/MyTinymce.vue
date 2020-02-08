<!-- Tinymce 5.x  使用 配合 @packy-tang/vue-tinymce-->
<template>
    <div class="my-tinymce">
        <vue-tinymce
                v-model="myValue"
                :setting="setting" />
    </div>
</template>
<script>
    import Vue from 'vue'
    import tinymce from 'tinymce'
    import VueTinymce from "@packy-tang/vue-tinymce"
    //样式
    import 'tinymce/skins/content/default/content.min.css'
    import 'tinymce/skins/ui/oxide/skin.min.css'
    import 'tinymce/skins/ui/oxide/content.min.css'

    //主题
    import 'tinymce/themes/silver'

    //插件
    import 'tinymce/plugins/link' //链接插件
    // import 'tinymce/plugins/image' //图片插件
    // import 'tinymce/plugins/media' //媒体插件
    import 'tinymce/plugins/table' //表格插件
    import 'tinymce/plugins/lists' //列表插件
    import 'tinymce/plugins/quickbars' //快速栏插件
    import 'tinymce/plugins/fullscreen' //全屏插件
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/emoticons'

    Vue.prototype.$tinymce = tinymce
    Vue.use(VueTinymce)
    Vue.config.productionTip = false

    export default {
        name: "MyTinymce",
        props: {
            value: {
                type: String,
                default: ""
            },
            height:{
                type: String,
                default: "300"
            }
        },
        data() {
            return {
                setting: {
                    menubar: false,
                    toolbar: "undo redo | emoticons | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat | emoticons |",
                    toolbar_drawer: "sliding",
                    quickbars_selection_toolbar: "link unlink  | removeformat ",
                    plugins: "link table lists fullscreen wordcount",
                    language: 'zh_CN',
                    language_url: '/tinymce/langs/zh_CN.js',
                    height: this.height+"px"
                },
                myValue: this.value
            };
        },
        mounted() {

        },
        methods: {

        },
        watch: {
            value(newValue) {
                this.myValue = newValue;
            },
            myValue(newValue) {
                this.$emit("input", newValue);
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>