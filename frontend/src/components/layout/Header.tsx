import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export default function Header() {
	return (
		<header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#293038] px-6 sm:px-10 py-4">
			<div className="flex items-center gap-3 sm:gap-4 text-white">
				<svg
					className="size-7 sm:size-8 text-[#1978e5]"
					fill="none"
					viewBox="0 0 48 48"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>VoteChain Logo</title>
					<path
						clipRule="evenodd"
						d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
						fill="currentColor"
						fillRule="evenodd"
						opacity="0.7"
					/>
					<path
						clipRule="evenodd"
						d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
						fill="currentColor"
						fillRule="evenodd"
					/>
				</svg>
				<h1 className="text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">
					VoteChain
				</h1>
			</div>
			<div className="flex items-center gap-2 sm:gap-4">
				<Button className="gap-2">
					<Wallet size={20} />
					<span className="hidden sm:inline">Connect Wallet</span>
					<span className="sm:hidden">Connect</span>
				</Button>
			</div>
		</header>
	);
}
