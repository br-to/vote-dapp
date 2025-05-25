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

export default function VotingCard() {
	return (
		<Card className="bg-[#1a1f26] border-gray-700 w-full max-w-2xl mx-auto">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl sm:text-3xl text-white">
					Voting System
				</CardTitle>
				<CardDescription className="text-sm sm:text-base text-gray-400">
					Please choose between Option A or Option B. Your vote will be recorded
					on the blockchain and cannot be changed.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<VoteButtons />
				<VoteResults />
				<VoteStatus />
			</CardContent>
		</Card>
	);
}
