/*
包含n个接口请求函数的模块
每个函数的返回值都是promise对象
*/
import user from './user'
import msite from './msite'
import notice from './notice'
import contact from './contact'



export default {
    user,
    msite,
    notice,
    contact
}