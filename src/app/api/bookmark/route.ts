import { Bookmark } from "@/lib/models";
import { connectToDB } from "@/lib/mongodb";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	try {
		await connectToDB();
		if (id) {
			const bookmark = await Bookmark.findById(id);
			return Response.json(bookmark, { status: 200 });
		}
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

export async function PUT(request: Request) {
	try {
		await connectToDB();
		const data = await request.json();
		const bookmark = await Bookmark.findByIdAndUpdate(data._id, data, {
			returnDocument: "after",
		});
		return Response.json(bookmark, { status: 200 });
	} catch (error) {
		console.error(error);
		return Response.json({ error: "Failed to update bookmark!" }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	try {
		await connectToDB();
		const data = await request.json();
		const bookmark = await Bookmark.findByIdAndDelete(data._id);
		return Response.json(bookmark, { status: 200 });
	} catch (error) {
		return Response.json({ error: "Failed to delete bookmark!" }, { status: 500 });
	}
}
