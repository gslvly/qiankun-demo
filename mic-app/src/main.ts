import './public-path'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import { jsLoad } from '@/utils'
import 'vant/lib/index.css'
import '@/assets/iconfont/iconfont.css'
let instance: any = null
function render(props: any = {}) {
	const { container } = props
	instance = createApp(App)
	instance
		.use(router)
		.use(store)
		.use(vant)
	instance.mount(container ? container.querySelector('#app') : '#app')
	return instance
}
if (!window.__POWERED_BY_QIANKUN__) {
	render()
	// 若非在微应用环境中，则使用自己的方法加载
	jsLoad('https://res.wx.qq.com/open/js/jweixin-1.6.0.js')
}

export async function bootstrap() {
	console.log('bootstrap')
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
	render(props)
	instance.provide('bus', props.bus)
	// instance.config.globalProperties.$bus = props.bus
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: any) {
	instance.unmount()
	instance._container.innerHTML = ''
	instance = null
	// 清理此应用所有的定时或者循环任务
	console.log('unmount')
}
