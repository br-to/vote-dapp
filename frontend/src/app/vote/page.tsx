"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import VotingCard from "@/components/voting/VotingCard";
import QueryProvider from "@/lib/QueryClient";
import { Vote } from "lucide-react";

export default function VotePage() {
	return (
		<QueryProvider>
			<div className="min-h-screen bg-gradient-to-br from-[#111418] via-[#1a1f26] to-[#111418]">
				<Header />
				<main className="px-6 py-16">
					<div className="mx-auto max-w-4xl">
						<div className="text-center mb-12">
							<div className="flex justify-center mb-6">
								<div className="flex items-center gap-3 text-primary">
									<Vote size={40} />
									<h1 className="text-3xl sm:text-4xl font-bold text-white">
										Cast Your Vote
									</h1>
								</div>
							</div>
							<p className="text-lg text-gray-300 max-w-2xl mx-auto">
								Participate in the democratic process with blockchain-powered
								voting. Your vote will be securely recorded and transparently
								counted.
							</p>
						</div>
						<div className="w-full max-w-2xl mx-auto">
							<VotingCard />
						</div>
					</div>
				</main>
				<Footer />
			</div>
		</QueryProvider>
	);
}
