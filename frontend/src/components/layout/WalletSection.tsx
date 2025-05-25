import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { LogOut, Wallet } from "lucide-react";

// ローディング状態のコンポーネント
function WalletLoading() {
	return (
		<div className="w-[100px] h-9 flex items-center justify-center">
			<div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
		</div>
	);
}

// 接続済み状態のコンポーネント
function WalletConnected({
	account,
	formatAddress,
	disconnectWallet,
}: {
	account: string;
	formatAddress: (address: string) => string;
	disconnectWallet: () => void;
}) {
	return (
		<div className="flex items-center gap-2 sm:gap-3">
			<span className="text-sm text-gray-300 hidden sm:inline">
				{formatAddress(account)}
			</span>
			<Button
				variant="outline"
				size="sm"
				className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-800"
				onClick={disconnectWallet}
			>
				<LogOut size={16} />
				<span className="hidden sm:inline">Disconnect</span>
				<span className="sm:hidden">Disconnect</span>
			</Button>
		</div>
	);
}

// 未接続状態のコンポーネント
function WalletDisconnected({
	isConnecting,
	connectWallet,
}: {
	isConnecting: boolean;
	connectWallet: () => Promise<string | undefined>;
}) {
	return (
		<Button
			className="gap-2 bg-primary hover:bg-primary/80 text-primary-foreground"
			onClick={connectWallet}
			disabled={isConnecting}
		>
			<Wallet size={20} />
			<span className="hidden sm:inline">
				{isConnecting ? "Connecting..." : "Connect Wallet"}
			</span>
			<span className="sm:hidden">
				{isConnecting ? "Connecting..." : "Connect"}
			</span>
		</Button>
	);
}

// ウォレット状態を管理するメインコンポーネント
export default function WalletSection() {
	const {
		account,
		isConnecting,
		isConnected,
		isInitialized,
		connectWallet,
		disconnectWallet,
		formatAddress,
	} = useWallet();

	// 初期化前
	if (!isInitialized) {
		return <WalletLoading />;
	}

	// 接続済み
	if (isConnected && account) {
		return (
			<WalletConnected
				account={account}
				formatAddress={formatAddress}
				disconnectWallet={disconnectWallet}
			/>
		);
	}

	// 未接続
	return (
		<WalletDisconnected
			isConnecting={isConnecting}
			connectWallet={connectWallet}
		/>
	);
}
