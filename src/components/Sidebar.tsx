"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { bookmark } from "./Bookmark";

type Tag = {
	id: number;
	name: string;
	count: number;
	isChecked: boolean;
};

const getTags = async () => {
	const response = await fetch("http://localhost:3000/api/bookmark", {
		method: "get",
	});

	let groupedTags: Tag[] = [];
	if (response.status == 200) {
		const result = await response.json();
		result.forEach((item: bookmark) => {
			if (item.tags) {
				item.tags.map((tag: string) => {
					const tagIndex = groupedTags.findIndex(
						(gTag) => gTag.name == tag.toLowerCase()
					);
					if (tagIndex == -1) {
						groupedTags.push({
							id: groupedTags.length,
							name: tag.toLowerCase(),
							count: 1,
							isChecked: false,
						});
					} else {
						groupedTags[tagIndex].count += 1;
					}
				});
			}
		});
	} else {
		toast.error("Error fetching tags!");
	}

	groupedTags.sort((a, b) => b.count - a.count);
	return groupedTags;
};

const Sidebar = ({ className }: { className?: string }) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const params = new URLSearchParams(searchParams);
	const { replace } = useRouter();
	const [tags, setTags] = useState<Tag[]>([]);

	const handleCheckTag = (id: number) => {
		setTags((prev) =>
			prev.map((tag) => (tag.id === id ? { ...tag, isChecked: !tag.isChecked } : tag))
		);
	};

	const handleResetTags = () => {
		setTags((prev) => prev.map((tag) => ({ ...tag, isChecked: false })));
	};

	useEffect(() => {
		const getGroupedTags = async () => {
			const gTags = await getTags();
			setTags(gTags);
		};

		getGroupedTags();
	}, []);

	useEffect(() => {
		let checkedTags = tags.filter((tag) => tag.isChecked);

		if (checkedTags.length == 0) {
			params.delete("tags");
			replace(`${pathname}?${params.toString()}`);
		} else {
			params.set("tags", checkedTags.map((tag) => tag.name.toLowerCase()).join("-"));
			replace(`${pathname}?${params.toString()}`);
		}
	}, [tags]);

	useEffect(() => {
		handleResetTags();
	}, [pathname]);

	return (
		<div
			className={cn(
				"bg-bgSoft custom-scroll border-muted/30 h-dvh w-100 overflow-y-auto border-r px-4 py-6",
				className
			)}
		>
			<div className="flex items-center gap-2">
				<div className="bg-primary w-fit rounded-lg p-2">
					<Image src="/bookmark.png" width={24} height={24} alt="Markly" />
				</div>
				<span className="text-lg font-bold">Markly</span>
			</div>
			<Link
				href="/home"
				className={cn(
					"hover:bg-primarySoft/30 mt-4 flex items-center gap-2 rounded-md px-4 py-2",
					pathname == "/home" && "bg-primarySoft/30"
				)}
			>
				<Icon icon="lucide:home" className="size-4" /> Home
			</Link>
			<Link
				href="/archived"
				className={cn(
					"hover:bg-primarySoft/30 mt-1 flex items-center gap-2 rounded-md px-4 py-2",
					pathname == "/archived" && "bg-primarySoft/30"
				)}
			>
				<Icon icon="lucide:archive" className="size-4" /> Archived
			</Link>

			<div className="mt-4 flex flex-col gap-2 pl-4">
				<div className="flex items-center justify-between">
					<span className="text-sm uppercase">TAGS</span>

					{tags.some((tag) => tag.isChecked) && (
						<Button
							size="xs"
							variant="ghost"
							className="h-5 underline"
							onClick={handleResetTags}
						>
							Reset
						</Button>
					)}
				</div>

				{tags.length == 0 ? (
					<div className="flex h-full w-full justify-center">
						<p className="text-muted/30 text-sm select-none">No tags!</p>
					</div>
				) : (
					<ul className="flex flex-col gap-2">
						{tags.map((tag) => (
							<li key={tag.id} className="flex items-center justify-between">
								<Label className="w-full cursor-pointer">
									<Checkbox
										className="size-4"
										checked={tag.isChecked}
										onCheckedChange={() => handleCheckTag(tag.id)}
									/>{" "}
									{tag.name}{" "}
								</Label>
								<Badge className="size-6">{tag.count}</Badge>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
