"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
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
import CreatableTags from "./CreatableTags";
import { useRouter } from "next/navigation";
import { createBookmarkSchema } from "@/lib/schemas";
import { toast } from "sonner";
import { bookmark } from "./Bookmark";

const UpdateBookmark = ({ item, children }: { item: bookmark; children: React.ReactNode }) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({
		url: "",
		title: "",
		description: "",
		tags: "",
	});
	const [url, setUrl] = useState(item.url || "");
	const [title, setTitle] = useState(item.title || "");
	const [description, setDescription] = useState(item.description || "");

	const handleUpdateBookmark = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);
		const newTags = JSON.parse(data.tags as string);

		const result = createBookmarkSchema.safeParse({ ...data, tags: newTags });

		if (!result.success) {
			setErrors({
				url: result.error.issues.find((issue) => issue.path[0] === "url")?.message || "",
				title:
					result.error.issues.find((issue) => issue.path[0] === "title")?.message || "",
				description:
					result.error.issues.find((issue) => issue.path[0] === "description")?.message ||
					"",
				tags: result.error.issues.find((issue) => issue.path[0] === "tags")?.message || "",
			});
			return;
		}

		setErrors({
			url: "",
			title: "",
			description: "",
			tags: "",
		});

		const response = await fetch("http://localhost:3000/api/bookmark", {
			method: "PUT",
			body: JSON.stringify({
				_id: item._id,
				...data,
				tags: newTags,
			}),
		});

		await response.json();

		if (response.status == 200) {
			setOpen(false);
			toast.success("Bookmark updated successfully!");
			router.refresh();
		} else {
			toast.error("Error updating bookmark!");
		}
	};

	useEffect(() => {
		setErrors({
			url: "",
			title: "",
			description: "",
			tags: "",
		});
	}, [open]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="bg-bgSoft sm:max-w-lg">
				<form onSubmit={handleUpdateBookmark}>
					<DialogHeader>
						<DialogTitle>Edit bookmark</DialogTitle>
						<DialogDescription className="text-muted/60 mb-4 text-sm">
							Edit bookmark informations.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup className="gap-y-4">
						<Field>
							<Label htmlFor="url">URL *</Label>
							<Input
								id="url"
								name="url"
								placeholder="https://example.com..."
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
							{errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
						</Field>
						<Field>
							<Label htmlFor="title">Title *</Label>
							<Input
								id="title"
								name="title"
								placeholder="Example title..."
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							{errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
						</Field>
						<Field>
							<Label htmlFor="description">Description</Label>
							<Input
								id="description"
								name="description"
								placeholder="Example description..."
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							{errors.description && (
								<p className="text-sm text-red-500">{errors.description}</p>
							)}
						</Field>
						<Field>
							<Label htmlFor="tags">Tags (Press enter to add)</Label>
							<CreatableTags id="tags" name="tags" bookmarkId={item._id} />
							{errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
						</Field>
					</FieldGroup>
					<DialogFooter className="mt-2">
						<DialogClose asChild>
							<Button variant="outline" className="text-text bg-transparent">
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateBookmark;
