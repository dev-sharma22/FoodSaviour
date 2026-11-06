# 🍲 FoodSaviour

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Bridging the gap between surplus and need.** FoodSaviour is a community-driven web platform designed to minimize food waste and alleviate hunger by seamlessly connecting food donors, student volunteers, NGOs, and administrators.

---

## 🌟 Overview

Every day, vast amounts of edible surplus food from restaurants, parties, cafeterias, and households go to waste, while millions in nearby communities face food insecurity. **FoodSaviour** bridges this divide by providing an intuitive, transparent, and gamified platform for food rescue logistics.

---

## ✨ Key Features

### 👥 Multi-Role Ecosystem

* **🍽️ Food Donors**:
  * Easily list surplus food with details (quantity, description, best-before date, pickup location).
  * Real-time tracking of donation status (`Pending`, `Approved`, `Completed`).
  * History and impact analytics of previous contributions.

* **🎒 Student Volunteers ("Food Heroes")**:
  * Gamified volunteer experience to encourage youth engagement.
  * Browse and accept local pickup & delivery missions (e.g., Indore, Bhopal, Ujjain).
  * Earn impact points, unlock tier rankings (e.g., *Gold Tier*), and compete on community leaderboards.

* **🤝 Non-Governmental Organizations (NGOs)**:
  * Discover available food supplies for distribution.
  * Coordinate bulk food logistics to community shelters and feeding centers.
  * Direct partnership management with local donors.

* **🛡️ Administrators**:
  * Review and verify incoming food donations for quality and safety.
  * Oversee pickup workflows and coordinate logistics.
  * Monitor platform-wide metrics, active missions, and user accounts.

### 🎨 Modern UI & Experience
* **Dynamic Animations**: Fluid page transitions and interactive counters powered by [Framer Motion](https://www.framer.com/motion/).
* **Theme Support**: Integrated Dark Mode and Light Mode support with Tailwind CSS.
* **Modern Icons**: Clean, consistent interface with [Lucide React](https://lucide.dev/).
* **Secure Authentication**: JWT-driven auth context with automated token refresh interceptors.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 7](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Linting** | [ESLint 9](https://eslint.org/) |

---

## 📂 Project Structure

```text
FoodSaviour/
├── public/                 # Static media assets & videos
├── src/
│   ├── components/
│   │   ├── auth/          # ProtectedRoute and authentication guards
│   │   ├── motion/        # Animated counters and motion wrappers
│   │   ├── shared/        # Navbar, Footer, and global navigation
│   │   └── ui/            # Reusable UI primitives (Buttons, Cards, Badges)
│   ├── contexts/
│   │   ├── AuthContext.jsx   # Auth state, login/register, token refresh logic
│   │   └── ThemeContext.jsx  # Dark/light theme state manager
│   ├── pages/
│   │   ├── LandingPage.jsx       # Hero video, stats, and platform overview
│   │   ├── HowItWorksPage.jsx    # Visual step-by-step workflow timeline
│   │   ├── AboutPage.jsx         # Mission, story, and core team
│   │   ├── LoginPage.jsx         # User login portal
│   │   ├── RegisterPage.jsx      # Role-based onboarding
│   │   ├── DonorDashboard.jsx    # Donor food listing and management
│   │   ├── StudentDashboard.jsx  # Missions, gamification, and leaderboard
│   │   ├── NgoDashboard.jsx      # NGO food claims and distribution
│   │   └── AdminDashboard.jsx    # Verification and platform monitoring
│   ├── App.jsx             # React Router route definitions
│   ├── main.jsx            # Application entry point
│   └── index.css           # Tailwind CSS directives
├── index.html              # HTML template
├── tailwind.config.js      # Tailwind design tokens & theme setup
├── vite.config.js          # Vite build configuration
└── package.json            # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (version `18.0.0` or higher recommended)
* [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) / [yarn](https://yarnpkg.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/dev-sharma22/FoodSaviour.git
cd FoodSaviour
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to view the application.

### 4. Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🧭 Routes & Navigation

| Route | Description | Target Role |
| :--- | :--- | :--- |
| `/` | Landing page with hero video, statistics, and impact goals | Public |
| `/how-it-works` | Visual timeline demonstrating donation lifecycle | Public |
| `/about` | Mission statement and team background | Public |
| `/login` | Account sign-in | Public |
| `/register` | Sign-up with role selection | Public |
| `/dashboard/donor` | Post surplus food and track status | Donors |
| `/dashboard/student` | Accept pickup missions, view leaderboard | Volunteers |
| `/dashboard/ngo` | Request surplus food and manage distribution | NGOs |
| `/dashboard/admin` | Quality checks, approvals, and platform analytics | Admins |

---

## 🤝 Contributing

Contributions are always welcome! If you'd like to improve FoodSaviour:

1. **Fork** the repository.
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
