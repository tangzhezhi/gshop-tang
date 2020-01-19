import Login from '../pages/Login/Login.vue'
import MSite from '../pages/MSite/MSite.vue'

export default [
    {
      path:"/msite",
      component:MSite
    },
    {
        path:"/login",
        component: Login,
        meta: {
            title: '易上学'
        },
    },

    {
        path:"/",
        redirect:'/msite'
    }
]