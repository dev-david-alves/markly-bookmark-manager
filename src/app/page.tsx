import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import { signInAction, signUpAction } from "@/lib/auth-actions";
import { Icon } from "@iconify/react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Auth() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) redirect("/home");

	return (
		<div className="flex min-h-dvh w-full flex-col items-center justify-center">
			<div className="flex items-center gap-2">
				<div className="bg-primary w-fit rounded-lg p-2">
					<Image src="/bookmark.png" width={32} height={32} alt="Markly" />
				</div>
				<h1 className="text-3xl font-bold">Markly</h1>
			</div>
			<p className="text-muted/80 mt-2 mb-6 text-lg">
				Create memorable bookmarks to organize your web links
			</p>

			<main className="flex items-center gap-4">
				<form
					action={signInAction}
					className="bg-bgSoft border-muted/30 flex w-100 flex-col items-center gap-2 rounded-md border p-6 shadow-lg"
				>
					<h1 className="text-lg font-bold">Login</h1>

					<FieldGroup className="gap-y-4">
						<Field>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="johndoe@gmail.com..."
							/>
						</Field>
						<Field>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="password..."
							/>
						</Field>
					</FieldGroup>
					<Button size="lg" className="mt-3 w-full" type="submit">
						<Icon icon="lucide:google" /> Login
					</Button>
				</form>

				<span className="text-muted/60">OR</span>

				<form
					action={signUpAction}
					className="bg-bgSoft border-muted/30 flex w-100 flex-col items-center gap-2 rounded-md border p-6 shadow-lg"
				>
					<h1 className="text-lg font-bold">Create Account</h1>

					<FieldGroup className="gap-y-4">
						<Field>
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								name="username"
								type="text"
								placeholder="John Doe..."
							/>
						</Field>
						<Field>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="johndoe@gmail.com..."
							/>
						</Field>
						<Field>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="password..."
							/>
						</Field>
					</FieldGroup>
					<Button size="lg" className="mt-3 w-full" type="submit">
						<Icon icon="lucide:google" /> Create Account
					</Button>
				</form>
			</main>
		</div>
	);
}
