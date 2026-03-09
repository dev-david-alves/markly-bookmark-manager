"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DeleteBookmark = ({ id }: { id: string }) => {
	const router = useRouter();

	const handleDeleteBookmark = async (id: string) => {
		const response = await fetch("http://localhost:3000/api/bookmark", {
			method: "DELETE",
			body: JSON.stringify({ _id: id }),
		});
		if (response.status == 200) {
			toast.success("Bookmark deleted successfully!");
			router.refresh();
		} else {
			toast.error("Error deleting bookmark!");
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" className="w-full justify-start text-white">
					<Icon icon="lucide:trash" />
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="bg-bgSoft">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription className="text-muted/60">
						This action cannot be undone. This will permanently delete this bookmark.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => handleDeleteBookmark(id)}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteBookmark;
