// src/App.jsx
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DonorDashboard from './pages/DonorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NgoDashboard from './pages/NgoDashboard';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';

const AppLayout = () => (
  <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-20 pb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
);

// This router object defines all the pages in your app. This part was correct.
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/how-it-works', element: <HowItWorksPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/dashboard/donor', element: <DonorDashboard /> },
      { path: '/dashboard/student', element: <StudentDashboard /> },
      { path: '/dashboard/admin', element: <AdminDashboard /> },
      { path: '/dashboard/ngo', element: <NgoDashboard /> },
    ],
  },
]);

// This is the main correction.
// The App function now provides the router to your entire application.
function App() {
  return <RouterProvider router={router} />;
}

export default App;