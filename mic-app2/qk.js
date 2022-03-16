debugger
class EventEmitter {
	events={}
	constructor() {}
	emit(key, ...v) {
		if (this.events[key]) {
			this.events[key].forEach(fn => fn(...v))
		}
	}
	on(key, fn ) {
		if (!this.events[key]) this.events[key] = []
		this.events[key].push(fn)
	}
	off(key, fn) {
		if (!this.events[key]) return
		this.events[key] = this.events[key].filter(it => it !== fn)
	}
};
window.EventEmitter = EventEmitter
;(() => {
	const settimeout = window.setTimeout
	const cleartimeout = window.clearTimeout
	const setinterval = window.setInterval
	const allTimeout = new Set()
	window.setTimeout = (fn, delay) => {
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
	window.setInterval((fn, interval) => {
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
		allTimeout.delete(timeout)
		cleartimeout(timeout)
	}

	window.clearAllTimeout = () => {
		allTimeout.forEach(v => {
			cleartimeout(v)
		})
		allTimeout.clear()
	}
})()

