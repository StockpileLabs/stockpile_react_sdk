import { SDK } from "@stockpileprotocol/sdk";
import { useState, useCallback } from "react";
import { PublicKey, Transaction, Connection } from "@solana/web3.js";
import { SendTransactionOptions } from '@solana/wallet-adapter-base';

type sendTransactionFn = <T extends Transaction>(transaction: T, connection?: Connection, options?: SendTransactionOptions) => Promise<string>;

const useCreateProject = (sdk: SDK) => {
    const [projectPDA, setProjectPDA] = useState<PublicKey | null>(null);
    const [isCreatingProject, setIsCreatingProject] = useState(false);
    const [createProjectError, setcreateProjectError] = useState<Error | null>(null);

    const create = useCallback(
        async(
            name: string,
            description: string,
            imageLink: string,
            websiteLink: string,
            twitter: string,
            discord: string,
            telegram: string,
            location: string,
            repo: string,
            goal: string,
            owner: PublicKey,
            sendTransaction?: sendTransactionFn,
            connection?: Connection,
            options?: SendTransactionOptions
        ) => {
            setIsCreatingProject(true);
            setcreateProjectError(null);

            try {
                const ixMethodBuilder = await createProjectIxMethodBuilder(name, description, imageLink, websiteLink, twitter, discord, telegram, location, repo, goal, owner);
                const tx = await ixMethodBuilder?.transaction();

                if (sendTransaction) {
                    if(tx) {
                        return await sendTransaction(tx, connection, options);
                    }
                } else {
                    return await ixMethodBuilder?.rpc()
                }
            } catch (err: any) {
                setcreateProjectError(err)
            } finally {
                setIsCreatingProject(false)
            }
        },
        [sdk]
    );

    const createProjectIxMethodBuilder = useCallback(
        async(
            name: string,
            description: string,
            imageLink: string,
            websiteLink: string,
            twitter: string,
            discord: string,
            telegram: string,
            location: string,
            repo: string,
            goal: string,
            owner: PublicKey
        ) => {
            setcreateProjectError(null);

            try {
                const data = await sdk.project.create(name, description, imageLink, websiteLink, twitter, discord, telegram, location, repo, goal, owner);
                setProjectPDA(data.fundraiserPDA);
                return data.instructionMethodBuilder;
            } catch (err: any) {
                setcreateProjectError(err);
                return null;
            }
        },
        [sdk]
    );

    return {
        create,
        createProjectIxMethodBuilder,
        projectPDA,
        isCreatingProject,
        createProjectError
    };
};

export { useCreateProject };




