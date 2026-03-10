import Sidebar from "@/components/Sidebar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex w-full">
			<Sidebar className="hidden lg:block" />
			{children}
		</div>
	);
}
