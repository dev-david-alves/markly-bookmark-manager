import Navbar from "@/components/Navbar";
import SortBookmarks from "@/components/SortBookmarks";
import ShowBookmarks from "@/components/ShowBookmarks";

import { type bookmark } from "@/components/Bookmark";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const metadata: Metadata = {
	title: "All bookmarks",
};

const getBookmarks = async () => {
	const response = await fetch("http://localhost:3000/api/bookmark", {
		method: "get",
	});

	if (response.status == 200) {
		const result = await response.json();
		return result.filter((item: bookmark) => !item.isArchived);
	} else {
		toast.error("Error fetching your bookmarks!");
	}
};

const Home = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) redirect("/");

	const bookmarks: bookmark[] = await getBookmarks();

	if (!bookmarks) return <div>Loading...</div>;

	return (
		<div className="flex h-dvh w-full flex-col overflow-y-auto pb-10">
			<Navbar />

			<main className="mt-8 flex flex-col gap-8 px-8">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-medium">All bookmarks</h1>
					<SortBookmarks />
				</div>

				<ShowBookmarks bookmarks={bookmarks} />
			</main>
		</div>
	);
};

export default Home;
