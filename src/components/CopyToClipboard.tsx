"use client";

import { Icon } from "@iconify/react";
import { toast } from "sonner";

const CopyToClipboard = ({ url }: { url: string }) => {
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(url);
			toast("Copied to the clipboard!");
		} catch (err) {
			toast.error("Failed to copy!");
		}
	};

	return (
		<div
			className="flex w-full cursor-pointer items-center gap-2 hover:brightness-150"
			onClick={handleCopy}
		>
			<p className="text-muted/60 pb-1 text-sm">
				{url.length > 25 ? url.slice(0, 25) + "..." : url}
			</p>
			<Icon icon="lucide:copy" />
		</div>
	);
};

export default CopyToClipboard;
