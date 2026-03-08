import { Bookmark } from "./models";
import { connectToDB } from "./mongodb";

export const fetchBookmaks = async () => {
	try {
		await connectToDB();
		const bookmarks = await Bookmark.find();
		return bookmarks;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch bookmaks!");
	}
};
