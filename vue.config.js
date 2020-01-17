const path = require('path')
const webpack = require('webpack');
/* 根据指定目录名得到根目录的绝对路径 */
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8888,
        open: true,
        compress: true,
        proxy: {
            '/backService': { // 匹配所有以 '/api'开头的请求路径
                target: 'http://localhost:18888', // 代理目标的基础路径
                changeOrigin: true, // 支持跨域
                pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
                    '^/backService': ''
                }
            },
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@',resolve('src'))
            .set('mui', ('src/assets/mui/js/mui.min.js'))
    },
    /* 编写webpack支持的配置 */
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                'components': resolve('src/components'),
                'pages': resolve('src/pages'),
                'mui':resolve('src/assets/mui/js/mui.min.js')
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                mui: "mui",
                "window.mui": "mui"
            })
        ]
    },



    pluginOptions: {
        // 配置i18n插件
        i18n: {
            locale: 'zh_CN',
            fallbackLocale: 'zh_CN',
            localeDir: 'locales',
            enableInSFC: false
        }
    }
}
