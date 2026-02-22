import { Icon } from "@iconify/react";
import Image from "next/image";

const Sidebar = () => {
	return (
		<div className="w-full">
			<div className="bg-primary w-fit rounded-lg p-2">
				<Image src="/bookmark.png" width={30} height={30} alt="Markly" />
			</div>
		</div>
	);
};

export default Sidebar;
