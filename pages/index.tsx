import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { NFTStorage } from "nft.storage";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [postText, setPostText] = useState("");
  const [status, setStatus] = useState("");
  const [contractAddress, setContractAddress] = useState(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] ?? null);
      });
    }
  }, []);

  async function connectWallet() {
    try {
      if (!window.ethereum) throw new Error("MetaMask not detected");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err: any) {
      setStatus(err.message || "Error connecting wallet");
    }
  }

  async function uploadToIPFSAndPost() {
    if (!postText.trim()) {
      setStatus("Write something first");
      return;
    }
    const apiKey = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY;
    if (!apiKey) {
      setStatus("NFT_STORAGE_API_KEY not configured");
      return;
    }
    setStatus("Uploading to IPFS...");
    try {
      const client = new NFTStorage({ token: apiKey });
      const blob = new Blob([postText], { type: "text/plain" });
      const cid = await client.storeBlob(blob);
      const uri = `ipfs://${cid}`;
      setStatus(`Uploaded. CID=${cid}. Publishing on-chain (optional)...`);
      // Optionally interact with contract here:
      // e.g. call createPost(uri) if contract address provided and wallet connected.
      if (account && contractAddress) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const abi = [
            "function createPost(string calldata contentUri) external returns (uint256)"
          ];
          const contract = new ethers.Contract(contractAddress, abi, signer);
          const tx = await contract.createPost(uri);
          setStatus("Waiting for transaction...");
          await tx.wait();
          setStatus("Post published on-chain!");
        } catch (err: any) {
          console.warn("On-chain publish failed:", err);
          setStatus("Uploaded to IPFS (on-chain publish failed or skipped).");
        }
      } else {
        setStatus("Uploaded to IPFS. Provide CONTRACT_ADDRESS and connect wallet to publish on-chain.");
      }
    } catch (err: any) {
      setStatus("Upload failed: " + (err.message || String(err)));
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Vyb3 — Create a Post</h1>
          <div>
            {account ? (
              <div className="text-sm text-gray-700">Connected: {account.slice(0, 6)}...{account.slice(-4)}</div>
            ) : (
              <button onClick={connectWallet} className="px-3 py-2 bg-indigo-600 text-white rounded">Connect Wallet</button>
            )}
          </div>
        </header>

        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Write your Vyb3 post..."
          className="w-full border rounded p-3 mb-3 min-h-[140px]"
        />

        <div className="flex items-center gap-2">
          <button onClick={uploadToIPFSAndPost} className="px-4 py-2 bg-green-600 text-white rounded">Upload Post</button>
          <input
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="CONTRACT_ADDRESS (optional)"
            className="flex-1 border rounded px-3 py-2"
          />
        </div>

        <div className="mt-4 text-sm text-gray-600">
          {status}
        </div>
      </div>
    </main>
  );
}