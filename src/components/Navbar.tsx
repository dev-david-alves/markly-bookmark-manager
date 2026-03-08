import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { Button } from "./ui/button";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchInput from "./SearchInput";
import { signOutAction } from "@/lib/auth-actions";
import CreateBookmark from "./CreateBookmark";

const Navbar = ({ canAddBookmark = true }) => {
	return (
		<div className="bg-bgSoft border-muted/30 flex w-full items-center justify-between border-b px-6 py-4">
			<Label className="border-input rounded-md border px-4">
				<Icon icon="lucide:search" className="size-6" />
				<SearchInput />
			</Label>
			<div className="flex items-center gap-4">
				{canAddBookmark && <CreateBookmark />}

				<Popover>
					<PopoverTrigger asChild>
						<Avatar className="border-text cursor-pointer border-2" size="lg">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</PopoverTrigger>
					<PopoverContent className="bg-bgSoft w-48 p-1">
						<PopoverHeader>
							<PopoverDescription className="sr-only">User menu.</PopoverDescription>
						</PopoverHeader>

						<form action={signOutAction}>
							<Button variant="ghost" className="w-full text-white" type="submit">
								<Icon icon="material-symbols:logout-rounded" />
								Logout
							</Button>
						</form>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default Navbar;
