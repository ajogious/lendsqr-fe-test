# Lendsqr Frontend Assessment

A responsive React + TypeScript + SCSS web app built as part of the Lendsqr frontend engineering assessment. The app includes user login, dashboard with statistics, user listing, and a detailed user page.

---

## 🔍 Project Overview

This project simulates an admin dashboard where a user can:

- Log in with an email and password
- View summary cards (active users, users with loans, etc.)
- View paginated list of users with filter & search
- View detailed profile of each user
- Navigate via a fixed sidebar and top navigation

All data is fetched from a mock API and handled gracefully on error.

---

## 🧱 Folder Structure

```bash
.
├── public/
├── src/
│   ├── assets/          # Images, logos, icons
│   ├── components/      # Shared UI components (BorrowerNav, TopNav, UserAccountTable, UserSummary, etc.)
│   ├── pages/           # Route-level components (Login, Dashboard, UserDetails)
│   ├── services/        # API calls (e.g., getUsers)
│   ├── styles/          # Global SCSS variables & mixins
│   ├── tests/           # Vitest test files (or colocated with pages)
│   ├── data/            # Mock Data downloaded from json generator incase the end point could not be reached
│   └── App.tsx          # Main app router
├── .env                 # Environment variables
├── vite.config.ts       # Vite config
└── README.md

🛠️ Tech Stack
Category	Tech
Framework	React 18
Language	TypeScript
Styling	SCSS
Routing	React Router DOM
Testing	Vitest + @testing-library/react
Mock API	Beeceptor
Tooling	Vite

🧪 Testing Summary
✅ Login form unit tests (validations, submission)
✅ User table renders and fetch test
✅ Routing from login → dashboard → user detail
✅ Basic localStorage test

To run tests:

npm run test
⚙️ Setup Instructions
1. Clone the Repo
git clone https://github.com/ajoious/lendsqr-fe-test.git
cd lendsqr-fe-test
2. Install Dependencies
npm install
3. Start the App
npm run dev
App runs on: http://localhost:5173/

🎨 Design Notes
🔄 Responsiveness
The layout is fully responsive (mobile-first).
Sidebar collapses appropriately on smaller screens.

⚡ Performance
Lazy loading implemented where appropriate
SCSS modularized for minimal re-renders

🧠 Decisions
State Handling: Kept minimal using useState/useEffect
Routing: Used route guards via localStorage login check
Mock Data: Integrated Beeceptor to simulate real API

📦 Deployment
Deployed to: https://lendsqr-fe-test-rust-seven.vercel.app/
Loom walkthrough: Watch Demo

🙋 Author
Abdulmumuni Ajoge Adavize
LinkedIn: https://www.linkedin.com/in/aajoge
GitHub: https://github.com/ajogious

```
