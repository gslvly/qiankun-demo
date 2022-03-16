;(function (global) {
	global['purehtml'] = {
		bootstrap: () => {
			console.log('purehtml bootstrap')
			return Promise.resolve()
		},
		mount: props => {
			// state: 变更后的状态; prev 变更前的状态
			props.bus.on('test', v => {
				console.log('getData:', v)
			})
		},
		unmount: () => {
			console.log('purehtml unmount')
			return Promise.resolve()
		},
	}
})(window)
