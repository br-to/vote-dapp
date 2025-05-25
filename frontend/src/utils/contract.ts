/**
 * 異なる環境でのコントラクト設定
 */

export type ContractConfig = {
	address: string;
	networkName: string;
	chainId: number;
	rpcUrl?: string;
};

/**
 * 環境変数からコントラクトアドレスを取得
 */
export const getContractAddress = (): string => {
	const address = process.env.NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS;

	if (!address) {
		throw new Error("address is not set in environment variables");
	}

	return address;
};

/**
 * 環境変数からネットワーク設定を取得
 */
export const getNetworkConfig = (): ContractConfig => {
	const address = getContractAddress();
	const networkName = process.env.NEXT_PUBLIC_NETWORK_NAME || "localhost";
	const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 31337;
	const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

	return {
		address,
		networkName,
		chainId,
		rpcUrl,
	};
};

/**
 * 事前定義されたネットワーク設定
 */
export const NETWORK_CONFIGS: Record<string, Partial<ContractConfig>> = {
	localhost: {
		networkName: "Localhost",
		chainId: 31337,
		rpcUrl: "http://127.0.0.1:8545",
	},
	sepolia: {
		networkName: "Sepolia Testnet",
		chainId: 11155111,
	},
	mainnet: {
		networkName: "Ethereum Mainnet",
		chainId: 1,
	},
};

/**
 * 現在のネットワークが期待される設定と一致するかを検証
 */
export const validateNetwork = async (provider: {
	getNetwork: () => Promise<{ chainId: string | number }>;
}): Promise<boolean> => {
	try {
		const network = await provider.getNetwork();
		const expectedChainId = getNetworkConfig().chainId;

		return Number(network.chainId) === expectedChainId;
	} catch (error) {
		console.error("Failed to validate network:", error);
		return false;
	}
};
