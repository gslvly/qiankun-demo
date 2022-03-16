import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import 'vant/lib/index.css'
import './qiankun'

// 此应用为主应用，子应用配置见mic-app
createApp(App)
	.use(store)
	.use(router)
	.use(vant)
	.mount('#app')

	window.a =33333
