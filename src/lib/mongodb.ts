import mongoose from "mongoose";

type conn = {
	isConnected: boolean;
};

const MONGODB_URI = process.env.MONGODB_URI || "";

export const connectToDB = async () => {
	const connection = {
		isConnected: false,
	} as conn;

	try {
		if (connection.isConnected) return;
		const db = await mongoose.connect(MONGODB_URI);
		connection.isConnected = db.connection.readyState == 1;
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : String(error));
	}
};
