export const useScrollLock = () => {
	const lock = () => {
		if (!import.meta.client) return;
		document.body.style.overflow = "hidden";
	};

	const unlock = () => {
		if (!import.meta.client) return;
		document.body.style.overflow = "";
	};
	onUnmounted(unlock);
	return { lock, unlock };
};
