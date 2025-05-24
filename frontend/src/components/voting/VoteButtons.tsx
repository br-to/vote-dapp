import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function VoteButtons() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
			<Button
				size="lg"
				variant="outline"
				className="flex flex-col items-center justify-center gap-3 h-28 sm:h-32 px-5 py-4 hover:scale-105 transition-transform duration-200"
			>
				<ThumbsUp className="text-3xl sm:text-4xl text-primary" size={32} />
				<span className="text-base sm:text-lg font-semibold">
					Vote for Option A
				</span>
			</Button>
			<Button
				size="lg"
				variant="outline"
				className="flex flex-col items-center justify-center gap-3 h-28 sm:h-32 px-5 py-4 hover:scale-105 transition-transform duration-200"
			>
				<ThumbsDown className="text-3xl sm:text-4xl text-primary" size={32} />
				<span className="text-base sm:text-lg font-semibold">
					Vote for Option B
				</span>
			</Button>
		</div>
	);
}
