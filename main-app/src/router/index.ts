import http from '@/axios'
import store from '@/store'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/mic-app/:micAppPath?',
		name: 'micapp',
		component: () => import('@/views/MicApp.vue'),
	},
]
const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

window.router = router

router.beforeEach((from, to, next) => {
	// console.log(from.path,to.path,next)
	// if(!to.name !== 'login') { // router中的路由页面

	// }
	if (!store.state.user) {
    console.log('no-userinfo')
	}
	next(true)
})

export default router
