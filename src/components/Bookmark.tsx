import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { Badge } from "./ui/badge";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTrigger,
} from "@/components/ui/popover";
import CopyToClipboard from "./CopyToClipboard";
import UpdateBookmark from "./UpdateBookmark";
import DeleteBookmark from "./DeleteBookmark";
import TogglePin from "./TogglePin";
import ToggleArchive from "./ToggleArchive";
import VistLink from "./VistLink";
import Image from "next/image";

export type bookmark = {
	_id: string;
	title: string;
	url: string;
	favicon?: string;
	description?: string;
	tags?: string[];
	isFixed: boolean;
	isArchived: boolean;
	viewCount: number;
	lastVisitedDate: Date;
	createdAt: Date;
};

const Bookmark = ({ item }: { item: bookmark }) => {
	const domain = new URL(item.url).hostname;
	const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

	return (
		<Card className="bg-bgSoft text-text w-full min-w-84 justify-between py-4 shadow-lg">
			<CardHeader>
				<div className="flex gap-3">
					{item.favicon ? (
						<Image
							src={favicon}
							width={40}
							height={40}
							alt="Favicon"
							className="border-muted size-10 rounded-md border object-cover"
						/>
					) : (
						<Image
							src="/bookmark.png"
							width={5}
							height={5}
							alt="Markly Favicon"
							className="border-muted aspect-square size-10 rounded-md border p-2"
						/>
					)}
					<div className="flex flex-col gap-1">
						<VistLink item={item} />
						<CopyToClipboard url={item.url} />
					</div>
				</div>
				<CardAction>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								size="icon"
								variant="outline"
								className="text-text bg-transparent"
							>
								<Icon icon="pepicons-pop:dots-y" className="size-6" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="bg-bgSoft w-32 p-1">
							<PopoverHeader>
								<PopoverDescription className="sr-only">
									User menu.
								</PopoverDescription>
							</PopoverHeader>

							<UpdateBookmark item={item}>
								<Button variant="ghost" className="w-full justify-start text-white">
									<Icon icon="lucide:pencil" />
									Edit
								</Button>
							</UpdateBookmark>

							<DeleteBookmark id={item._id} />

							<TogglePin item={item} />

							<ToggleArchive item={item} />
						</PopoverContent>
					</Popover>
				</CardAction>
			</CardHeader>

			<CardContent className="flex h-full flex-col justify-center gap-4 border-y py-4">
				{item.description ? (
					<p>{item.description}</p>
				) : (
					<p className="text-muted/30 text-sm select-none">No description...</p>
				)}

				{item.tags && item.tags.length > 0 ? (
					<div className="flex flex-wrap items-center gap-2">
						{item.tags.map((tag, index) => (
							<Badge key={index} className="bg-primarySoft/60 rounded-xs">
								{tag}
							</Badge>
						))}
					</div>
				) : (
					<p className="text-muted/30 text-sm select-none">No tags...</p>
				)}
			</CardContent>

			<CardFooter className="gap-4 pt-3">
				<div className="flex items-center gap-2 text-sm">
					<Icon icon="lucide:eye" /> {item.viewCount}
				</div>
				<div className="flex items-center gap-2 text-sm">
					<Icon icon="mingcute:time-line" />{" "}
					{new Date(item.lastVisitedDate).toLocaleDateString("en-US", {
						day: "2-digit",
						month: "short",
					})}
				</div>
				<div className="flex items-center gap-2 text-sm">
					<Icon icon="lucide:calendar" />{" "}
					{new Date(item.createdAt).toLocaleDateString("en-US", {
						day: "2-digit",
						month: "short",
					})}
				</div>

				{item.isFixed && <Icon icon="gridicons:pin" className="ml-auto" />}
			</CardFooter>
		</Card>
	);
};

export default Bookmark;
