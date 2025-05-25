import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type VoteResultsProps = {
	optionAVotes: number;
	optionBVotes: number;
};

export default function VoteResults({
	optionAVotes,
	optionBVotes,
}: VoteResultsProps) {
	const totalVotes = optionAVotes + optionBVotes;
	const yesPercentage = totalVotes > 0 ? (optionAVotes / totalVotes) * 100 : 0;
	const noPercentage = totalVotes > 0 ? (optionBVotes / totalVotes) * 100 : 0;

	return (
		<Card className="bg-[#111418] border-gray-700">
			<CardHeader>
				<CardTitle className="text-lg sm:text-xl text-white">
					Current Vote Results
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<span className="text-sm sm:text-base font-medium text-gray-400">
							Yes Votes
						</span>
						<span className="text-base sm:text-lg font-bold text-primary">
							{optionAVotes} ({yesPercentage.toFixed(1)}%)
						</span>
					</div>
					<Progress value={yesPercentage} className="h-2 bg-gray-700" />
				</div>
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<span className="text-sm sm:text-base font-medium text-gray-400">
							No Votes
						</span>
						<span className="text-base sm:text-lg font-bold text-gray-300">
							{optionBVotes} ({noPercentage.toFixed(1)}%)
						</span>
					</div>
					<Progress value={noPercentage} className="h-2 bg-gray-700" />
				</div>
				<div className="pt-2 border-t border-gray-700">
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium text-gray-400">
							Total Votes
						</span>
						<span className="text-base font-bold text-white">{totalVotes}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
