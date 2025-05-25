import { Badge } from "@/components/ui/badge";
import { useVotingContract } from "@/hooks/useVotingContract";
import { useWallet } from "@/hooks/useWallet";
import { CheckCircle, Loader2 } from "lucide-react";

export default function VoteStatus() {
	const { isConnected } = useWallet();
	const { hasVoted, isLoadingVoteStatus } = useVotingContract();

	if (!isConnected) return null;

	if (isLoadingVoteStatus) {
		return (
			<div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-600">
				<Loader2 className="animate-spin text-gray-400" size={20} />
				<p className="text-sm text-gray-400">Checking vote status...</p>
			</div>
		);
	}

	if (!hasVoted) return null;

	return (
		<div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
			<CheckCircle className="text-primary" size={24} />
			<div className="flex-1">
				<Badge
					variant="secondary"
					className="mb-1 bg-primary text-primary-foreground"
				>
					Vote Completed
				</Badge>
				<p className="text-sm text-gray-400">
					Your vote has been successfully recorded on the blockchain. Thank you
					for participating!
				</p>
			</div>
		</div>
	);
}
