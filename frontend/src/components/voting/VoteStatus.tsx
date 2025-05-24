type VoteStatusProps = {
	hasVoted: boolean;
};

export default function VoteStatus({ hasVoted }: VoteStatusProps) {
	if (!hasVoted) return null;

	return (
		<div className="flex items-center gap-3 bg-[#293038] p-4 rounded-lg">
			<span className="material-symbols-outlined text-2xl text-[#1978e5]">
				verified_user
			</span>
			<p className="text-[#b0bac9] text-sm sm:text-base">
				You have already voted on this proposal. Your vote has been recorded.
			</p>
		</div>
	);
}
