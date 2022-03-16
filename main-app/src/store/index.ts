import { createStore } from 'vuex'
import http from '@/axios'
const store = createStore({
	state: {
		user: null,
	},
	mutations: {
		save(state, { path, data }: { path: string; data: any }): never | void {
			if (!path) {
				throw new Error('need path')
			}
			const keyPath = path.split('.')
			let needSave: any = state
			for (let i = 0; i < keyPath.length - 1; i++) {
				needSave = needSave[keyPath[i]]
				if (!needSave) {
					throw new Error(`error path: ${keyPath[i]}`)
				}
			}
			needSave[keyPath[keyPath.length - 1]] = data
		},
	},
	actions: {
		getUser({ commit }) {
			http.get('user').then(res => {
				commit('save', { path: 'user', data: res.data })
			})
		},
	},
	modules: {},
})


export default store
export function save(path: string, data: any) {
	store.commit('save', { path, data })
}
// 更新user.name: save('user.name', 'xx')