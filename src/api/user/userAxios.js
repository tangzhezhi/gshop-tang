import axios from "axios"

const userAxios = axios.create({
    timeout:5000,
    baseURL: '/backService' // 所有请求都有一个基础路径
})

const mui = window.mui;


userAxios.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    mui.toast("error",error)
    return Promise.reject(error)
})

export default userAxios