# StockPile React SDK

## Installation

```bash
npm install @stockpileprotocol/react_sdk@0.0.1
```

```bash
Add a .npmrc file to root of folder with the following details:

registry=https://registry.npmjs.org/
@stockpileprotocol:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<Request from admin>
```

## Usage 
The `useStockpile` hook provides the Stockpile SDK instance and the `useCreateUser` hook provides a function to create a new user.

```tsx
import { useStockpile, useCreateUser } from "@stockpileprotocol/react_sdk";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapater-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useMemo } from "react";

const App = () => {
  const anchorWallet = useAnchorWallet() as AnchorWallet;
  const connection = useMemo(
    () => new Connection("https://api.devnet.solana.com", "confirmed"),
    []
  );
  const sdk = useStockpile(
    anchorWallet,
    connection,
    { preflightCommitment: "confirmed" },
    "devnet"
  );

  const { create, error, loading } = useCreateUser(sdk);

  return (
    <button
      onClick={() => {
        create(anchorWallet?.publicKey as PublicKey);
      }}
    >
      Create User
    </button>
  );
};

export default App;
```
