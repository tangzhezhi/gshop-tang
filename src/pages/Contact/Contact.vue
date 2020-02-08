<template>
    <div class="contact">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav mui-pull-left" @click="go_msite"></a>
            <h1 class="mui-title">通讯录</h1>
            <a id='done' class="mui-btn mui-btn-link mui-pull-right mui-btn-blue mui-disabled">完成</a>
        </header>

        <div class="mui-content">
            <div id='contacts' class="mui-indexed-list">
                <div class="mui-indexed-list-search mui-input-row mui-search">
                    <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
                </div>

                <div class="mui-indexed-list-bar" >
                    <a>A</a>
                    <a>B</a>
                    <a>C</a>
                    <a>D</a>
                    <a>E</a>
                    <a>F</a>
                    <a>G</a>
                    <a>H</a>
                    <a>I</a>
                    <a>J</a>
                    <a>K</a>
                    <a>L</a>
                    <a>M</a>
                    <a>N</a>
                    <a>O</a>
                    <a>P</a>
                    <a>Q</a>
                    <a>R</a>
                    <a>S</a>
                    <a>T</a>
                    <a>U</a>
                    <a>V</a>
                    <a>W</a>
                    <a>X</a>
                    <a>Y</a>
                    <a>Z</a>
                    <!--<div v-for="(value, key) in data"  v-bind:key="key">-->
                        <!--<a>{{key}}</a>-->
                    <!--</div>-->
                </div>
                <div class="mui-indexed-list-alert"></div>
                <div class="mui-indexed-list-inner">
                    <div class="mui-indexed-list-empty-alert">没有数据</div>
                    <ul id="contact_ul" class="mui-table-view">
                        <!--<section v-for="(contacts, key) in data" v-bind:key="key">-->
                            <!--<li class="mui-table-view-divider mui-indexed-list-group">{{key}}</li>-->
                            <!--<li :data-value="item.pinyin"  :data-tags="item.pinyin" v-for="(item) in contacts"  v-bind:key="item.pinyin"-->
                                <!--class="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">-->
                                    <!--<input type="checkbox" />{{item.name}}-->
                            <!--</li>-->
                        <!--</section>-->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const mui = window.mui;


    export default {

        name: "Contact",

        data(){
            return {
                contact:null,
                index_show:null,
                data:null,
            }
        },

        created(){

            console.log("getcontact:"+document.documentElement.clientHeight+":"+document.body.clientHeight);
            let that = this;
            this.getContact().then(()=>{
                console.log("mounted"+that.data);



                mui.init();
                mui.ready(function() {
                    var header = document.querySelector('header.mui-bar');
                    var list = document.getElementById('contacts');
                    var done = document.getElementById('done');
                    //calc hieght
                    list.style.height = (document.documentElement.clientHeight - header.offsetHeight)-5 + 'px';
                    //create
                    let ul_elements=document.getElementById("contact_ul");

                    for(var key in  that.data){
                        let group_li = "<li class='mui-table-view-divider mui-indexed-list-group'>"+key+"</li>";
                        let group_li_node=that.parseDom("li",group_li)
                        ul_elements.appendChild(group_li_node[0]);
                        let contact_li = "";
                        let contactArr = that.data[key];
                        for(let contact of contactArr){
                             contact_li = "<li data-value='"+contact.pinyin+"'  data-tags='"+contact.pinyin+"' " +
                                " class='mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left'><input type='checkbox'/>"+contact.name+"</li>";
                            let contact_li_node=that.parseDom("li",contact_li)
                            ul_elements.appendChild(contact_li_node[0]);
                        }
                    }

                    window.indexedList = new mui.IndexedList(list);

                    //done event
                    done.addEventListener('tap', function() {
                        var checkboxArray = [].slice.call(list.querySelectorAll('input[type="checkbox"]'));
                        var checkedValues = [];
                        checkboxArray.forEach(function(box) {
                            if (box.checked) {
                                checkedValues.push(box.parentNode.innerText);
                            }
                        });
                        if (checkedValues.length > 0) {
                            mui.alert('你选择了: ' + checkedValues);
                        } else {
                            mui.alert('你没选择任何人员');
                        }
                    }, false);
                    mui('.mui-indexed-list-inner').on('change', 'input', function() {
                        var count = list.querySelectorAll('input[type="checkbox"]:checked').length;
                        var value = count ? "完成(" + count + ")" : "完成";
                        done.innerHTML = value;
                        if (count) {
                            if (done.classList.contains("mui-disabled")) {
                                done.classList.remove("mui-disabled");
                            }
                        } else {
                            if (!done.classList.contains("mui-disabled")) {
                                done.classList.add("mui-disabled");
                            }
                        }
                    });
                });
            })

        },

        mounted(){

        },
        beforeDestroy(){
            window.indexedList.el.inner.classList.remove('empty');
            window.indexedList.el.styleForSearch.innerText = "";
        },
        methods:{
             parseDom(tag,arg) {
                var objE = document.createElement(tag);
                objE.innerHTML = arg;
                return objE.childNodes;
            },

            go_msite(){
                this.$router.push("/msite");
            },

            async getContact(){
                let token =  this.$store.state.user.token;
                let result = await this.$API.contact.get({token});
                if(result!=null && result.code == 0){
                    this.data = result.data;
                }

            }

        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../assets/mui/css/mui.min.css"
    @import "../../assets/mui/css/mui.indexedlist.css"
    .mui-bar {
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    #done.mui-disabled{
        color: gray;
    }

</style>