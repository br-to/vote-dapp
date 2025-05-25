import { useState } from "react";
import { getNetworkConfig } from "../../utils/contract";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface NetworkSwitchPromptProps {
	onNetworkSwitch?: () => void;
}

export const NetworkSwitchPrompt: React.FC<NetworkSwitchPromptProps> = ({
	onNetworkSwitch,
}) => {
	const [isSwitching, setIsSwitching] = useState(false);
	const config = getNetworkConfig();

	const handleSwitchNetwork = async () => {
		if (!window.ethereum) {
			alert("MetaMask is not installed");
			return;
		}

		setIsSwitching(true);

		try {
			// Convert chain ID to hex
			const chainIdHex = `0x${config.chainId.toString(16)}`;

			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: chainIdHex }],
			});

			onNetworkSwitch?.();
		} catch (error: unknown) {
			// Handle the case where the network needs to be added to MetaMask
			if (
				error &&
				typeof error === "object" &&
				"code" in error &&
				error.code === 4902
			) {
				try {
					await window.ethereum.request({
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: `0x${config.chainId.toString(16)}`,
								chainName: config.networkName,
								rpcUrls: config.rpcUrl ? [config.rpcUrl] : [],
							},
						],
					});
					onNetworkSwitch?.();
				} catch (addError) {
					console.error("Failed to add network:", addError);
					alert("Failed to add network to MetaMask");
				}
			} else {
				console.error("Failed to switch network:", error);
				alert("Failed to switch network");
			}
		} finally {
			setIsSwitching(false);
		}
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Network Switch Required</CardTitle>
				<CardDescription>
					Please switch to {config.networkName} to use this application.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-sm text-gray-600">
					<p>
						<strong>Required Network:</strong> {config.networkName}
					</p>
					<p>
						<strong>Chain ID:</strong> {config.chainId}
					</p>
				</div>
				<Button
					onClick={handleSwitchNetwork}
					disabled={isSwitching}
					className="w-full"
				>
					{isSwitching ? "Switching..." : "Switch Network"}
				</Button>
			</CardContent>
		</Card>
	);
};
