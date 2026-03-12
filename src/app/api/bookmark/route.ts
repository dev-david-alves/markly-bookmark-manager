import { Bookmark } from "@/lib/models";
import { connectToDB } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: Request) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	try {
		await connectToDB();
		if (id) {
			const bookmark = await Bookmark.findOne({ _id: id, userId: session.user.id });
			return Response.json(bookmark, { status: 200 });
		}
		const bookmarks = await Bookmark.find({ userId: session.user.id });
		return Response.json(bookmarks, { status: 200 });
	} catch (error) {
		console.error(error);
		return Response.json({ error: "Failed to fetch bookmark!" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

	try {
		await connectToDB();
		const data = await request.json();
		const bookmark = await Bookmark.create({ ...data, userId: session.user.id });

		return Response.json(bookmark, { status: 201 });
	} catch (error) {
		return Response.json({ error: "Failed to create bookmark!" }, { status: 500 });
	}
}

export async function PUT(request: Request) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

	try {
		await connectToDB();
		const data = await request.json();
		const bookmark = await Bookmark.findOneAndUpdate(
			{ _id: data._id, userId: session.user.id },
			data,
			{ returnDocument: "after" }
		);
		return Response.json(bookmark, { status: 200 });
	} catch (error) {
		console.error(error);
		return Response.json({ error: "Failed to update bookmark!" }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

	try {
		await connectToDB();
		const data = await request.json();
		const bookmark = await Bookmark.findOneAndDelete({
			_id: data._id,
			userId: session.user.id,
		});
		return Response.json(bookmark, { status: 200 });
	} catch (error) {
		return Response.json({ error: "Failed to delete bookmark!" }, { status: 500 });
	}
}
