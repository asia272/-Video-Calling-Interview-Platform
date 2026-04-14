import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useUserRole = () => {
    const { user } = useUser();
    
    const userData = useQuery(api.user.getUserByClerkId, {
        clerkId:user?.id||"",
    })

    return {
      isLoading: userData === undefined,
      isInterviewer: userData?.role === "interviewer",
      isCandidate: userData?.role === "candidate",
    };
}