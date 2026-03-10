"use client";

import { useMemo } from "react";
import { bookmark } from "./Bookmark";
import Bookmark from "./Bookmark";
import { useSearchParams } from "next/navigation";

const ShowBookmarks = ({ bookmarks }: { bookmarks: bookmark[] }) => {
	const searchParams = useSearchParams();
	const q = searchParams.get("q");
	const tags = searchParams.get("tags");
	const sort = searchParams.get("sort");

	const sortedItems = useMemo(() => {
		let filtered = [...bookmarks];
		if (q) {
			filtered = filtered.filter((item) =>
				item.title.toLowerCase().includes(q.toLowerCase())
			);
		}

		if (tags) {
			filtered = filtered.filter((item) => {
				if (!item.tags || item.tags.length == 0) {
					return false;
				}

				const pTags = tags.split("-");
				return item.tags.some((tag) =>
					pTags.some((pTag) => pTag.toLowerCase() == tag.toLowerCase())
				);
			});
		}

		return [...filtered].sort((a, b) => {
			if (a.isFixed !== b.isFixed) return a.isFixed ? -1 : 0;

			if (sort === "recent")
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			if (sort === "visited")
				return (
					new Date(b.lastVisitedDate).getTime() - new Date(a.lastVisitedDate).getTime()
				);
			if (sort === "most") return b.viewCount - a.viewCount;

			return 0;
		});
	}, [bookmarks, sort, q]);

	if (sortedItems.length == 0) {
		return (
			<div className="flex h-full w-full justify-center">
				<p className="text-muted/30 text-2xl select-none">No bookmarks found!</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 2xl:grid-cols-3">
			{sortedItems.map((item) => (
				<Bookmark key={item._id} item={item} />
			))}
		</div>
	);
};

export default ShowBookmarks;
