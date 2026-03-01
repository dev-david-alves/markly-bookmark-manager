import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { Button } from "./ui/button";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTrigger,
} from "@/components/ui/popover";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreatableTags from "./CreatableTags";
import SearchInput from "./SearchInput";
import Link from "next/link";

const isValidUrl = (url: string) => {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
};

const Navbar = ({ canAddBookmark = true }) => {
	return (
		<div className="bg-bgSoft border-muted/30 flex items-center justify-between border-b px-6 py-4">
			<Label className="border-input rounded-md border px-4">
				<Icon icon="lucide:search" className="size-6" />
				<SearchInput />
			</Label>
			<div className="flex items-center gap-4">
				{canAddBookmark && (
					<Dialog>
						<form>
							<DialogTrigger asChild>
								<Button size="lg">
									<Icon icon="lucide:plus" /> Add Bookmark
								</Button>
							</DialogTrigger>
							<DialogContent className="bg-bgSoft sm:max-w-lg">
								<DialogHeader>
									<DialogTitle>Add new bookmark</DialogTitle>
									<DialogDescription className="text-muted/60 text-sm">
										Add bookmark informations.
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
										<Label htmlFor="tags">Tags (Press enter to add)</Label>
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
				)}

				<Popover>
					<PopoverTrigger asChild>
						<Avatar className="border-text cursor-pointer border-2" size="lg">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</PopoverTrigger>
					<PopoverContent className="bg-bgSoft w-48 p-1">
						<PopoverHeader>
							<PopoverDescription className="sr-only">User menu.</PopoverDescription>
						</PopoverHeader>
						<Button variant="ghost" className="w-full text-white" asChild>
							<Link href="/">
								<Icon icon="material-symbols:logout-rounded" />
								Logout
							</Link>
						</Button>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default Navbar;
