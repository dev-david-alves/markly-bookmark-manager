"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			<Icon icon="material-symbols:error-outline" className="text-6xl" />{" "}
			<h1 className="text-center text-4xl">Something went wrong!</h1>
			<p className="mt-2 text-center text-lg">
				Sorry, something went wrong. Please try again later.
			</p>
			<Button onClick={reset} className="mt-4">
				<Icon icon="material-symbols:refresh" className="mr-2" />
				Try again
			</Button>
		</div>
	);
}
