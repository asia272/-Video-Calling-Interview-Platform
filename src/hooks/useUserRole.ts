import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useUserRole = () => {
    const { user, isLoaded } = useUser();





    const userData = useQuery(api.users.getUserByClerkId, {
        clerkId: user?.id || "",
    })

    console.log("isLoaded:", isLoaded);
    console.log("user:", user);
    console.log("user id:", user?.id);
    return {
        isLoading: userData === undefined,
        isInterviewer: userData?.role === "interviewer",
        isCandidate: userData?.role === "candidate",
    };
}