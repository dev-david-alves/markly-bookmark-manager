"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { Button } from "./ui/button";
import SearchInput from "./SearchInput";
import { signOutAction } from "@/lib/auth-actions";
import CreateBookmark from "./CreateBookmark";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";

const Navbar = ({ canAddBookmark = true }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="bg-bgSoft border-muted/30 flex w-full items-center justify-between gap-2 border-b px-4 py-4 md:px-6 lg:px-8">
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						className="h-10 w-10 border lg:hidden"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<Icon icon="lucide:x" className="size-5" />
						) : (
							<Icon icon="lucide:menu" className="size-5" />
						)}
					</Button>
					<Label className="border-input rounded-md border px-4">
						<Icon icon="lucide:search" className="size-6" />
						<SearchInput />
					</Label>
				</div>

				<div className="flex items-center gap-2">
					{canAddBookmark && <CreateBookmark />}

					<form action={signOutAction}>
						<Button
							size="lg"
							variant="ghost"
							className="w-full border text-white"
							type="submit"
						>
							<Icon icon="material-symbols:logout-rounded" />
							<span className="hidden md:block">Logout</span>
						</Button>
					</form>
				</div>
			</div>
			<Sidebar
				className={cn(
					"absolute top-22 left-0 block h-[calc(100vh-100px)] max-w-80 rounded-r-lg transition-all lg:hidden",
					open ? "" : "left-[-100%]"
				)}
			/>
		</>
	);
};

export default Navbar;
