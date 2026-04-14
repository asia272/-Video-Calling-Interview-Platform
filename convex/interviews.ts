import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createInterview = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(), 
    interviewerIds: v.array(v.string()), 
  },
    handler: async (ctx,args) => {
          const idendtity = await ctx.auth.getUserIdentity();
        if (!idendtity) throw new Error("Unauthorized")
        
        return await ctx.db.insert("interviews", {
            ...args,
        })
        
  },
  
});

export const unpdateInterviewStatus = mutation({
    args: {
        id: v.id("interviews"),
        status: v.string()
    },
    handler: async (ctx,args) => {
        return await ctx.db.patch(args.id, {
          status: args.status,
          ...(args.status === "completed" ? { endTime: Date.now() } : {}),
        });
    }
})

export const getAllInterveiws = query({
  handler: async (ctx) => {
    const idendtity = await ctx.auth.getUserIdentity();
    if (!idendtity) throw new Error("Unauthorized");

    const interviews = await ctx.db.query("interviews").collect();

    return interviews;
  },
});

export const getMyInterveiws = query({
  handler: async (ctx) => {
    const idendtity = await ctx.auth.getUserIdentity();
    if (!idendtity) return [];

    const interviews = await ctx.db
      .query("interviews")
      .withIndex("by_candidate_id", (q) =>
        q.eq("candidateId", idendtity.subject),
      )
      .collect();
    return interviews!;
  },
});

export const getInterveiwByStreamCalledId = query({
    args:{streamId:v.string()},
  handler: async (ctx,args) => {
    const idendtity = await ctx.auth.getUserIdentity();
    if (!idendtity) return [];

    return await ctx.db
      .query("interviews")
      .withIndex("by_stream_call_id", (q) =>
        q.eq("streamCallId", args.streamId))
      .first();
  },
});