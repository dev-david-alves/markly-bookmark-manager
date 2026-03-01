"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Input } from "./ui/input";

const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [text, setText] = useState("");
	const [value] = useDebounce(text, 1000);

	// useEffect(() => {
	// 	const params = new URLSearchParams(searchParams.toString());

	// 	if (value) {
	// 		params.set("q", value);
	// 	} else {
	// 		params.delete("q");
	// 	}

	// 	router.push(`?${params.toString()}`, { scroll: false });
	// }, [value, router, searchParams]);

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
