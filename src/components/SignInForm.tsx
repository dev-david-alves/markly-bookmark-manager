"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction } from "@/lib/auth-actions";
import { Icon } from "@iconify/react";
import { useActionState } from "react";

const SignInForm = () => {
	const [state, dispatchAction, isPending] = useActionState(signInAction, { message: "" });

	return (
		<form
			action={dispatchAction}
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
						autoComplete="email"
					/>
				</Field>
				<Field>
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="password..."
						autoComplete="current-password"
					/>
				</Field>
			</FieldGroup>
			<Button size="lg" className="mt-3 w-full" type="submit" disabled={isPending}>
				<Icon icon="lucide:google" /> Login
			</Button>

			{state && state.message && <p className="text-red-500">{state.message}</p>}
		</form>
	);
};

export default SignInForm;
