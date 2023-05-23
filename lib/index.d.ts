import * as _project_serum_anchor_dist_cjs_program_namespace_methods from '@project-serum/anchor/dist/cjs/program/namespace/methods';
import * as _project_serum_anchor_dist_cjs_idl from '@project-serum/anchor/dist/cjs/idl';
import * as _project_serum_anchor from '@project-serum/anchor';
import { SDK } from '@stockpileprotocol/sdk';
export { SDK } from '@stockpileprotocol/sdk';
import { PublicKey, Connection, Transaction, ConfirmOptions, Cluster } from '@solana/web3.js';
import { SendTransactionOptions } from '@solana/wallet-adapter-base';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import * as React from 'react';
import { ReactNode } from 'react';

type sendTransactionFn = <T extends Transaction>(transaction: T, connection?: Connection, options?: SendTransactionOptions) => Promise<string>;
declare const useCreateProject: (sdk: SDK) => {
    create: (name: string, description: string, imageLink: string, websiteLink: string, twitter: string, discord: string, telegram: string, location: string, repo: string, goal: string, owner: PublicKey, sendTransaction?: sendTransactionFn, connection?: Connection, options?: SendTransactionOptions) => Promise<string | undefined>;
    createProjectIxMethodBuilder: (name: string, description: string, imageLink: string, websiteLink: string, twitter: string, discord: string, telegram: string, location: string, repo: string, goal: string, owner: PublicKey) => Promise<_project_serum_anchor_dist_cjs_program_namespace_methods.MethodsBuilder<_project_serum_anchor.Idl, _project_serum_anchor_dist_cjs_idl.IdlInstruction & {
        name: string;
    }> | null>;
    projectPDA: PublicKey | null;
    isCreatingProject: boolean;
    createProjectError: Error | null;
};

declare const useProject: (sdk: SDK, projectAccount: PublicKey) => {
    project: any;
    projectLoading: boolean;
    projectError: Error | null;
};

declare const useStockpile: (wallet: AnchorWallet, connection: Connection, opts: ConfirmOptions, cluster: Cluster | "localnet") => SDK;

declare const useUser: (sdk: SDK, userAccount: PublicKey) => {
    user: any;
    userLoading: boolean;
    userError: Error | null;
};

declare const useCreateUser: (sdk: SDK) => {
    create: (username: string, image: any, owner: PublicKey) => Promise<void>;
    createUserIxMethodBuilder: (username: string, image: any, owner: PublicKey) => Promise<{
        instructionMethodBulder: _project_serum_anchor_dist_cjs_program_namespace_methods.MethodsBuilder<_project_serum_anchor.Idl, _project_serum_anchor_dist_cjs_idl.IdlInstruction & {
            name: string;
        }>;
        userPDA: PublicKey;
    } | null>;
    isCreatingUser: boolean;
    createUserError: Error | null;
};

interface StockpileContextValue {
    sdk: SDK;
}
interface StockpileProviderProps {
    children: ReactNode;
    sdk: SDK;
}
declare const StockpileProvider: React.FC<StockpileProviderProps>;
declare const useStockpileContext: () => StockpileContextValue;

export { StockpileProvider, useCreateProject, useCreateUser, useProject, useStockpile, useStockpileContext, useUser };
