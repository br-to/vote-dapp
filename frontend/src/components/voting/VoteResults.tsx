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
	const optionAPercentage =
		totalVotes > 0 ? (optionAVotes / totalVotes) * 100 : 0;
	const optionBPercentage =
		totalVotes > 0 ? (optionBVotes / totalVotes) * 100 : 0;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg sm:text-xl">
					Current Vote Counts
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<span className="text-sm sm:text-base font-medium text-muted-foreground">
							Option A
						</span>
						<span className="text-base sm:text-lg font-bold">
							{optionAVotes} ({optionAPercentage.toFixed(1)}%)
						</span>
					</div>
					<Progress value={optionAPercentage} className="h-2" />
				</div>
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<span className="text-sm sm:text-base font-medium text-muted-foreground">
							Option B
						</span>
						<span className="text-base sm:text-lg font-bold">
							{optionBVotes} ({optionBPercentage.toFixed(1)}%)
						</span>
					</div>
					<Progress value={optionBPercentage} className="h-2" />
				</div>
			</CardContent>
		</Card>
	);
}
