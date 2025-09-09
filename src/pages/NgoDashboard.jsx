import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { HandHeart, CheckCircle, Search, MapPin } from 'lucide-react';
import AnimatedCounter from '../components/motion/AnimatedCounter';

// --- MOCK DATA for a richer experience ---
const initialDonations = [
  { id: 201, title: "Post-Wedding Banquet Surplus", donor: "Grand Hall Events", location: "Indore", quantity: "Est. 50-70 meals", claimed: false },
  { id: 202, title: "Corporate Cafeteria Close-out", donor: "Tech Corp Inc.", location: "Bhopal", quantity: "Multiple trays", claimed: false },
  { id: 203, title: "Weekly Farm Produce", donor: "Green Valley Farms", location: "Ujjain", quantity: "5 crates of vegetables", claimed: false },
  { id: 204, title: "Last Month's Gala Dinner", donor: "City Convention Center", location: "Indore", quantity: "Est. 100+ meals", claimed: true },
];

// --- Reusable Sub-Components ---
const StatCard = ({ icon: Icon, title, value }) => (
    <Card className="flex items-center gap-4">
        <Icon className="w-10 h-10 text-primary flex-shrink-0" />
        <div>
            <p className="text-light-subtle dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold"><AnimatedCounter to={value} /></p>
        </div>
    </Card>
);

const TabButton = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
        active
          ? 'bg-primary text-white'
          : 'text-light-subtle dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-dark-card'
      }`}
    >
      {children}
    </button>
);


// --- The Main Dashboard Component ---
const NgoDashboard = () => {
  const [donations, setDonations] = useState(initialDonations);
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');

  const handleClaim = (id) => {
    setDonations(prev => 
      prev.map(d => d.id === id ? { ...d, claimed: true } : d)
    );
    alert('Donation claimed! An admin will contact you to coordinate pickup.');
  };

  // Filter donations based on tab and search term
  const filteredDonations = useMemo(() => {
    const byTab = donations.filter(d => activeTab === 'available' ? !d.claimed : d.claimed);
    if (!searchTerm) return byTab;
    return byTab.filter(d => 
        d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [donations, activeTab, searchTerm]);
  
  const claimedCount = donations.filter(d => d.claimed).length;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-2 text-light-text dark:text-dark-text">NGO Distribution Hub</h1>
      <p className="text-lg text-light-subtle dark:text-gray-400 mb-8">Welcome, Partner! Let's get these meals to those in need.</p>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard icon={HandHeart} title="Donations Claimed" value={claimedCount} />
        <StatCard icon={CheckCircle} title="Available to Claim" value={donations.length - claimedCount} />
      </div>

      <Card>
        {/* Tabs & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex gap-2 p-1 rounded-lg bg-light-input dark:bg-dark-bg">
            <TabButton active={activeTab === 'available'} onClick={() => setActiveTab('available')}>Available for Claim</TabButton>
            <TabButton active={activeTab === 'claimed'} onClick={() => setActiveTab('claimed')}>My Claimed History</TabButton>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-subtle dark:text-gray-400" />
            <input 
              type="text"
              placeholder="Search donations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50"
            />
          </div>
        </div>

        {/* Donation List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredDonations.length > 0 ? (
              filteredDonations.map(donation => (
                <motion.div 
                    key={donation.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 rounded-lg border border-light-border dark:border-dark-border/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <h3 className="text-xl font-bold">{donation.title}</h3>
                    <p className="text-light-subtle dark:text-gray-400">From: <span className="font-semibold">{donation.donor}</span></p>
                    <div className="flex items-center gap-2 text-sm text-light-subtle dark:text-gray-500 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{donation.location} | Quantity: {donation.quantity}</span>
                    </div>
                  </div>
                  {!donation.claimed && (
                    <Button onClick={() => handleClaim(donation.id)} className="w-full sm:w-auto">
                      Claim Donation
                    </Button>
                  )}
                  {donation.claimed && activeTab === 'claimed' && (
                     <span className="text-sm font-bold flex items-center gap-2 text-green-500">
                        <CheckCircle className="w-5 h-5" /> Claimed
                     </span>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-center p-8 text-light-subtle dark:text-gray-400">No donations match your criteria.</p>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};

export default NgoDashboard;