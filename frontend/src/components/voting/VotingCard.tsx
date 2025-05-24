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
		<div className="bg-[#1a1f24] p-6 sm:p-8 rounded-xl shadow-2xl">
			<h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 tracking-tight">
				Vote on the Proposal
			</h2>
			<p className="text-[#b0bac9] text-sm sm:text-base text-center mb-6 sm:mb-8">
				Cast your vote for the current proposal. Your vote will be securely
				recorded on the blockchain.
			</p>

			<VoteButtons />
			<VoteResults optionAVotes={optionAVotes} optionBVotes={optionBVotes} />
			<VoteStatus hasVoted={hasVoted} />
		</div>
	);
}
