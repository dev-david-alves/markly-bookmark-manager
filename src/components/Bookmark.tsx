import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import CopyToClipboard from "./CopyToClipboard";
import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import CreatableTags from "./CreatableTags";

export type bookmark = {
	_id: string;
	title: string;
	url: string;
	description?: string;
	tags?: string[];
	isFixed: boolean;
	isArchived: boolean;
	viewCount: number;
	lastVisitedDate: string;
	createdAt: string;
};

const Bookmark = ({ item }: { item: bookmark }) => {
	return (
		<Card className="bg-bgSoft text-text w-full max-w-100 gap-4 py-4 shadow-lg">
			<CardHeader>
				<Link href={item.url} target="_blank">
					<CardTitle className="hover:brightness-90">
						{item.title} <Icon icon="majesticons:open" className="ml-2 inline size-4" />
					</CardTitle>
				</Link>
				<CopyToClipboard url={item.url} />
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
							<Dialog>
								<form>
									<DialogTrigger asChild>
										<Button
											variant="ghost"
											className="w-full justify-start text-white"
										>
											<Icon icon="lucide:pencil" />
											Edit
										</Button>
									</DialogTrigger>
									<DialogContent className="bg-bgSoft sm:max-w-lg">
										<DialogHeader>
											<DialogTitle>Edit bookmark</DialogTitle>
											<DialogDescription className="text-muted/60 text-sm">
												Edit bookmark informations.
											</DialogDescription>
										</DialogHeader>
										<FieldGroup className="gap-y-4">
											<Field>
												<Label htmlFor="title">Title</Label>
												<Input
													id="title"
													name="title"
													placeholder="Bookmark title..."
												/>
											</Field>
											<Field>
												<Label htmlFor="description">Description</Label>
												<Input
													id="description"
													name="username"
													placeholder="Bookmark description..."
												/>
											</Field>
											<Field>
												<Label htmlFor="url">Url</Label>
												<Input
													id="url"
													name="username"
													placeholder="Bookmark url..."
												/>
											</Field>
											<Field>
												<Label htmlFor="tags">
													Tags (Press enter to add)
												</Label>
												<CreatableTags id="tags" name="tags" />
											</Field>
										</FieldGroup>
										<DialogFooter>
											<DialogClose asChild>
												<Button
													variant="outline"
													className="text-text bg-transparent"
												>
													Cancel
												</Button>
											</DialogClose>
											<Button type="submit">Save changes</Button>
										</DialogFooter>
									</DialogContent>
								</form>
							</Dialog>

							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant="ghost"
										className="w-full justify-start text-white"
									>
										<Icon icon="lucide:trash" />
										Delete
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent className="bg-bgSoft">
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription className="text-muted/60">
											This action cannot be undone. This will permanently
											delete this bookmark.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel className="text-black">
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction>Continue</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>

							<Button variant="ghost" className="w-full justify-start text-white">
								<Icon icon={item.isFixed ? "lucide:pin-off" : "lucide:pin"} />
								{item.isFixed ? "Unpin" : "Pin"}
							</Button>
							<Button variant="ghost" className="w-full justify-start text-white">
								<Icon
									icon={item.isArchived ? "lucide:unarchive" : "lucide:archive"}
								/>
								{item.isArchived ? "Unarchive" : "Archive"}
							</Button>
						</PopoverContent>
					</Popover>
				</CardAction>
			</CardHeader>
			<CardContent className="border-y py-4">
				<p>{item.description}</p>

				{item.tags && (
					<div className="mt-4 flex items-center gap-2">
						{item.tags.map((tag, index) => (
							<Badge key={index} className="bg-primarySoft/60 rounded-xs">
								{tag}
							</Badge>
						))}
					</div>
				)}
			</CardContent>
			<CardFooter className="gap-4">
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

				<Icon icon="gridicons:pin" className="ml-auto" />
			</CardFooter>
		</Card>
	);
};

export default Bookmark;
