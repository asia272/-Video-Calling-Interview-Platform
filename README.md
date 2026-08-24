# 🎥 Video Calling Interview Platform

A full-stack interview platform that enables candidates and interviewers to conduct video interviews, collaborate through a live code editor, schedule interviews, and share interview feedback.

## 🌐 Live Demo

**Live Application:** https://video-calling-interview-platform-nine.vercel.app/

---

## 🚀 Features

### 🔐 Authentication & Authorization

* Secure authentication with Clerk
* User registration and login
* Role-based access control (Candidate & Interviewer)
* Protected routes

### 📹 Video Interviews

* Real-time video and audio calls using Stream Video SDK
* Join scheduled interview rooms
* Meeting setup screen before joining
* Participant management during interviews

### 📅 Interview Scheduling

* Schedule interviews
* Assign candidates and interviewers
* Manage interview sessions
* Track interview status

### 💻 Live Code Editor

* Integrated Monaco Editor
* Coding support during technical interviews
* Responsive coding workspace

### 📝 Feedback System

* Interviewers can leave comments
* Rating-based candidate evaluation
* Interview feedback storage

### 🎨 Modern UI

* Responsive design
* Dark and Light mode
* Built with Tailwind CSS and shadcn/ui

### ⚡ Real-Time Backend

* Convex database integration
* Real-time data synchronization

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15
* React 18
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend & Database

* Convex

### Authentication

* Clerk

### Video Calling

* Stream Video SDK

### Code Editor

* Monaco Editor

### Deployment

* Vercel

---

## 🔄 Application Flow

### Candidate

1. Sign in
2. View scheduled interviews
3. Join interview room
4. Participate in video interview
5. Solve coding tasks
6. Receive feedback

### Interviewer

1. Sign in
2. Schedule interviews
3. Conduct interviews
4. Evaluate candidates
5. Submit ratings and feedback

---

## 👨‍💻 Author

**Asia Ashraf**

Full Stack Developer

### Skills

* Next.js
* React.js
* TypeScript
* Convex
* Clerk
* Stream Video SDK
* Tailwind CSS

---


---

## 🔐 Environment Variables

If you want to run the project locally, create a `.env.local` file and add the required environment variables.

### Clerk

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
```

### Convex

```env
# Convex
CONVEX_DEPLOYMENT="your_convex_deployment"
NEXT_PUBLIC_CONVEX_URL="your_convex_url"
NEXT_PUBLIC_CONVEX_SITE_URL="your_convex_site_url"
```

### Stream

```env
# Stream Video
NEXT_PUBLIC_STREAM_API_KEY="your_stream_api_key"
STREAM_SECRET_KEY="your_stream_secret_key"
```

---



## ⭐ Support

If you found this project helpful, consider giving it a star on GitHub.
