import { registerMicroApps } from 'qiankun'
import { EventEmitter, jsLoad } from '@/utils'
const bus = new EventEmitter('main')

registerMicroApps([
	{
		name: 'micApp',
		entry: '//localhost:8081',
		container: '#contenter',
		activeRule: '/mic-app',
		props: {
			bus,
			jsLoad,
		},
	},
])


bus.on('from-mic', v => {
	console.log('from-mic', v)
})
// qiankun 微应用将微应用所有请求改为fetch，所以jsonp会失效
// 主应用分发jsonp工具（jsLoad,动态加载js）,微应用使用主应用分发的工具
