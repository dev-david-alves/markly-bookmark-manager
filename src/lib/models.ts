import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		favicon: {
			type: String,
		},
		description: {
			type: String,
		},
		tags: [
			{
				type: String,
			},
		],
		isFixed: {
			type: Boolean,
		},
		isArchived: {
			type: Boolean,
		},
		viewCount: {
			type: Number,
			default: 0,
		},
		lastVisitedDate: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

export const Bookmark = mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);
