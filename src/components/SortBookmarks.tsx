"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const SortBookmarks = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const params = new URLSearchParams(searchParams);
	const { replace } = useRouter();

	const handleSort = (sort: string) => {
		params.set("sort", sort);
		replace(`${pathname}?${params.toString()}`);
	};

	useEffect(() => {
		if (!searchParams.get("sort")) {
			handleSort("recent");
		}
	}, []);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="text-black">
					<Icon icon="mi:sort" />
					Sort by
				</Button>
			</PopoverTrigger>
			<PopoverContent className="bg-bgSoft w-44 p-1">
				<PopoverHeader>
					<PopoverDescription className="sr-only">Sort menu.</PopoverDescription>
				</PopoverHeader>
				<Button
					variant="ghost"
					className="w-full justify-start text-white"
					onClick={() => handleSort("recent")}
				>
					<Icon icon="material-symbols:more-time" className="size-4" />
					Recently added
				</Button>
				<Button
					variant="ghost"
					className="w-full justify-start text-white"
					onClick={() => handleSort("visited")}
				>
					<Icon icon="carbon:recently-viewed" className="size-4" />
					Recently visited
				</Button>
				<Button
					variant="ghost"
					className="w-full justify-start text-white"
					onClick={() => handleSort("most")}
				>
					<Icon icon="carbon:person" className="-ml-1 size-6" />
					Most visited
				</Button>
			</PopoverContent>
		</Popover>
	);
};

export default SortBookmarks;
