"use client";

import { useStreamVideoClient, Call } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useGetCallById = (id: string | string[] | undefined) => {
    const client = useStreamVideoClient();
    const [call, setCall] = useState<Call | undefined>();
    const [isCallLoading, setIsCallLoading] = useState(true);

    const getCall = async () => {
        if (!client) return;

        try {
            const { calls } = await client.queryCalls({ filter_conditions: { id } });
            if (calls.length > 0) setCall(calls[0]);
        } catch (error) {
            console.error(error);
            setCall(undefined);
        } finally {
            setIsCallLoading(false);
        }
    };

    useEffect(() => {
        getCall();
    }, [client, id]);

    return { call, isCallLoading };
};

export default useGetCallById;