function createAssetResolver(modules: Record<string, string>, label: string): (filename: string) => string {
	const byName: Record<string, string> = Object.fromEntries(Object.entries(modules).map(([path, url]) => [path.split("/").pop()!, url]));

	return (filename: string): string => {
		const url = byName[filename];

		if (!url && import.meta.dev) {
			console.warn(`[resolve${label}] فایل پیدا نشد: "${filename}"`);
		}

		return url ?? "";
	};
}
const imageModules = import.meta.glob<string>("~/assets/images/**/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" });

export const resolveImage = createAssetResolver(imageModules, "Image");

const iconModules = import.meta.glob<string>("~/assets/icons/**/*.svg", { eager: true, import: "default" });

export const resolveIcon = createAssetResolver(iconModules, "Icon");
