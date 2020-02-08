<template>

    <div class="login-form">

        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">登录</h1>
        </header>

        <div class="mui-content">
            <div class="login-logo">
                <b><img src="../../static/img/logo.png" alt="易上学"></b>
            </div>
            <form id='login-form' class="mui-input-group">
                <div class="mui-input-row">
                    <label>账号</label>
                    <input id='tel' type="tel" maxlength="11"  class="mui-input-clear mui-input" placeholder="请输入账号"  name="phone" v-model="phone"  v-validate="'required|mobile'">
                </div>
                <p style="color: red;text-align: center" v-show="errors.has('phone')">{{ errors.first('phone') }}</p>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input type="password" class="mui-input-password" minlength="6"  placeholder="请输入密码" name="pwd" v-model="pwd">
                </div>
                <p style="color: red;text-align: center" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</p>

            </form>
            <div class="mui-content-padded">
                <button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click.prevent="login">登录</button>
                <div class="link-area"><a id='reg'>注册账号</a> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a></div>
            </div>
        </div>
    </div>


</template>

<script>
    const mui = window.mui;

    export default {
        name: "Login",
        data () {
            return {
                phone: '', // 手机号
                pwd: '', // 密码
            }
        },
        methods:{
            /* 登陆 */
            async login () {
                // 进行前台表单验证
                let names
                names = ['phone', 'pwd']

                const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证
                if (success) {
                    const {phone, pwd} = this
                    // 验证通过后发登陆的请求
                    let result

                    result = await this.$API.user.loginPwd({phone, pwd})

                    // 根据请求的结果进行处理
                    if (result.code===0) { // 登陆请求成功
                        const user = result.data
                        // 保存user到state
                        this.$store.dispatch('saveUser', user)
                        // 跳转到首页
                        this.$router.replace('/msite')
                    } else { // 登陆请求失败
                        mui.alert("error");
                    }
                }
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../assets/mui/css/mui.min.css"
    span
        margin-top: 20px;

    .mui-content
        margin-top: 60px;

    .login-logo
        font-size:35px;
        text-align:center;
        margin-top:10px;
        margin-bottom:35px;
        font-weight:300

    .mui-input-group {
        margin-top: 20px;
        first-child{
            margin-top: 20px;
        }
        label{
            width: 22%;
        }
    }

    .mui-content-padded {
        margin-top: 25px;
    }

    .link-area {
        display: block;
        margin-top: 25px;
        text-align: center;
    }

    .mui-btn {
        padding: 8px;
    }

    .mui-content-padded {
        margin-top: 25px;
        .spliter {
            color: #bbb;
            padding: 0px 8px;
        }
    }


</style>