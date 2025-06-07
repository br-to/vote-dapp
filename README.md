# Vote DApp

分散型投票アプリケーション（DApp）- Ethereum 上で動作するブロックチェーンベースの投票システム

## 概要

Vote DApp は、Ethereum blockchain 上に構築された分散型投票アプリケーションです。ユーザーは MetaMask を使用して Ethereum ネットワークに接続し、透明性のある投票を行うことができます。

## 特徴

- ✅ **分散型**: Ethereum ブロックチェーン上で動作
- ✅ **透明性**: すべての投票は公開され、検証可能
- ✅ **セキュア**: スマートコントラクトによる投票の管理
- ✅ **モダン UI**: Next.js + TailwindCSS による美しいインターフェース
- ✅ **リアルタイム更新**: 投票結果のリアルタイム表示
- ✅ **MetaMask 統合**: ウォレット接続とトランザクション管理

## 技術スタック

### Backend

- **Solidity**: スマートコントラクト開発
- **Hardhat**: 開発環境とデプロイメント

### Frontend

- **Next.js 15**: React フレームワーク
- **TypeScript**: 型安全性
- **TailwindCSS**: スタイリング
- **Shadcn/ui**: UI コンポーネント
- **TanStack Query**: データフェッチング

### Blockchain

- **Ethereum**: メインネットワーク
- **Sepolia**: テストネットワーク

## プロジェクト構造

```
vote-dapp/
├── contracts/              # Solidityスマートコントラクト
│   └── Voting.sol
├── frontend/               # Next.jsフロントエンド
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # Reactコンポーネント
│   │   ├── hooks/         # カスタムフック
│   │   ├── types/         # TypeScript型定義
│   │   └── utils/         # ユーティリティ関数
│   └── package.json
├── ignition/              # デプロイメント設定
├── test/                  # スマートコントラクトテスト
├── typechain-types/       # 生成された型定義
├── hardhat.config.ts      # Hardhat設定
└── package.json
```

## セットアップ

### 前提条件

- Node.js (v18 以降)
- npm または yarn
- MetaMask ブラウザ拡張機能
- Ethereum テストネット用の ETH (Sepolia)

### インストール

1. リポジトリをクローン

```bash
git clone https://github.com/br-to/vote-dapp.git
cd vote-dapp
```

2. 依存関係をインストール

```bash
# ルートディレクトリ
npm install

# フロントエンド
cd frontend
npm install
cd ..
```

3. 環境変数を設定

```bash
# .env ファイルを作成
cp .env.example .env
```

`.env` ファイルに以下を設定:

```
INFURA_API_KEY=your_infura_api_key
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### デプロイメント

1. スマートコントラクトをコンパイル

```bash
npx hardhat compile
```

2. テストネット（Sepolia）にデプロイ

```bash
npx hardhat ignition deploy ./ignition/modules/Voting.ts --network sepolia
```

3. フロントエンド設定を更新
   デプロイされたコントラクトアドレスを `frontend/.env.local` の `NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS` に設定

### 開発サーバー起動

1. フロントエンド開発サーバー

```bash
cd frontend
npm run dev
```

2. ローカルブロックチェーン（開発用）

```bash
npx hardhat node
```

## 使用方法

1. **ウォレット接続**: MetaMask で Ethereum ネットワークに接続
2. **投票**: 投票ページで候補者を選択して投票
3. **結果確認**: 結果ページでリアルタイムの投票結果を確認

## テスト

スマートコントラクトのテストを実行:

```bash
npx hardhat test
```

フロントエンドのテスト:

```bash
cd frontend
npm test
```

## デプロイメント

### Vercel (フロントエンド)

1. GitHub リポジトリを Vercel に接続
2. 環境変数を設定
3. デプロイ
