import { Icon } from "@iconify/react";

const LoadingBookmarks = () => {
	return (
		<div className="flex h-dvh w-full flex-col items-center justify-center gap-4">
			<p className="text-2xl font-medium">Loading bookmarks...</p>
			<Icon icon="mdi:loading" className="size-20 animate-spin" />
		</div>
	);
};

export default LoadingBookmarks;
