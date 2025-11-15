# CBT Practice Platform - App Flow

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         HOME PAGE                            │
│                    (http://localhost:3000)                   │
│                                                              │
│  ┌──────────────┐              ┌──────────────┐            │
│  │    Login     │              │   Sign Up    │            │
│  └──────────────┘              └──────────────┘            │
└─────────────────────────────────────────────────────────────┘
                    │                      │
                    │                      │
                    ▼                      ▼
         ┌──────────────────┐   ┌──────────────────┐
         │   LOGIN PAGE     │   │  REGISTER PAGE   │
         │                  │   │                  │
         │  • Email         │   │  • First Name    │
         │  • Password      │   │  • Last Name     │
         │                  │   │  • Email         │
         │  [Sign In]       │   │  • Password      │
         └──────────────────┘   │  • Confirm Pass  │
                    │            │                  │
                    │            │  [Create Account]│
                    │            └──────────────────┘
                    │                      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────┐
                    │    DASHBOARD     │
                    │                  │
                    │  Welcome, User!  │
                    │                  │
                    │  ┌────────────┐  │
                    │  │  Practice  │  │
                    │  ├────────────┤  │
                    │  │ Mock Exam  │  │
                    │  ├────────────┤  │
                    │  │  Results   │  │
                    │  ├────────────┤  │
                    │  │   Study    │  │
                    │  └────────────┘  │
                    └──────────────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
         ┌──────────┐   ┌──────────┐   ┌──────────┐
         │ PRACTICE │   │ PROFILE  │   │ SETTINGS │
         └──────────┘   └──────────┘   └──────────┘
                │
                ▼
         ┌──────────────────┐
         │  PRACTICE SETUP  │
         │                  │
         │  Select Subject: │
         │  [Dropdown]      │
         │                  │
         │  Questions: 20   │
         │  [Slider]        │
         │                  │
         │  [Start Practice]│
         └──────────────────┘
                │
                ▼
         ┌──────────────────────────────────┐
         │       EXAM INTERFACE             │
         │                                  │
         │  Timer: 30:00    Q: 1/20        │
         │  ─────────────────────────────   │
         │                                  │
         │  Question: What is 2 + 2?       │
         │                                  │
         │  ○ A. 2                         │
         │  ● B. 4  ← Selected             │
         │  ○ C. 6                         │
         │  ○ D. 8                         │
         │                                  │
         │  [Previous]  [Next]  [Flag]     │
         │                                  │
         │  Question Navigator:             │
         │  [1][2][3][4][5]...[20]         │
         │                                  │
         │  [Submit Exam]                   │
         └──────────────────────────────────┘
                │
                ▼
         ┌──────────────────┐
         │     RESULTS      │
         │                  │
         │      85%         │
         │   ✓ Great!       │
         │                  │
         │  Correct: 17     │
         │  Wrong: 3        │
         │  Total: 20       │
         │                  │
         │  [Practice Again]│
         │  [Dashboard]     │
         └──────────────────┘
```

## User Journey

### 1. First Visit
```
Home → Sign Up → Fill Form → Create Account → Dashboard
```

### 2. Returning User
```
Home → Login → Enter Credentials → Dashboard
```

### 3. Taking a Test
```
Dashboard → Practice → Select Subject → Choose Questions → Start → Answer Questions → Submit → View Results
```

### 4. Navigation Flow
```
Dashboard
├── Practice → Exam Interface → Results
├── Profile → View Info
├── Results → Past Results
└── Settings → Logout
```

## Page Components

### Home Page
- Navigation bar
- Hero section
- Features cards
- Subjects grid
- Footer

### Login/Register
- Form fields
- Submit button
- Link to other auth page

### Dashboard
- Welcome message
- Quick action cards
- Statistics

### Practice Setup
- Subject dropdown
- Question count slider
- Start button

### Exam Interface
- Timer
- Question display
- Answer options
- Navigation buttons
- Question navigator
- Submit button

### Results
- Score display
- Statistics
- Action buttons

## State Flow

```
User State:
Not Logged In → Logged In → Taking Test → Viewing Results

Data Flow:
Frontend → API Request → Backend → Database → Response → Frontend → Display
```

## Navigation Structure

```
Public Routes:
├── / (Home)
├── /login
└── /register

Protected Routes (requires login):
└── /app
    ├── /dashboard
    ├── /practice
    ├── /exam
    ├── /results
    ├── /profile
    └── /settings
```

## Component Hierarchy

```
App
├── AuthProvider
│   ├── Home
│   ├── Login
│   ├── Register
│   └── ProtectedRoute
│       └── Layout
│           ├── Sidebar
│           ├── Header
│           └── Main Content
│               ├── Dashboard
│               ├── Practice
│               ├── Exam
│               │   └── ExamInterface
│               ├── Results
│               ├── Profile
│               └── Settings
```

## Data Flow Example

### Taking a Test

1. **User Action**: Click "Start Practice"
2. **Navigate**: Go to /app/practice
3. **User Action**: Select subject and questions
4. **User Action**: Click "Start Practice"
5. **Navigate**: Go to /app/exam
6. **Load**: Sample questions
7. **Display**: First question
8. **User Action**: Select answer
9. **Store**: Answer in state
10. **User Action**: Click "Next"
11. **Display**: Next question
12. **Repeat**: Steps 8-11
13. **User Action**: Click "Submit"
14. **Calculate**: Score
15. **Navigate**: Go to /app/results
16. **Display**: Results

## Timer Flow

```
Start Exam
    ↓
Initialize Timer (30:00)
    ↓
Every Second:
    ↓
Decrease by 1
    ↓
Update Display
    ↓
Check if 0
    ↓
If 0: Auto Submit
If Not: Continue
```

## Answer Selection Flow

```
User Clicks Option
    ↓
Update State
    ↓
Highlight Selected
    ↓
Store Answer
    ↓
Enable Next Button
```

## Question Navigation Flow

```
Current Question: 1
    ↓
User Clicks "Next"
    ↓
Save Current Answer
    ↓
Increment Index
    ↓
Load Next Question
    ↓
Display Question 2
```

## Submit Flow

```
User Clicks Submit
    ↓
Collect All Answers
    ↓
Compare with Correct Answers
    ↓
Calculate Score
    ↓
Navigate to Results
    ↓
Display Score
```

## This diagram shows:
- How pages connect
- User journey paths
- Component structure
- Data flow
- Navigation routes

Use this as a reference to understand how the app works!
