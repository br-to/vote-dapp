import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useVotingContract } from "@/hooks/useVotingContract";
import { Loader2 } from "lucide-react";

export default function VoteResults() {
	const { votingResults, isLoadingResults } = useVotingContract();

	if (isLoadingResults) {
		return (
			<Card className="bg-[#111418] border-gray-700">
				<CardContent className="flex items-center justify-center py-8">
					<Loader2 className="animate-spin h-8 w-8 text-gray-400" />
					<span className="ml-2 text-gray-400">Loading vote results...</span>
				</CardContent>
			</Card>
		);
	}

	const totalVotes = votingResults?.totalVotes ?? 0;
	const optionAVotes = votingResults?.votesA ?? 0;
	const optionBVotes = votingResults?.votesB ?? 0;
	const aPercentage = totalVotes > 0 ? (optionAVotes / totalVotes) * 100 : 0;
	const bPercentage = totalVotes > 0 ? (optionBVotes / totalVotes) * 100 : 0;

	return (
		<Card className="bg-[#111418] border-gray-700">
			<CardHeader>
				<CardTitle className="text-lg sm:text-xl text-white">
					Vote Results
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<span className="text-sm sm:text-base font-medium text-gray-400">
							Option A
						</span>
						<span className="text-base sm:text-lg font-bold text-primary">
							{optionAVotes} votes ({aPercentage.toFixed(1)}%)
						</span>
					</div>
					<Progress value={aPercentage} className="h-2 bg-gray-700" />
				</div>
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<span className="text-sm sm:text-base font-medium text-gray-400">
							Option B
						</span>
						<span className="text-base sm:text-lg font-bold text-gray-300">
							{optionBVotes} votes ({bPercentage.toFixed(1)}%)
						</span>
					</div>
					<Progress value={bPercentage} className="h-2 bg-gray-700" />
				</div>
				<div className="pt-2 border-t border-gray-700">
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium text-gray-400">
							Total Votes
						</span>
						<span className="text-base font-bold text-white">
							{totalVotes} votes
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
