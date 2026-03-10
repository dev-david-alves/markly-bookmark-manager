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
import { toast } from "sonner";
import keywordExtractor from "keyword-extractor";
import z from "zod";

const urlSchema = z.url();

const CreateBookmark = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({
		url: "",
		title: "",
		description: "",
		tags: "",
	});

	const [values, setValues] = useState<Record<string, string | string[]>>({
		url: "",
		title: "",
		description: "",
		favicon: "",
		tags: [],
	});

	const handleCreateBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = createBookmarkSchema.safeParse({ ...values });

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
				...values,
			}),
		});

		await response.json();

		if (response.status == 201) {
			setOpen(false);
			toast.success("Bookmark created successfully!");
			router.refresh();
		} else {
			toast.error("Error creating bookmark!");
		}
	};

	useEffect(() => {
		setErrors({
			url: "",
			title: "",
			description: "",
			tags: "",
		});
		setValues({
			url: "",
			title: "",
			description: "",
			favicon: "",
			tags: [],
		});
	}, [open]);

	const handleGetWebsiteInfo = async (url: string) => {
		// Check with zod if the url is valid
		const result = urlSchema.safeParse(url);
		if (!result.success) {
			return;
		}

		if (values.title && values.description && values.tags.length && values.favicon) {
			return;
		}

		const res = await fetch(`http://localhost:3000/api/preview?url=${url}`);
		const data = await res.json();

		if (data.error) {
			toast.error(data.error);
			return;
		}

		const extraction_result = keywordExtractor.extract(data.description, {
			language: "english",
			remove_digits: true,
			return_changed_case: true,
			remove_duplicates: false,
		});

		setValues((prev) => ({
			...prev,
			title: !prev.title ? data.title : prev.title,
			description: !prev.description ? data.description : prev.description,
			favicon: data.favicon,
			tags: !prev.tags.length ? extraction_result.slice(0, 10) : prev.tags,
		}));
	};

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
							<Input
								id="url"
								name="url"
								placeholder="https://example.com..."
								value={values.url}
								onChange={(e) => {
									setValues({ ...values, url: e.target.value });
									handleGetWebsiteInfo(e.target.value);
								}}
							/>
							{errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
						</Field>
						<Field>
							<Label htmlFor="title">Title *</Label>
							<Input
								id="title"
								name="title"
								placeholder="Example title..."
								value={values.title}
								onChange={(e) => setValues({ ...values, title: e.target.value })}
							/>
							{errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
						</Field>
						<Field>
							<Label htmlFor="description">Description</Label>
							<Input
								id="description"
								name="description"
								placeholder="Example description..."
								value={values.description}
								onChange={(e) =>
									setValues({ ...values, description: e.target.value })
								}
							/>
							{errors.description && (
								<p className="text-sm text-red-500">{errors.description}</p>
							)}
						</Field>
						<Field>
							<Label htmlFor="tags">Tags (Press enter to add)</Label>
							<CreatableTags
								id="tags"
								name="tags"
								initialValue={[...values.tags] as string[]}
							/>
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
