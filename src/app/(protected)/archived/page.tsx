import React from "react";
import Navbar from "@/components/Navbar";
import Bookmark from "@/components/Bookmark";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Archived bookmarks",
};

const Archived = () => {
	return (
		<div className="flex h-dvh w-full flex-col overflow-y-auto pb-10">
			<Navbar canAddBookmark={false} />

			<main className="mt-8 flex flex-col gap-8 px-8">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-medium">All archived bookmarks</h1>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" className="text-black">
								<Icon icon="mi:sort" />
								Sort by
							</Button>
						</PopoverTrigger>
						<PopoverContent className="bg-bgSoft w-44 p-1">
							<PopoverHeader>
								<PopoverDescription className="sr-only">
									Sort menu.
								</PopoverDescription>
							</PopoverHeader>
							<Button variant="ghost" className="w-full justify-start text-white">
								<Icon icon="material-symbols:more-time" className="size-4" />
								Recently added
							</Button>
							<Button variant="ghost" className="w-full justify-start text-white">
								<Icon icon="carbon:recently-viewed" className="size-4" />
								Recently visited
							</Button>
							<Button variant="ghost" className="w-full justify-start text-white">
								<Icon icon="carbon:person" className="-ml-1 size-6" />
								Most visited
							</Button>
						</PopoverContent>
					</Popover>
				</div>

				<div className="grid grid-cols-3 gap-8">
					{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
						<Bookmark key={item} />
					))}
					<Bookmark />
				</div>
			</main>
		</div>
	);
};

export default Archived;
