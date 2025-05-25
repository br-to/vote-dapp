"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MetaMaskInstallAlertProps {
	isOpen: boolean;
	onClose: () => void;
}

export const MetaMaskInstallAlert = ({
	isOpen,
	onClose,
}: MetaMaskInstallAlertProps) => {
	const handleInstallClick = () => {
		// MetaMaskの公式サイトを新しいタブで開く
		window.open(
			"https://metamask.io/download/",
			"_blank",
			"noopener,noreferrer",
		);
		onClose();
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>MetaMask Required</AlertDialogTitle>
					<AlertDialogDescription className="space-y-2">
						<p>
							To use this application, you need to install the MetaMask wallet.
						</p>
						<p>
							MetaMask is a browser extension that allows you to securely
							interact with the Ethereum blockchain.
						</p>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="gap-2">
					<AlertDialogAction
						onClick={handleInstallClick}
						className="bg-orange-500 hover:bg-orange-600"
					>
						Install MetaMask
					</AlertDialogAction>
					<AlertDialogAction
						onClick={onClose}
						className="bg-gray-200 hover:bg-gray-300"
					>
						Later
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
