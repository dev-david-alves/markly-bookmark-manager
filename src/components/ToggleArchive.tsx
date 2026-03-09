"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { bookmark } from "./Bookmark";

const ToggleArchive = ({ item }: { item: bookmark }) => {
	const router = useRouter();

	const handleToggleArchive = async (id: string) => {
		const response = await fetch("http://localhost:3000/api/bookmark", {
			method: "PUT",
			body: JSON.stringify({ _id: id, isArchived: !item.isArchived }),
		});
		if (response.status == 200) {
			toast.success(`${item.isArchived ? "Unarchived" : "Archived"} bookmark successfully!`);
			router.refresh();
		} else {
			toast.error("Error pinning bookmark!");
		}
	};

	return (
		<Button
			variant="ghost"
			className="w-full justify-start text-white"
			onClick={() => handleToggleArchive(item._id)}
		>
			<Icon
				icon={
					item.isArchived
						? "material-symbols:unarchive-outline"
						: "material-symbols:archive-outline"
				}
			/>
			{item.isArchived ? "Unarchive" : "Archive"}
		</Button>
	);
};

export default ToggleArchive;
