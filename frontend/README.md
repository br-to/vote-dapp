# Voting DApp Frontend

A decentralized voting application built with Next.js and ethers.js that allows users to vote on blockchain using MetaMask.

## Features

- 🗳️ Decentralized voting on Ethereum blockchain
- 🦊 MetaMask wallet integration
- 🌐 Multi-network support (Localhost, Sepolia, Mainnet)
- ⚡ Real-time vote results
- 🎨 Modern responsive UI with Tailwind CSS
- 🔒 Smart contract interaction with type safety

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MetaMask browser extension
- Running Ethereum node (local Hardhat network or testnet/mainnet access)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Copy environment configuration:

```bash
cp .env.example .env.local
```

3. Update `.env.local` with your contract address:

```bash
NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS=your_contract_address_here
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Multi-Environment Support

The application supports different deployment environments:

- **Local Development**: `npm run dev` (uses `.env.local`)
- **Sepolia Testnet**: `npm run dev:sepolia` (uses `.env.sepolia`)
- **Production Build**: `npm run build:production` (uses `.env.production`)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed environment configuration.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/
│   ├── layout/            # Header, footer, wallet components
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   └── voting/            # Voting-specific components
├── hooks/                 # React hooks for blockchain interaction
├── lib/                   # Utility libraries
├── types/                 # TypeScript type definitions
└── utils/                 # Contract configuration and utilities
```

## Environment Variables

| Variable                              | Description                      | Required |
| ------------------------------------- | -------------------------------- | -------- |
| `NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS` | Deployed voting contract address | Yes      |
| `NEXT_PUBLIC_NETWORK_NAME`            | Network display name             | Yes      |
| `NEXT_PUBLIC_CHAIN_ID`                | Network chain ID for validation  | Yes      |
| `NEXT_PUBLIC_RPC_URL`                 | Custom RPC endpoint              | No       |

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Blockchain**: ethers.js v6, TypeChain for type generation
- **State Management**: TanStack Query (React Query)
- **Development**: Biome (linting/formatting), ESLint

## Scripts

```bash
npm run dev              # Start development server
npm run dev:sepolia      # Start with Sepolia testnet config
npm run build            # Build for production
npm run build:sepolia    # Build with Sepolia config
npm run build:production # Build with mainnet config
npm run lint             # Run linter
npm run format           # Format code
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
