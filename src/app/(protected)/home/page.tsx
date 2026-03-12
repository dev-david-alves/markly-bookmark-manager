import Navbar from "@/components/Navbar";
import SortBookmarks from "@/components/SortBookmarks";
import ShowBookmarks from "@/components/ShowBookmarks";

import { type bookmark } from "@/components/Bookmark";
import { Metadata } from "next";
import { headers } from "next/headers";
import LoadingBookmarks from "@/components/LoadingBookmarks";

export const metadata: Metadata = {
	title: "All bookmarks",
};

const getBookmarks = async () => {
	const response = await fetch("http://localhost:3000/api/bookmark", {
		method: "get",
		headers: await headers(),
	});

	if (response.status == 200) {
		const result = await response.json();
		return result.filter((item: bookmark) => !item.isArchived);
	} else {
		return [];
	}
};

const Home = async () => {
	const bookmarks: bookmark[] = await getBookmarks();

	if (!bookmarks) return <LoadingBookmarks />;

	return (
		<div className="flex h-dvh w-full flex-col overflow-y-auto pb-10">
			<Navbar />

			<main className="mt-8 flex flex-col gap-4 px-4 md:gap-8 md:px-6 lg:px-8">
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
