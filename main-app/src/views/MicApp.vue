<template>
	<div id="contenter"></div>
</template>

<script setup >
import { start } from 'qiankun'
import { onMounted } from 'vue'
onMounted(() => {
	if (!window.startQiankun) {
		window.startQiankun = true
    start()
	}
})
</script>

<style></style>
