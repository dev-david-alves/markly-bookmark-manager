"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { CardTitle } from "./ui/card";
import { bookmark } from "./Bookmark";
import { useRouter } from "next/navigation";

const VistLink = ({ item }: { item: bookmark }) => {
	const router = useRouter();

	const handleVisitLink = async (id: string) => {
		const response = await fetch("http://localhost:3000/api/bookmark", {
			method: "PUT",
			body: JSON.stringify({
				_id: id,
				viewCount: item.viewCount + 1,
				lastVisitedDate: new Date(),
			}),
		});
		if (response.status == 200) {
			router.refresh();
		} else {
			console.error("Error counting visit!");
		}
	};

	return (
		<Link href={item.url} target="_blank" onClick={() => handleVisitLink(item._id)}>
			<CardTitle className="hover:brightness-90">
				{item.title} <Icon icon="majesticons:open" className="ml-2 inline size-4" />
			</CardTitle>
		</Link>
	);
};

export default VistLink;
