import type { Metadata } from "next";
import { Manrope, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const manropse = Manrope({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-manrope",
});
const notSansJP = Noto_Sans_JP({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export const metadata: Metadata = {
	title: "Voting App",
	description: "A simple voting application",
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "Voting App",
		description: "A simple voting application",
		url: "https://voting-app.example.com",
		siteName: "Voting App",
		type: "website",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Voting App Open Graph Image",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Voting App",
		description: "A simple voting application",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`min-h-screen bg-[#111418] text-white ${manropse.variable} ${notSansJP.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
