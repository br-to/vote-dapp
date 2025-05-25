import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function VoteButtons() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
			<Button
				size="lg"
				className="flex flex-col items-center justify-center gap-3 h-28 sm:h-32 px-5 py-4 bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-200 hover:scale-105"
			>
				<ThumbsUp className="text-primary-foreground" size={32} />
				<span className="text-base sm:text-lg font-semibold">Vote Yes</span>
			</Button>
			<Button
				size="lg"
				variant="outline"
				className="flex flex-col items-center justify-center gap-3 h-28 sm:h-32 px-5 py-4 border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-200 hover:scale-105"
			>
				<ThumbsDown className="text-gray-300" size={32} />
				<span className="text-base sm:text-lg font-semibold">Vote No</span>
			</Button>
		</div>
	);
}
