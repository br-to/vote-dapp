"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import VoteResults from "@/components/voting/VoteResults";
import QueryProvider from "@/lib/QueryClient";
import { ArrowLeft, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function VoteResultsClient() {
	return (
		<QueryProvider>
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<Link href="/">
						<Button
							variant="ghost"
							className="gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
						>
							<ArrowLeft size={16} />
							Back to Home
						</Button>
					</Link>
				</div>

				<Card className="bg-[#1a1f26] border-gray-700 p-8">
					<div className="flex items-center gap-3 mb-6">
						<BarChart3 className="text-primary" size={32} />
						<h2 className="text-2xl font-bold text-white">Live Vote Results</h2>
					</div>
					<VoteResults optionAVotes={123} optionBVotes={456} />
				</Card>

				<div className="text-center mt-8">
					<Link href="/vote">
						<Button className="bg-primary hover:bg-primary/80 text-primary-foreground px-8">
							Participate in Voting
						</Button>
					</Link>
				</div>
			</div>
		</QueryProvider>
	);
}
