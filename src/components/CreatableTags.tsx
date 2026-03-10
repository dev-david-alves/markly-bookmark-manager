"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Icon } from "@iconify/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Input } from "./ui/input";

const CreatableTags = ({
	id,
	name,
	bookmarkId,
	initialValue,
}: {
	id: string;
	name: string;
	bookmarkId?: string;
	initialValue?: string[];
}) => {
	const [value, setValue] = useState("");
	const [tags, setTags] = useState<string[]>(initialValue || []);
	const MAX_TAGS = 10;

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();

			if (!value) {
				toast.warning("Assign a value to the tag!");
				return;
			}

			if (tags.includes(value.toLowerCase())) {
				toast.warning("Duplicate tag!");
				return;
			}

			if (tags.length >= MAX_TAGS) {
				toast.warning("Maximum number of tags reached!");
				return;
			}

			setTags((prev) => [...prev, value.toLowerCase()]);
			setValue("");
		}
	};

	const handleDeleteTag = (index: number) => {
		let copyTags = [...tags];
		copyTags.splice(index, 1);
		setTags(copyTags);
	};

	useEffect(() => {
		if (bookmarkId) {
			const fetchTags = async () => {
				const response = await fetch(`http://localhost:3000/api/bookmark?id=${bookmarkId}`);
				const data = await response.json();
				setTags(data.tags);
			};
			fetchTags();
		}
	}, [bookmarkId]);

	useEffect(() => {
		setTags(initialValue || []);
	}, [initialValue]);

	return (
		<div className="flex w-full flex-col">
			<div
				className={cn(
					"border-input flex w-full min-w-0 flex-wrap items-center gap-2 rounded-md border bg-transparent p-2 text-base shadow-xs transition-[color,box-shadow] md:text-sm"
				)}
			>
				{tags.map((item, index) => {
					return (
						<Badge
							className="text-md flex items-center justify-between rounded-xs bg-blue-500 px-3 py-1 capitalize"
							key={index}
						>
							{item}{" "}
							<Button
								type="button"
								size="xs"
								className="bg-transparent hover:text-neutral-200"
								onClick={() => handleDeleteTag(index)}
							>
								<Icon icon="lucide:x" className="size-4" />
							</Button>
						</Badge>
					);
				})}

				<Input
					placeholder="Programming..."
					className="w-full"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={handleKeyDown}
				/>

				<input type="hidden" id={id} name={name} value={JSON.stringify(tags)} />
			</div>
			<span className="mt-2 self-end">
				{tags.length} of {MAX_TAGS}
			</span>
		</div>
	);
};

export default CreatableTags;
