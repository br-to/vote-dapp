import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import VoteButtons from "./VoteButtons";
import VoteResults from "./VoteResults";
import VoteStatus from "./VoteStatus";

type VotingCardProps = {
	optionAVotes?: number;
	optionBVotes?: number;
	hasVoted?: boolean;
};

export default function VotingCard({
	optionAVotes = 123,
	optionBVotes = 456,
	hasVoted = true,
}: VotingCardProps) {
	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl sm:text-3xl">
					Vote on the Proposal
				</CardTitle>
				<CardDescription className="text-sm sm:text-base">
					Cast your vote for the current proposal. Your vote will be securely
					recorded on the blockchain.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<VoteButtons />
				<VoteResults optionAVotes={optionAVotes} optionBVotes={optionBVotes} />
				<VoteStatus hasVoted={hasVoted} />
			</CardContent>
		</Card>
	);
}
