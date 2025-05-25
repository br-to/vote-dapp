import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

/**
 * ウォレットアカウント情報を取得する関数
 */
const getWalletAccounts = async (): Promise<string[]> => {
	if (!window.ethereum) {
		return [];
	}

	try {
		const accounts = (await window.ethereum.request({
			method: "eth_accounts",
		})) as string[];
		return accounts;
	} catch (error) {
		return [];
	}
};

/**
 * ウォレット接続を管理するカスタムフック
 */
export const useWallet = () => {
	const [isConnecting, setIsConnecting] = useState(false);
	const [showMetaMaskAlert, setShowMetaMaskAlert] = useState(false);
	const queryClient = useQueryClient();

	// ウォレットアカウント情報をクエリで管理
	const {
		data: accounts = [],
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ["wallet", "accounts"],
		queryFn: getWalletAccounts,
		// 30秒間キャッシュ
		staleTime: 30 * 1000,
		// バックグラウンドで5分ごとに更新
		refetchInterval: 5 * 60 * 1000,
		// ウィンドウフォーカス時に再取得
		refetchOnWindowFocus: true,
		// エラー時に3回まで再試行
		retry: 3,
	});

	// 最初のアカウントを取得
	const account = accounts.length > 0 ? accounts[0] : null;
	const isConnected = !!account;
	// 初期化が完了したかどうか
	const isInitialized = isSuccess;

	/**
	 * ウォレットに接続し、ユーザーのアカウントアドレスを取得する
	 * @returns Promise<string | undefined> - 接続されたアカウントのアドレス
	 * @throws Error - ウォレットがインストールされていない、またはユーザーが接続を拒否した場合
	 */
	const connectWallet = async (): Promise<string | undefined> => {
		// MetaMaskがインストールされていない場合はアラートを表示
		if (!window.ethereum) {
			setShowMetaMaskAlert(true);
			const error = new Error("MetaMask is not installed");
			throw error;
		}

		setIsConnecting(true);

		try {
			// ユーザーにアカウントへのアクセス許可を要求
			const accounts = (await window.ethereum.request({
				method: "eth_requestAccounts",
			})) as string[];

			// キャッシュを無効化して最新データを取得
			await queryClient.invalidateQueries({
				queryKey: ["wallet", "accounts"],
			});

			const connectedAccount = accounts[0];
			return connectedAccount;
		} catch (error) {
			// 接続エラーをログに記録し、エラーを再スロー
			console.error("Error connecting to wallet:", error);
			throw error;
		} finally {
			setIsConnecting(false);
		}
	};

	/**
	 * ウォレット接続を切断する
	 */
	const disconnectWallet = () => {
		// キャッシュをクリアして空の配列を設定
		queryClient.setQueryData(["wallet", "accounts"], []);
		// Note: MetaMaskは実際の切断APIを提供していないため、
		// クライアント側の状態のみをリセットします
	};

	/**
	 * アドレスを短縮表示用にフォーマットする
	 * @param address - Ethereumアドレス
	 * @returns 短縮されたアドレス（例: 0x1234...5678）
	 */
	const formatAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	// MetaMaskのアカウント変更イベントリスナーの設定
	// （useQueryが自動的に再フェッチするため、useEffectは不要）
	if (typeof window !== "undefined" && window.ethereum) {
		// アカウント変更時にキャッシュを無効化
		const handleAccountsChanged = () => {
			queryClient.invalidateQueries({
				queryKey: ["wallet", "accounts"],
			});
		};

		// 既存のリスナーを削除してから新しいリスナーを追加（重複防止）
		window.ethereum.removeAllListeners?.("accountsChanged");
		window.ethereum.on?.("accountsChanged", handleAccountsChanged);
	}

	return {
		account,
		isConnecting,
		isConnected,
		isLoading,
		isInitialized,
		connectWallet,
		disconnectWallet,
		formatAddress,
		showMetaMaskAlert,
		setShowMetaMaskAlert,
	};
};
