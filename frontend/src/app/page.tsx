import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Shield, Vote, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "VoteChain - Decentralized Voting Platform",
	description:
		"A transparent and secure voting system powered by blockchain technology",
	openGraph: {
		title: "VoteChain - Decentralized Voting Platform",
		description:
			"A transparent and secure voting system powered by blockchain technology",
	},
};

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#111418] via-[#1a1f26] to-[#111418]">
			<section className="relative px-6 py-16 sm:py-24">
				<div className="mx-auto max-w-4xl text-center">
					<div className="flex justify-center mb-8">
						<div className="flex items-center gap-3 text-primary">
							<Vote size={48} />
							<h1 className="text-4xl sm:text-6xl font-bold text-white">
								VoteChain
							</h1>
						</div>
					</div>

					<p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
						A voting system powered by blockchain technology that ensures
						<br />
						<span className="text-primary font-semibold">
							transparency and trust
						</span>
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/vote">
							<Button
								size="lg"
								className="bg-primary hover:bg-primary/80 text-primary-foreground px-8"
							>
								Start Voting
							</Button>
						</Link>
						<Link href="/results">
							<Button
								size="lg"
								variant="outline"
								className="border-gray-600 text-gray-300 hover:bg-gray-800"
							>
								View Results
							</Button>
						</Link>
					</div>
				</div>
			</section>

			<section className="px-6 py-16">
				<div className="mx-auto max-w-6xl">
					<h2 className="text-3xl font-bold text-center text-white mb-12">
						Why Choose VoteChain?
					</h2>

					<div className="grid md:grid-cols-3 gap-8">
						<Card className="bg-[#1a1f26] border-gray-700 p-6">
							<Shield className="text-primary mb-4" size={40} />
							<h3 className="text-xl font-semibold text-white mb-3">
								Tamper-Proof
							</h3>
							<p className="text-gray-400">
								Voting data recorded on the blockchain cannot be altered by
								anyone
							</p>
						</Card>

						<Card className="bg-[#1a1f26] border-gray-700 p-6">
							<BarChart3 className="text-primary mb-4" size={40} />
							<h3 className="text-xl font-semibold text-white mb-3">
								Fully Transparent
							</h3>
							<p className="text-gray-400">
								All votes are publicly available in real-time and verifiable by
								anyone
							</p>
						</Card>

						<Card className="bg-[#1a1f26] border-gray-700 p-6">
							<Zap className="text-primary mb-4" size={40} />
							<h3 className="text-xl font-semibold text-white mb-3">
								Instant Updates
							</h3>
							<p className="text-gray-400">
								Vote results are updated in real-time and can be viewed
								instantly
							</p>
						</Card>
					</div>
				</div>
			</section>
		</div>
	);
}
