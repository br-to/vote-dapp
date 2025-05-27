# Cloudflare Pagesデプロイ手順

このドキュメントでは、Vote DAppをCloudflare Pagesにデプロイする手順を説明します。

## 前提条件

1. Cloudflareアカウントを持っていること
2. Cloudflare Wranglerがインストールされていること (`npm install -g wrangler`)
3. Githubアカウントと連携していること（GitHubからの自動デプロイを使用する場合）

## デプロイ方法

### 手動デプロイ

1. 環境変数の設定
   ```bash
   # .env.cloudflare.example をコピーして .env.cloudflare を作成
   cp .env.cloudflare.example .env.cloudflare
   
   # 環境変数を実際の値に編集
   # Sepoliaテストネット用のコントラクトアドレスとRPC URLを設定
   ```

2. Cloudflare用にビルドとデプロイ
   ```bash
   # Cloudflare向けにビルド
   npm run build:cloudflare
   
   # Cloudflare Pagesにデプロイ（初回）
   npx wrangler pages project create vote-dapp
   
   # デプロイ
   npm run deploy:cloudflare
   ```

### GitHubからの自動デプロイ（推奨）

1. Cloudflare Dashboardにログイン
2. 「Pages」→「Create a project」→「Connect to Git」を選択
3. GitHubからリポジトリ「vote-dapp」を選択
4. ビルド設定:
   - Framework preset: Next.js
   - Build command: `cd frontend && npm ci && npm run build:cloudflare`
   - Build output directory: `frontend/.next`
   - Root directory: `/`
5. 環境変数の設定:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`: Sepoliaにデプロイしたコントラクトアドレス
   - `NEXT_PUBLIC_CHAIN_ID`: `11155111` (Sepolia)
   - `NEXT_PUBLIC_RPC_URL`: AlchemyなどのRPC URL
   - `NEXT_PUBLIC_APP_NAME`: Vote DApp
6. 「Save and Deploy」をクリック

## カスタムドメイン設定

1. Cloudflare Dashboardで、デプロイしたプロジェクトを選択
2. 「Custom domains」→「Set up a custom domain」をクリック
3. 使用したいドメインを入力し、DNS設定を行う
4. SSL/TLS設定は「Full」を推奨

## 環境変数の管理

Cloudflare Pagesでの環境変数は以下の方法で管理できます：

1. 本番環境（Production）とプレビュー環境（Preview）で別々に設定可能
2. ダッシュボードから「Settings」→「Environment variables」で設定
3. 機密情報はCloudflare環境変数として設定し、コードリポジトリには含めないこと

## トラブルシューティング

1. ビルドエラーが発生した場合：
   - ビルドログを確認
   - Node.jsバージョンが互換性があるか確認（`wrangler.toml`の`NODE_VERSION`設定）

2. ルーティングの問題：
   - `_routes.json`ファイルを確認・調整
   - Cloudflareダッシュボードで「Functions」→「Routes」を確認

3. 環境変数の問題：
   - 環境変数が正しく設定されているか確認
   - ビルド時とランタイム時の環境変数の区別を理解する

## パフォーマンス最適化

Cloudflare Pagesは以下の機能を提供しています：

1. グローバルCDN - コンテンツを世界中のエッジサーバーからユーザーに配信
2. 自動HTTPS - すべてのページでSSL/TLSを自動的に有効化
3. 画像最適化 - Cloudflare Imagesで画像配信を最適化可能

これらの機能を活用することで、最高のパフォーマンスを実現できます。
