import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useState } from "react";
import type { Voting } from "../types/voting/Voting";

import {
	getContractAddress,
	getNetworkConfig,
	validateNetwork,
} from "../utils/contract";
import { useWallet } from "./useWallet";

// コントラクトABI
// TODO: scriptで自動生成するようにする
const VOTING_ABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "voter",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "option",
				type: "string",
			},
		],
		name: "Voted",
		type: "event",
	},
	{
		inputs: [],
		name: "getAllVotes",
		outputs: [
			{
				internalType: "uint256",
				name: "votesA",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "votesB",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "option",
				type: "string",
			},
		],
		name: "getVotes",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "hasVoted",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "options",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "option",
				type: "string",
			},
		],
		name: "vote",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

/**
 * 投票コントラクトとのやり取りを管理するカスタムフック
 */
export const useVotingContract = () => {
	const { account, isConnected } = useWallet();
	const queryClient = useQueryClient();
	const [txHash, setTxHash] = useState<string | null>(null);

	/**
	 * コントラクトインスタンスを取得
	 */
	const getContract = async (withSigner = false): Promise<Voting> => {
		if (!window.ethereum) {
			throw new Error("MetaMask is not installed");
		}

		const provider = new ethers.BrowserProvider(window.ethereum);
		const contractAddress = getContractAddress();

		// ネットワーク設定を検証
		const network = await provider.getNetwork();
		const isValidNetwork = await validateNetwork({
			getNetwork: () => Promise.resolve({ chainId: Number(network.chainId) }),
		});
		if (!isValidNetwork) {
			const config = getNetworkConfig();
			throw new Error(
				`Please switch to ${config.networkName} (Chain ID: ${config.chainId})`,
			);
		}

		if (withSigner) {
			const signer = await provider.getSigner();
			return new ethers.Contract(
				contractAddress,
				VOTING_ABI,
				signer,
			) as unknown as Voting;
		}

		return new ethers.Contract(
			contractAddress,
			VOTING_ABI,
			provider,
		) as unknown as Voting;
	};

	/**
	 * 投票結果を取得
	 */
	const {
		data: votingResults,
		isLoading: isLoadingResults,
		error: resultsError,
	} = useQuery({
		queryKey: ["voting", "results"],
		queryFn: async () => {
			const contract = await getContract();
			const [votesA, votesB] = await contract.getAllVotes();
			return {
				votesA: Number(votesA),
				votesB: Number(votesB),
				totalVotes: Number(votesA) + Number(votesB),
			};
		},
		// ウィンドウがフォーカスされた時に再取得
		refetchOnWindowFocus: true,
	});

	/**
	 * ユーザーの投票状況を取得
	 */
	const { data: hasVoted, isLoading: isLoadingVoteStatus } = useQuery({
		queryKey: ["voting", "hasVoted", account],
		queryFn: async () => {
			if (!account) return false;
			const contract = await getContract();
			return await contract.hasVoted(account);
		},
		enabled: !!account && isConnected,
		// 投票状況は頻繁に変わらないため、長めのキャッシュ時間を設定
		staleTime: 30 * 1000,
	});

	/**
	 * 投票実行のミューテーション
	 */
	const voteMutation = useMutation({
		mutationFn: async (option: "A" | "B") => {
			if (!isConnected || !account) {
				throw new Error("Wallet not connected");
			}

			const contract = await getContract(true);
			const tx = await contract.vote(option);
			setTxHash(tx.hash);

			// トランザクションの完了を待機
			const receipt = await tx.wait();
			return { receipt, option };
		},
		onSuccess: (data) => {
			// 投票成功後、関連するクエリを無効化して再取得
			queryClient.invalidateQueries({ queryKey: ["voting", "results"] });
			queryClient.invalidateQueries({
				queryKey: ["voting", "hasVoted", account],
			});
		},
		onError: (error) => {
			setTxHash(null);
		},
		onSettled: () => {
			// 完了後（成功・失敗問わず）トランザクションハッシュをクリア
			setTimeout(() => setTxHash(null), 3000);
		},
	});

	/**
	 * 投票用の関数
	 * @param option - 投票するオプション ("A" または "B")
	 * @returns Promise<void>
	 */
	const vote = async (option: "A" | "B") => {
		return voteMutation.mutateAsync(option);
	};

	/**
	 * エラーメッセージを解析してユーザーフレンドリーなメッセージに変換
	 */
	const getErrorMessage = (error: unknown): string => {
		const errorObj = error as { reason?: string; message?: string };

		if (errorObj?.reason) {
			switch (errorObj.reason) {
				case "Already voted":
					return "already voted";
				case "Invalid option":
					return "invalid option";
				default:
					return errorObj.reason;
			}
		}

		if (errorObj?.message?.includes("user rejected")) {
			return "Transaction was rejected by the user";
		}

		if (errorObj?.message?.includes("insufficient funds")) {
			return "Insufficient funds for gas * price + value";
		}

		console.log("Unexpected error:", error);

		return "An unexpected error occurred. Please try again later.";
	};

	return {
		// 投票データ
		votingResults,
		hasVoted: hasVoted || false,
		// ローディング状態
		isLoadingResults,
		isLoadingVoteStatus,
		isVoting: voteMutation.isPending,
		// 投票実行
		vote,
		// トランザクション情報
		txHash,
		// エラー情報
		error: voteMutation.error || resultsError,
		getErrorMessage,
		// ステータス
		isConnected,
		account,
	};
};
