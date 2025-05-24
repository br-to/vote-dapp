export default function VoteButtons() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
			<button
				type="button"
				className="flex flex-col items-center justify-center gap-3 rounded-lg h-28 sm:h-32 px-5 py-4 bg-[#293038] hover:bg-[#363f4a] text-white text-base sm:text-lg font-semibold leading-normal tracking-[0.015em] transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1978e5] focus:ring-offset-2 focus:ring-offset-[#1a1f24]"
			>
				<span className="material-symbols-outlined text-3xl sm:text-4xl text-[#1978e5]">
					thumb_up
				</span>
				<span className="truncate">Vote for Option A</span>
			</button>
			<button
				type="button"
				className="flex flex-col items-center justify-center gap-3 rounded-lg h-28 sm:h-32 px-5 py-4 bg-[#293038] hover:bg-[#363f4a] text-white text-base sm:text-lg font-semibold leading-normal tracking-[0.015em] transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1978e5] focus:ring-offset-2 focus:ring-offset-[#1a1f24]"
			>
				<span className="material-symbols-outlined text-3xl sm:text-4xl text-[#1978e5]">
					thumb_down
				</span>
				<span className="truncate">Vote for Option B</span>
			</button>
		</div>
	);
}
