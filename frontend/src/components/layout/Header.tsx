import { Vote } from "lucide-react";
import Link from "next/link";
import WalletSection from "./WalletSection";

export default function Header() {
	return (
		<header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-700 px-6 sm:px-10 py-4 bg-[#1a1f26]/50 backdrop-blur-sm">
			<Link
				href="/"
				className="flex items-center gap-3 sm:gap-4 text-white hover:text-primary transition-colors"
			>
				<Vote className="size-7 sm:size-8 text-primary" />
				<h1 className="text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">
					VoteChain
				</h1>
			</Link>
			<div className="flex items-center gap-2 sm:gap-4">
				<WalletSection />
			</div>
		</header>
	);
}
