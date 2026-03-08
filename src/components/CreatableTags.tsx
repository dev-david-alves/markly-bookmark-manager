"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Icon } from "@iconify/react";
import { Button } from "./ui/button";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { toast } from "sonner";

const CreatableTags = (props: { id: string; name: string }) => {
	const [value, setValue] = useState("");
	const [tags, setTags] = useState<string[]>([]);
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
								size="xs"
								className="bg-transparent hover:text-neutral-200"
								onClick={() => handleDeleteTag(index)}
							>
								<Icon icon="lucide:x" className="size-4" />
							</Button>
						</Badge>
					);
				})}

				<Combobox items={tags}>
					<ComboboxInput
						placeholder="Math..."
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={handleKeyDown}
						className="w-full"
						{...props}
					/>
					<ComboboxContent className="bg-bg">
						<ComboboxEmpty>No tags found, press enter to add this value.</ComboboxEmpty>
						<ComboboxList>
							{(item) => (
								<ComboboxItem
									key={item}
									value={item}
									className="text-text capitalize"
								>
									{item}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>

				<input type="hidden" name={props.name} value={JSON.stringify(tags)} />
			</div>
			<span className="mt-2 self-end">
				{tags.length} of {MAX_TAGS}
			</span>
		</div>
	);
};

export default CreatableTags;
