"use client";

import QueryProvider from "@/lib/QueryClient";

/**
 * すべてのプロバイダーをまとめるコンポーネント
 * Server ComponentsとClient Componentsを適切に分離
 */
export function Providers({ children }: { children: React.ReactNode }) {
	return <QueryProvider>{children}</QueryProvider>;
}
