"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
	await auth.api.signUpEmail({
		body: {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			name: formData.get("username") as string,
		},
	});

	redirect("/home");
};

export const signInAction = async (formData: FormData) => {
	await auth.api.signInEmail({
		body: {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		},
	});

	redirect("/home");
};

export const signOutAction = async () => {
	await auth.api.signOut({
		headers: await headers(),
	});

	redirect("/");
};
