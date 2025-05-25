"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

/**
 * React Query用のプロバイダーコンポーネント
 * アプリケーション全体でクエリの状態を管理
 */
export default function QueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	// QueryClientを状態で管理（SSRとの互換性のため）
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// ステール時間を30秒に設定
						staleTime: 30 * 1000,
						// キャッシュ時間を5分に設定
						gcTime: 5 * 60 * 1000,
						// エラー時の再試行回数
						retry: 2,
						// バックグラウンドでの再取得を有効化
						refetchOnWindowFocus: true,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{/* 開発環境でのみDevtoolsを表示 */}
			{process.env.NODE_ENV === "development" && (
				<ReactQueryDevtools initialIsOpen={false} />
			)}
		</QueryClientProvider>
	);
}
