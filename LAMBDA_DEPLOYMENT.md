# Lambda API デプロイ手順

## 前提条件
- AWS CLI設定済み
- Node.js 18以上
- pnpm

## セットアップ

### 1. 依存関係インストール
```bash
cd packages/server
pnpm install
```

### 2. 環境変数設定
```bash
cp .env.example .env
# .envファイルを編集
```

### 3. データベース設定（RDS推奨）
```bash
# Prismaマイグレーション
pnpm exec prisma migrate deploy
pnpm exec prisma generate
```

### 4. ローカルテスト
```bash
# Lambda環境でテスト
pnpm run dev:lambda

# 通常のExpressサーバーでテスト
pnpm run dev
```

### 5. デプロイ
```bash
# 本番デプロイ
pnpm run deploy

# ステージング環境
serverless deploy --stage staging
```

## API エンドポイント
デプロイ後、以下のようなURLが生成されます：
- `https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/api/`
- `https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/health`

## フロントエンドとの連携
1. API URLをフロントエンドの環境変数に設定
2. CORS設定でフロントエンドドメインを許可
3. Amplify環境変数にAPI_URLを追加

## 監視・ログ
- CloudWatch Logsでログ確認
- X-Rayでトレーシング（オプション）