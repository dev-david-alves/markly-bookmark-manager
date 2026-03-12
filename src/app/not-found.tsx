import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

const NotFound = () => {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			<Icon icon="wordpress:not-found" className="text-6xl" />{" "}
			<h1 className="text-center text-4xl">Page not found!</h1>
			<p className="mt-2 text-center text-lg">
				Sorry, the page you are looking for doesn't exist or has been moved.
			</p>
			<Button asChild className="mt-4">
				<Link href="/">
					<Icon icon="lucide:home" />
					Back to home
				</Link>
			</Button>
		</div>
	);
};

export default NotFound;
