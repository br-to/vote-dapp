import { Button } from "@/components/ui/button";
import { useVotingContract } from "@/hooks/useVotingContract";
import { useWallet } from "@/hooks/useWallet";
import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function VoteButtons() {
	const { isConnected } = useWallet();
	const { vote, isVoting, hasVoted, txHash, error, getErrorMessage } =
		useVotingContract();
	const [showError, setShowError] = useState(false);

	const handleVote = async (option: "A" | "B") => {
		try {
			setShowError(false);
			await vote(option);
		} catch (err) {
			setShowError(true);
			// Hide error message after 3 seconds
			setTimeout(() => setShowError(false), 3000);
		}
	};

	// Wallet not connected case
	if (!isConnected) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-400 mb-4">Please connect your wallet to vote</p>
			</div>
		);
	}

	// Already voted case
	if (hasVoted) {
		return (
			<div className="text-center py-8">
				<p className="text-green-400 mb-4">
					Vote completed! Thank you for participating.
				</p>
				<p className="text-gray-400 text-sm">
					Each wallet address can only vote once
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{showError && error && (
				<div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded">
					{getErrorMessage(error)}
				</div>
			)}
			{txHash && (
				<div className="bg-blue-500/20 border border-blue-500 text-blue-200 px-4 py-3 rounded">
					<p className="text-sm">Sending transaction...</p>
					<p className="text-xs break-all">TX: {txHash}</p>
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
				<Button
					size="lg"
					onClick={() => handleVote("A")}
					disabled={isVoting || hasVoted}
					className="flex flex-col items-center justify-center gap-3 h-28 sm:h-32 px-5 py-4 bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
				>
					{isVoting ? (
						<Loader2 className="animate-spin" size={32} />
					) : (
						<ThumbsUp className="text-primary-foreground" size={32} />
					)}
					<span className="text-base sm:text-lg font-semibold">
						{isVoting ? "Voting..." : "Option A"}
					</span>
				</Button>
				<Button
					size="lg"
					variant="outline"
					onClick={() => handleVote("B")}
					disabled={isVoting || hasVoted}
					className="flex flex-col items-center justify-center gap-3 h-28 sm:h-32 px-5 py-4 border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
				>
					{isVoting ? (
						<Loader2 className="animate-spin" size={32} />
					) : (
						<ThumbsDown className="text-gray-300" size={32} />
					)}
					<span className="text-base sm:text-lg font-semibold">
						{isVoting ? "Voting..." : "Option B"}
					</span>
				</Button>
			</div>
		</div>
	);
}
