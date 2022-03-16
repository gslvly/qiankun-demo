<template>
	<div class="about">
		<h1>This is an about page</h1>
		<van-button @click="send">send to main app: {{count}}</van-button>
	</div>
</template>

<script>
import { defineComponent,ref ,inject} from 'vue'

export default defineComponent({

	setup(props, ctx) {
		const count = ref(0)
    console.log(ctx)
    const bus = inject('bus')
		const send = () => {
      bus.emit('from-mic', count.value)
      count.value ++
    }
		return {
			count,
			send,
		}
	},
})
</script>
