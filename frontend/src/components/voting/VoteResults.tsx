type VoteResultsProps = {
	optionAVotes: number;
	optionBVotes: number;
};

export default function VoteResults({
	optionAVotes,
	optionBVotes,
}: VoteResultsProps) {
	return (
		<div className="bg-[#293038] p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
			<h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-tight">
				Current Vote Counts
			</h3>
			<div className="space-y-3">
				<div className="flex justify-between items-center gap-x-4 py-2 border-b border-[#363f4a] last:border-b-0">
					<p className="text-[#b0bac9] text-sm sm:text-base font-medium">
						Option A
					</p>
					<p className="text-white text-base sm:text-lg font-bold text-right">
						{optionAVotes}
					</p>
				</div>
				<div className="flex justify-between items-center gap-x-4 py-2">
					<p className="text-[#b0bac9] text-sm sm:text-base font-medium">
						Option B
					</p>
					<p className="text-white text-base sm:text-lg font-bold text-right">
						{optionBVotes}
					</p>
				</div>
			</div>
		</div>
	);
}
