import React from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function ConnectWallet({ onConnect }: { onConnect?: (acc: string) => void }) {
  async function connect() {
    if (!window.ethereum) {
      alert("Install MetaMask to connect wallet");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      onConnect?.(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button onClick={connect} className="px-3 py-2 bg-indigo-600 text-white rounded">
      Connect Wallet
    </button>
  );
}