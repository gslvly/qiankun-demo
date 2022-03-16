<template>
	<div class="about">
		<h1>主app-about页面</h1>
		<van-button @click="add">加载mic-app2</van-button>
		<van-button @click="del">卸载mic-app2</van-button>
		<div class="mic-app2" ref="micApp2"></div>
	</div>
</template>
<script setup>
import { loadMicroApp } from 'qiankun'
import { onMounted, ref } from 'vue'
import { EventEmitter } from '@/utils'
const bus = new EventEmitter()

const micApp2 = ref()
let micApp = null
const add = () => {
	micApp = loadMicroApp(
		{
			entry: '//localhost:8082/a.html',
			container: micApp2.value,
			name: 'mic-app2',
			props: {
				bus,
			},
		},
		{
			sandbox: {
				strictStyleIsolation: true,
				// experimentalStyleIsolation: true
			},
		}
	)
}
const del = () => {
	micApp.unmount()
}
onMounted(() => {
	console.log(micApp2.value)
})
</script>
