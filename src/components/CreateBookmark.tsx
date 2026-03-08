"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
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

const CreateBookmark = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({
		url: "",
		title: "",
		description: "",
		tags: "",
	});

	const handleCreateBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);
		const tags = JSON.parse(data.tags as string);

		const result = createBookmarkSchema.safeParse({ ...data, tags });

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
			method: "POST",
			body: JSON.stringify({
				...data,
				tags,
			}),
		});

		await response.json();

		if (response.status == 201) {
			setOpen(false);
			router.refresh();
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
			<DialogTrigger asChild>
				<Button size="lg">
					<Icon icon="lucide:plus" /> Add Bookmark
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-bgSoft sm:max-w-lg">
				<form onSubmit={handleCreateBookmark}>
					<DialogHeader>
						<DialogTitle>Add new bookmark</DialogTitle>
						<DialogDescription className="text-muted/60 mb-4 text-sm">
							Add bookmark informations.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup className="gap-y-4">
						<Field>
							<Label htmlFor="url">URL *</Label>
							<Input id="url" name="url" placeholder="https://example.com..." />
							{errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
						</Field>
						<Field>
							<Label htmlFor="title">Title *</Label>
							<Input id="title" name="title" placeholder="Example title..." />
							{errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
						</Field>
						<Field>
							<Label htmlFor="description">Description</Label>
							<Input
								id="description"
								name="description"
								placeholder="Example description..."
							/>
							{errors.description && (
								<p className="text-sm text-red-500">{errors.description}</p>
							)}
						</Field>
						<Field>
							<Label htmlFor="tags">Tags (Press enter to add)</Label>
							<CreatableTags id="tags" name="tags" />
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

export default CreateBookmark;
