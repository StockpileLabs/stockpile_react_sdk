import { SDK } from "@stockpileprotocol/sdk";
import { useState, useCallback } from "react";
import { PublicKey } from "@solana/web3.js";

const useCreateUser = (sdk:SDK) => {
    const [isCreatingUser, setIsCreatingUser] = useState(false)
    const [createUserError, setCreateUserError] = useState<Error | null>(null)

    const create = useCallback(
        async(username: string, image: any, owner: PublicKey) => {
            setIsCreatingUser(true);
            setCreateUserError(null);

            try {
                const data = await createUserIxMethodBuilder(username, image, owner)
                await data?.instructionMethodBulder.rpc()
            } catch (err: any) {
                setCreateUserError(err)
            } finally {
                setIsCreatingUser(false)
            }
        },
        [sdk]
    );

    const createUserIxMethodBuilder = useCallback(
        async( username: string, image: any, owner: PublicKey ) => {
            setCreateUserError(null);

            try {
                const user = await sdk.user.create(username, image, owner);

                const data = {
                    instructionMethodBulder: user.instructionMethodBuilder,
                    userPDA: user.userPDA,
                }

                return data;
            } catch (err:any) {
                setCreateUserError(err);
                return null;
            }
        },
        [sdk]
    );

    return {
        create,
        createUserIxMethodBuilder,
        isCreatingUser,
        createUserError
  };
};

export { useCreateUser };