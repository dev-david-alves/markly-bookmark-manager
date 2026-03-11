import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";

export default async function Auth() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) redirect("/home");

	return (
		<div className="flex min-h-dvh w-full flex-col items-center justify-center py-10">
			<div className="flex items-center gap-2">
				<div className="bg-primary w-fit rounded-lg p-2">
					<Image src="/bookmark.png" width={32} height={32} alt="Markly" />
				</div>
				<h1 className="text-3xl font-bold">Markly</h1>
			</div>
			<p className="text-muted/80 text-md mt-2 mb-6 px-10 text-center sm:text-lg">
				Create memorable bookmarks to organize your web links
			</p>

			<main className="flex flex-col items-center justify-center gap-4 px-10 min-[900px]:flex-row">
				<SignInForm />

				<span className="text-muted/60">OR</span>

				<SignUpForm />
			</main>
		</div>
	);
}
