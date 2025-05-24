import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

type VoteStatusProps = {
	hasVoted: boolean;
};

export default function VoteStatus({ hasVoted }: VoteStatusProps) {
	if (!hasVoted) return null;

	return (
		<div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
			<CheckCircle className="text-primary" size={24} />
			<div className="flex-1">
				<Badge variant="secondary" className="mb-1">
					Vote Recorded
				</Badge>
				<p className="text-sm text-muted-foreground">
					You have already voted on this proposal. Your vote has been recorded.
				</p>
			</div>
		</div>
	);
}
