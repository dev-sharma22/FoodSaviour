import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AnimatedCounter from '../components/motion/AnimatedCounter';
import { Award, CheckCircle, MapPin, Search, Star, Trophy } from 'lucide-react';

// --- 1. Mock Data (Kept at the top for clarity) ---
const studentStats = { points: 1250, missionsCompleted: 8, rank: "Gold Tier" };
const availableMissions = [
  { id: 101, title: 'Catering Sandwiches', location: 'Indore', points: 150 },
  { id: 102, title: 'Weekend Bakery Surplus', location: 'Bhopal', points: 100 },
  { id: 103, title: 'Fresh Produce from Market', location: 'Ujjain', points: 120 },
];
const missionHistory = [
    { id: 91, title: 'Community Kitchen Run', date: '2025-08-04', points: 200 },
    { id: 92, title: 'University Event Leftovers', date: '2025-08-02', points: 150 },
];
const leaderboard = [
    { rank: 1, name: 'Jane Doe', points: 1250, isCurrentUser: true },
    { rank: 2, name: 'John Smith', points: 1100 },
    { rank: 3, name: 'Maria Garcia', points: 950 },
];


// --- 2. Reusable UI Sub-Components (Defined locally) ---
const StatCard = ({ icon: Icon, title, value, color }) => (
  <Card className="flex items-center p-4">
      <div className={`p-3 rounded-full bg-primary/10 mr-4 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
          <p className="text-sm text-light-subtle dark:text-gray-400">{title}</p>
          <div className="text-2xl font-bold text-light-text dark:text-dark-text">
              {typeof value === 'number' ? <AnimatedCounter to={value} /> : value}
          </div>
      </div>
  </Card>
);

const TabButton = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${active ? 'bg-primary text-white' : 'text-light-subtle dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-dark-card'}`}>
      {children}
  </button>
);


// --- 3. Tab Content Components (Each tab's content is now its own clean component) ---
const AvailableMissions = ({ missions }) => (
  <div className="space-y-4">
    {missions.map(mission => (
      <div key={mission.id} className="p-4 rounded-lg border border-light-border dark:border-dark-border/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold">{mission.title}</h3>
          <div className="flex items-center gap-2 text-sm text-light-subtle dark:text-gray-500 mt-1"><MapPin className="w-4 h-4" /><span>{mission.location}</span></div>
          <p className="font-semibold text-primary mt-1">+{mission.points} Points</p>
        </div>
        <Button onClick={() => alert(`You have accepted the mission for "${mission.title}"!`)} className="w-full sm:w-auto">Accept Mission</Button>
      </div>
    ))}
  </div>
);

const MissionHistory = ({ history }) => (
  <div className="space-y-4">
    {history.map(mission => (
      <div key={mission.id} className="p-4 rounded-lg bg-light-input dark:bg-dark-bg flex justify-between items-center">
        <div>
          <p className="text-sm text-light-subtle dark:text-gray-500">{mission.date}</p>
          <h3 className="text-lg font-semibold">{mission.title}</h3>
        </div>
        <div className="text-right">
          <p className="font-bold text-green-500">+{mission.points} points</p>
          <span className="text-xs text-green-500">Completed</span>
        </div>
      </div>
    ))}
  </div>
);

const Leaderboard = ({ leaderboard }) => (
  <div className="space-y-3">
    {leaderboard.map((person) => (
      <div key={person.rank} className={`p-4 rounded-lg flex items-center ${person.isCurrentUser ? 'border-2 border-primary bg-primary/10' : 'bg-light-input dark:bg-dark-bg'}`}>
        <div className="text-xl font-bold text-primary w-10">{person.rank}</div>
        <div className="flex-grow"><p className="font-semibold">{person.name} {person.isCurrentUser && '(You)'}</p></div>
        <div className="font-bold text-lg">{person.points} pts</div>
        {person.rank === 1 && <Trophy className="w-6 h-6 text-yellow-500 ml-4" />}
      </div>
    ))}
  </div>
);


// --- 4. The Main Dashboard "Container" Component ---
const StudentDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('missions');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredMissions = useMemo(() => {
    if (!searchTerm) return availableMissions;
    return availableMissions.filter(m => 
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-4xl font-bold text-light-text dark:text-dark-text">Mission Control</h1>
        <Button onClick={handleLogout} variant="secondary" className="!px-4 !py-1.5 mt-4 sm:mt-0">Logout</Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard icon={Star} title="Points Earned" value={studentStats.points} color="text-yellow-500" />
        <StatCard icon={CheckCircle} title="Missions Completed" value={studentStats.missionsCompleted} color="text-green-500" />
        <StatCard icon={Trophy} title="Current Rank" value={studentStats.rank} color="text-primary" />
      </div>

      {/* Main Content Card with Tabs */}
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex gap-2 p-1 rounded-lg bg-light-input dark:bg-dark-bg">
                <TabButton active={activeTab === 'missions'} onClick={() => setActiveTab('missions')}>Available Missions</TabButton>
                <TabButton active={activeTab === 'history'} onClick={() => setActiveTab('history')}>My History</TabButton>
                <TabButton active={activeTab === 'leaderboard'} onClick={() => setActiveTab('leaderboard')}>Leaderboard</TabButton>
            </div>
            {activeTab === 'missions' && (
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-subtle dark:text-gray-400" />
                    <input type="text" placeholder="Search missions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-64 pl-10 p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50" />
                </div>
            )}
        </div>
        
        {/* The main component now just renders the correct sub-component, making it very clean. */}
        <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {activeTab === 'missions' && <AvailableMissions missions={filteredMissions} />}
              {activeTab === 'history' && <MissionHistory history={missionHistory} />}
              {activeTab === 'leaderboard' && <Leaderboard leaderboard={leaderboard} />}
            </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default StudentDashboard;