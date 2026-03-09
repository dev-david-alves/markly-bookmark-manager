"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { bookmark } from "./Bookmark";

const TogglePin = ({ item }: { item: bookmark }) => {
	const router = useRouter();

	const handleTogglePin = async (id: string) => {
		const response = await fetch("http://localhost:3000/api/bookmark", {
			method: "PUT",
			body: JSON.stringify({ _id: id, isFixed: !item.isFixed }),
		});
		if (response.status == 200) {
			toast.success(`${item.isFixed ? "Unpinned" : "Pinned"} bookmark successfully!`);
			router.refresh();
		} else {
			toast.error("Error pinning bookmark!");
		}
	};

	return (
		<Button
			variant="ghost"
			className="w-full justify-start text-white"
			onClick={() => handleTogglePin(item._id)}
		>
			<Icon icon={item.isFixed ? "lucide:pin-off" : "lucide:pin"} />
			{item.isFixed ? "Unpin" : "Pin"}
		</Button>
	);
};

export default TogglePin;
