//qiankun相关补充

type Fn = (...data: any[]) => any
interface SelfEvent {
	[key: string]: Array<Fn>
}

// type Actions = {
// 	setGlobalState: Fn
// 	onGlobalStateChange: Fn
// }
// interface State {
// 	EVENT_KEY: string
// 	data: {
// 		___EMIT_KEY__: string
// 		realData: any[]
// 	}
// 	state?: any
// }
// class Qk {
// 	public events: QKEvent = {}
// 	private EVENT_KEY = 'QIAN_KUN_EVENT_KEY' + Math.floor(Math.random() * 10000)
// 	private actions: Actions | null = null
// 	public state: any
// 	constructor(
// 		{
// 			onGlobalStateChange,
// 			setGlobalState,
// 			initGlobalState,
// 		}: {
// 			onGlobalStateChange?: Fn
// 			setGlobalState?: Fn
// 			initGlobalState?: Fn
// 		},
// 		state?: any
// 	) {
// 		if (initGlobalState) {
// 			this.actions = <Actions>initGlobalState({ EVENT_KEY: this.EVENT_KEY, data: null, state })
// 		} else {
// 			this.actions = <Actions>{
// 				setGlobalState,
// 				onGlobalStateChange,
// 			}
// 		}

// 		if (state) {
// 			this.state = state
// 			this.actions.setGlobalState({ state })
// 		}

// 		this.actions.onGlobalStateChange((allState: State) => {
// 			const { EVENT_KEY, data, state } = allState
// 			if (EVENT_KEY === this.EVENT_KEY) return
// 			this.state = state
// 			if (!data) return
// 			const { ___EMIT_KEY__, realData } = data
// 			this.emitLocal(___EMIT_KEY__, realData)
// 		}, true)
// 	}
// 	emit(key: string, ...realData: any[]) {
// 		// 下一个微循环再emit数据，避免在on中立刻emit出现多次触发

// 		Promise.resolve().then(() => {
// 			this.actions?.setGlobalState({
// 				EVENT_KEY: this.EVENT_KEY,
// 				data: { ___EMIT_KEY__: key, realData },
// 			})
// 		})
// 	}

// 	emitLocal(key: string, realData: any[]) {
// 		if (!this.events[key]) {
// 			return
// 		}
// 		for (const fn of this.events[key]) {
// 			fn(...realData)
// 		}
// 	}
// 	on(key: string, fn: Fn) {
// 		if (!this.events[key]) {
// 			this.events[key] = []
// 		}
// 		this.events[key].push(fn)
// 	}
// }

class EventEmitter {
	events: SelfEvent = {}
	constructor(public id?: string) {}
	emit(key: string, ...v: any[]) {
		
		if (this.events[key]) {
			this.events[key].forEach(fn => fn(...v))
		}
	}
	on(key: string, fn: Fn) {
		
		if (!this.events[key]) this.events[key] = []
		this.events[key].push(fn)
	}
	off(key: string, fn?: Fn) {
		if (!this.events[key]) return
		this.events[key] = this.events[key].filter(it => it !== fn)
	}
}

let clearAllTimeout: () => void
{
	const settimeout = window.setTimeout
	const cleartimeout = window.clearTimeout
	const setinterval = window.setInterval
	const allTimeout: Set<number> = new Set()
	window.setTimeout = (fn: TimerHandler, delay?: number) => {
		const timeout = settimeout(() => {
			if (typeof fn === 'function') {
				fn()
			} else {
				eval(fn)
			}
			allTimeout.delete(timeout)
		}, delay)
		allTimeout.add(timeout)
		return timeout
	}
	window.setInterval((fn: TimerHandler, interval?: number) => {
		const timeout = setinterval(() => {
			if (typeof fn === 'function') {
				fn()
			} else {
				eval(fn)
			}
		}, interval)
		allTimeout.add(timeout)
		return timeout
	})
	window.clearTimeout = window.clearInterval = timeout => {
		allTimeout.delete(timeout as number)
		cleartimeout(timeout)
	}

	clearAllTimeout = () => {
		allTimeout.forEach(v => {
			cleartimeout(v)
		})
		allTimeout.clear()
	}
}

export { clearAllTimeout, EventEmitter }
