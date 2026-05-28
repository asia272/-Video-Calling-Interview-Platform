import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { useUser } from '@clerk/nextjs'

const InterviewScheduleUI = () => {
    const client = useStreamVideoClient()
    const { user } = useUser();

    const [open, setOpen] = useState(false)
    const [isCreating, setIsCreating] = useState(false)

    const interviews = useQuery(api.interviews.getAllInterviews);
    const users = useQuery(api.user.getUsers);
    const createInterview = useMutation(api.interviews.createInterview)


    const candidates = users?.filter((u) => u.role === "candidate");
    const interviewers = users?.filter((u) => u.role === "interviewer");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: new Date(),
        time: "09:00",
        candidateId: "",
        interviewerIds: user?.id ? [user.id] : [],
    });


    return (
        <div>InterviewScheduleUI</div>
    )
}

export default InterviewScheduleUI