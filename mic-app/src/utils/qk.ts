//qiankun相关补充

type Fn = (...data: any[]) => any
interface SelfEvent {
	[key: string]: Array<Fn>
}

class EventEmitter {
	events: SelfEvent = {}
	constructor(public id?:string) {}
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
