import { useMemo } from "react";
import { AnchorWallet } from "@solana/wallet-adapter-react";
//import { SDK } from 'stockpile_sdk';
import { Connection, ConfirmOptions, Cluster } from "@solana/web3.js";

const useStockpile = (
    wallet: AnchorWallet,
    connection: Connection,
    opts: ConfirmOptions,
    cluster: Cluster | "localnet",
) => {
    const sdk = useMemo(() => {
        return new SDK(wallet, connection, opts, cluster);
    }, [wallet])

    return sdk;
}

export { useStockpile };