import Login from '../pages/Login/Login.vue'
import MSite from '../pages/MSite/MSite.vue'
import Contact from '../pages/Contact/Contact.vue'
import Notice from '../pages/Notice/Notice.vue'
import NoticeList from '../pages/Notice/NoticeList.vue'
import NoticeDetail from '../pages/Notice/NoticeDetail.vue'
import NoticeEdit from '../pages/Notice/NoticeEdit.vue'

export default [
    {
      path:"/msite",
      component:MSite
    },
    {
        path:"/contact",
        component:Contact
    },
    {
        path:"/notice",
        component:Notice,
        children:[
            {
                path:"/",
                name:"NoticeList",
                component:NoticeList,
            },
            {
                path:"notice_detail/:id",
                name:"NoticeDetail",
                component:NoticeDetail,
                props: true
            },
            {
                path:"edit",
                name:"NoticeEdit",
                component:NoticeEdit,
                props: true
            },
        ]
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