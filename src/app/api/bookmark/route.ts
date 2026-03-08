import { Bookmark } from "@/lib/models";
import { type bookmark } from "@/components/Bookmark";
import { connectToDB } from "@/lib/mongodb";

export async function GET(request: Request) {
	try {
		await connectToDB();
		const bookmarks = await Bookmark.find();
		return Response.json(bookmarks, { status: 200 });
	} catch (error) {
		console.error(error);
		return Response.json({ error: "Failed to fetch bookmark!" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		await connectToDB();
		const data = await request.json();
		const bookmark = await Bookmark.create(data);

		return Response.json(bookmark, { status: 201 });
	} catch (error) {
		return Response.json({ error: "Failed to create bookmark!" }, { status: 500 });
	}
}
