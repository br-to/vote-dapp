import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import VotingCard from "../components/voting/VotingCard";

export default function Home() {
	return (
		<div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
			<div className="layout-container flex h-full grow flex-col">
				<Header />
				<main className="flex flex-1 justify-center py-8 sm:py-12 px-4 sm:px-6">
					<div className="w-full max-w-2xl">
						<VotingCard />
					</div>
				</main>
				<Footer />
			</div>
		</div>
	);
}
