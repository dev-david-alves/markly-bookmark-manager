"use server";

import { auth } from "@/lib/auth";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const signUpAction = async (prevState: { message: string }, formData: FormData) => {
	try {
		await auth.api.signUpEmail({
			body: {
				email: formData.get("email") as string,
				password: formData.get("password") as string,
				name: formData.get("username") as string,
			},
		});
	} catch (error) {
		if (isAPIError(error)) {
			if (error.body?.message?.includes("email")) {
				return { message: "Invalid email address" };
			}

			if (error.body?.message?.includes("password")) {
				return { message: "Invalid password" };
			}

			if (error.body?.message?.includes("name")) {
				return { message: "Invalid username" };
			}
		}

		return { message: "Failed to create account! Please try again." };
	}

	redirect("/home", RedirectType.replace);
};

export const signInAction = async (prevState: { message: string }, formData: FormData) => {
	try {
		await auth.api.signInEmail({
			body: {
				email: formData.get("email") as string,
				password: formData.get("password") as string,
			},
		});
	} catch (error) {
		if (isAPIError(error)) {
			return { message: error.body?.message || "Failed to login! Please try again." };
		}

		return { message: "Failed to login! Please try again." };
	}

	redirect("/home", RedirectType.replace);
};

export const signOutAction = async () => {
	await auth.api.signOut({
		headers: await headers(),
	});

	redirect("/");
};
