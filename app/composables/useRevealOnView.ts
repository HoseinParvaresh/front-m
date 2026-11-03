export function useRevealOnView(threshold = 0.3) {
	const target = ref<HTMLElement>()
	const isVisible = ref(false)

	onMounted(() => {
		if (!import.meta.client || !target.value) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					isVisible.value = true
					observer.disconnect() 
				}
			},
			{ threshold },
		)

		observer.observe(target.value)

		onUnmounted(() => observer.disconnect())
	})

	return { target, isVisible }
}