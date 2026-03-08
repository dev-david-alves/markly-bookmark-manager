import React from "react";
import Navbar from "@/components/Navbar";
import Bookmark, { type bookmark } from "@/components/Bookmark";
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
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { fetchBookmaks } from "@/lib/data";

export const metadata: Metadata = {
	title: "Archived bookmarks",
};

const Archived = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) redirect("/");

	const bookmarks: bookmark[] = (await fetchBookmaks()) as bookmark[];

	if (!bookmarks) return <div>Loading...</div>;

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
					{bookmarks.map((item) => (
						<Bookmark key={item.id} item={item} />
					))}
				</div>
			</main>
		</div>
	);
};

export default Archived;
