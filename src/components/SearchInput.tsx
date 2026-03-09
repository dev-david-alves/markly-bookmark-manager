"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Input } from "./ui/input";

const SearchInput = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const params = new URLSearchParams(searchParams);
	const { replace } = useRouter();
	const q = searchParams.get("q");

	const [text, setText] = useState("");
	const [value] = useDebounce(text, 100);

	useEffect(() => {
		if (value) {
			params.set("q", value);
		} else {
			params.delete("q");
		}

		replace(`${pathname}?${params.toString()}`);
	}, [value, q]);

	return (
		<Input
			type="text"
			value={text}
			placeholder="Search by title..."
			className="h-10 border-none focus-visible:ring-0"
			onChange={(e) => setText(e.target.value)}
		/>
	);
};

export default SearchInput;
