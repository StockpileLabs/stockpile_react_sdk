import { SDK } from "@stockpileprotocol/sdk";
import { useState, useEffect, useCallback } from "react";
import { PublicKey } from "@solana/web3.js";

const useProject = (sdk: SDK, projectAccount: PublicKey) => {
    const [project, setProject] = useState<any>(null);
    const [projectLoading, setProjectLoading] = useState(false);
    const [projectError, setProjectError] = useState<Error | null>(null);

    const fetchProject = useCallback(
        async() => {
            setProjectLoading(true);
            setProjectError(null);

            try {
                const data = await sdk.project.get(projectAccount);

                setProject(data);
            } catch (err: any) {
                setProjectError(err);
            } finally {
                setProjectLoading(false);
            }
        },
        [sdk, projectAccount]
    );

    useEffect(() => {
        fetchProject();
    }, [])

    return { project, projectLoading, projectError };
};

export { useProject };