import type { Metadata } from "next";
import VoteResultsClient from "./components/VoteResultsClient";

export const metadata: Metadata = {
	title: "Vote Results - VoteChain",
	description: "View real-time voting results",
};

export default function ResultsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#111418] via-[#1a1f26] to-[#111418]">
			<div className="container mx-auto px-6 py-12">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4 text-white">Vote Results</h1>
					<p className="text-gray-400">
						Real-time voting results updated live on the blockchain
					</p>
				</div>

				{/* Client component section */}
				<VoteResultsClient />
			</div>
		</div>
	);
}
