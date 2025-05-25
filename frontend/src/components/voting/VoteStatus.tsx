import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

type VoteStatusProps = {
	hasVoted: boolean;
};

export default function VoteStatus({ hasVoted }: VoteStatusProps) {
	if (!hasVoted) return null;

	return (
		<div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
			<CheckCircle className="text-primary" size={24} />
			<div className="flex-1">
				<Badge
					variant="secondary"
					className="mb-1 bg-primary text-primary-foreground"
				>
					Vote Recorded
				</Badge>
				<p className="text-sm text-gray-400">
					Your vote has been successfully recorded on the blockchain. Thank you
					for participating!
				</p>
			</div>
		</div>
	);
}
