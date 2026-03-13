import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

const client = process.env.MONGODB_URI ? new MongoClient(process.env.MONGODB_URI) : null;
const db = client?.db();

export const auth = betterAuth({
	database:
		db && client
			? mongodbAdapter(db as any, {
					client,
				})
			: ({} as any),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [nextCookies()],
});
