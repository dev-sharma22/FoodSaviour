import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Check, X, Clock, Users, Wheat, HandHeart, Award } from 'lucide-react';
import AnimatedCounter from '../components/motion/AnimatedCounter';

// --- MOCK DATA for a richer dashboard experience ---
const stats = [
  { title: 'Pending Submissions', value: 3, icon: Clock, color: 'text-yellow-500' },
  { title: 'Active Volunteers', value: 350, icon: Users, color: 'text-blue-500' },
  { title: 'Meals Donated (This Month)', value: 1250, icon: Wheat, color: 'text-green-500' },
  { title: 'NGO Partners', value: 50, icon: HandHeart, color: 'text-pink-500' },
];

const initialSubmissions = [
  { id: 1, type: 'Food Donation', title: 'Catering Sandwiches', user: 'A-One Catering', status: 'Pending' },
  { id: 2, type: 'Event', title: 'University Food Drive', user: 'Jane Doe', status: 'Pending' },
  { id: 3, type: 'Food Donation', title: 'Bakery Surplus', user: 'The Corner Bakery', status: 'Pending' },
  { id: 4, type: 'Food Donation', title: 'Weekly Groceries', user: 'Local Mart', status: 'Approved' },
  { id: 5, type: 'Event', title: 'Community Kitchen', user: 'Maria Garcia', status: 'Approved' },
  { id: 6, type: 'Event', title: 'Cancelled Order', user: 'Pizza Place', status: 'Rejected' },
];

const leaderboard = [
    { rank: 1, name: 'Jane Doe', points: 1250 },
    { rank: 2, name: 'John Smith', points: 1100 },
    { rank: 3, name: 'Maria Garcia', points: 950 },
];

// --- Reusable Sub-Components for a manageable layout ---
const StatCard = ({ icon: Icon, title, value, color }) => (
  <Card className="flex items-center p-4">
    <div className={`p-3 rounded-full bg-primary/10 mr-4 ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-light-subtle dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-light-text dark:text-dark-text">
        <AnimatedCounter to={value} />
      </p>
    </div>
  </Card>
);

const TabButton = ({ tabName, activeTab, setActiveTab }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
        activeTab === tabName 
        ? 'bg-primary text-white' 
        : 'text-light-subtle dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-dark-card'
      }`}
    >
      {tabName}
    </button>
);


// --- The Main Dashboard Component ---
const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [activeTab, setActiveTab] = useState('Pending');

  const handleStatusChange = (id, newStatus) => {
    setSubmissions(prev =>
      prev.map(sub => (sub.id === id ? { ...sub, status: newStatus } : sub))
    );
  };
  
  const filteredSubmissions = submissions.filter(s => s.status === activeTab);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-light-text dark:text-dark-text">Admin Dashboard</h1>

      {/* ===================================
          STATS SECTION
      ==================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
           <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
           >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* ===================================
          MAIN CONTENT AREA (2 Columns)
      ==================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Manage Submissions */}
        <div className="lg:col-span-2">
            <Card>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold mb-4 sm:mb-0">Manage Submissions</h2>
                    <div className="flex gap-2 p-1 rounded-lg bg-light-input dark:bg-dark-bg">
                        <TabButton tabName="Pending" activeTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton tabName="Approved" activeTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton tabName="Rejected" activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        {/* Table Head */}
                        <thead>
                            <tr className="border-b border-light-border dark:border-dark-border/30">
                                <th className="p-3">Title</th>
                                <th className="p-3 hidden sm:table-cell">Submitted By</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            <AnimatePresence>
                                {filteredSubmissions.length > 0 ? (
                                    filteredSubmissions.map((sub) => (
                                    <motion.tr key={sub.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -50 }} className="border-b border-light-border/50 dark:border-dark-border/20">
                                        <td className="p-3 font-semibold">{sub.title}</td>
                                        <td className="p-3 hidden sm:table-cell text-light-subtle dark:text-gray-400">{sub.user}</td>
                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">
                                                {activeTab === 'Pending' && (
                                                <>
                                                    <Button onClick={() => handleStatusChange(sub.id, 'Approved')} className="!px-2 !py-1 text-sm bg-green-500 hover:bg-green-600"><Check className="w-4 h-4" /></Button>
                                                    <Button onClick={() => handleStatusChange(sub.id, 'Rejected')} className="!px-2 !py-1 text-sm bg-red-500 hover:bg-red-600"><X className="w-4 h-4" /></Button>
                                                </>
                                                )}
                                                {activeTab !== 'Pending' && <span className={`text-xs font-bold ${activeTab === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>{activeTab}</span>}
                                            </div>
                                        </td>
                                    </motion.tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="3" className="text-center p-8 text-light-subtle dark:text-gray-400">No {activeTab.toLowerCase()} submissions.</td></tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
        
        {/* Right Column: Leaderboard & Activity */}
        <div className="space-y-8">
            <Card>
                <h2 className="text-2xl font-bold mb-4">Volunteer Leaderboard</h2>
                <div className="space-y-4">
                    {leaderboard.map((person) => (
                        <div key={person.rank} className="flex items-center">
                            <div className="text-lg font-bold text-primary mr-4">{person.rank}</div>
                            <div className="flex-grow">
                                <p className="font-semibold">{person.name}</p>
                                <p className="text-sm text-light-subtle dark:text-gray-400">{person.points} points</p>
                            </div>
                            {person.rank === 1 && <Award className="w-6 h-6 text-yellow-500" />}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;