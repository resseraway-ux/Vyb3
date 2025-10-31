````markdown
```markdown
# Vyb3 — Web3 Social Platform (Starter)

This repository is a Next.js + TypeScript starter for Vyb3 with:
- Wallet connect (Ethers + MetaMask)
- IPFS upload for posts using nft.storage
- Smart contract scaffolding using Hardhat (Vyb3Posts.sol)
- Tailwind CSS
- Ready for Vercel import

Quick local setup
1. Install dependencies
   - npm install

2. Create environment variables (see .env.example)
   - NEXT_PUBLIC_NFT_STORAGE_KEY — required for IPFS uploads
   - NEXT_PUBLIC_RPC_URL — optional read RPC
   - PRIVATE_KEY — for deploying contracts via Hardhat (local/deploy)

3. Start dev
   - npm run dev
   - App: http://localhost:3000

Smart contract
- Contract: contracts/Vyb3Posts.sol
- Deploy locally:
  - Start a local node: `npx hardhat node`
  - Deploy: `npm run deploy:local`

Vercel deploy
1. Import this repository in Vercel.
2. Add the following Environment Variables in your Vercel project (Production & Preview as needed):
   - NEXT_PUBLIC_NFT_STORAGE_KEY — your nft.storage API key
   - NEXT_PUBLIC_RPC_URL — optional
   - NEXT_PUBLIC_CONTRACT_ADDRESS — if you deployed the contract (optional)
3. Vercel auto-detects Next.js. Build command: `npm run build`. (You can leave defaults.)

Notes
- This is a starter template. Extend the UI, integrate a real contract flow for creating posts on-chain, and add moderation and storage choices as needed.
- For production, use a secure secret manager and rotate keys. Never commit PRIVATE_KEY to the repo.
```
```