"use client";

import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const CopyToClipboard = () => {
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText("nextjs.org");
			toast("Copied to the clipboard!");
		} catch (err) {
			toast.error("Failed to copy!");
		}
	};

	return (
		<div
			className="group flex w-fit cursor-pointer items-center gap-2 hover:brightness-150"
			onClick={handleCopy}
		>
			<p className="text-muted/60 pb-1 text-sm">nextjs.org</p>
			<Button size="xs" variant="ghost" className="not-group-hover:hidden">
				<Icon icon="lucide:copy" />
			</Button>
		</div>
	);
};

export default CopyToClipboard;
