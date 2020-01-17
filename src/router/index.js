import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode:'history',
    routes
})

const paths = ['/msite']

router.beforeEach((to,from,next) =>{

    const path = to.path

    if(paths.indexOf(path)!==-1){
        next('/login')
    }
    else{
        next()
    }
})

export default router