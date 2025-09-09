import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plus, List, CheckCircle, Clock, XCircle, Edit, Trash2, Gift, Wheat } from 'lucide-react';
import AnimatedCounter from '../components/motion/AnimatedCounter';

// --- MOCK DATA for a richer experience ---
const previousDonations = [
  { id: 1, title: 'Leftover Birthday Party Pizza', quantity: '5 boxes', status: 'Completed', date: '2025-08-01' },
  { id: 2, title: 'Catering Sandwiches', quantity: '3 trays', status: 'Approved', date: '2025-08-03' },
  { id: 3, title: 'Bananas and Apples', quantity: '1 crate', status: 'Pending', date: '2025-08-05' },
];

const initialFormState = { title: '', description: '', quantity: '', bestBefore: '', location: '' };

// --- Reusable Sub-Components for a manageable layout ---
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
      active
        ? 'bg-primary text-white'
        : 'text-light-subtle dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-dark-card'
    }`}
  >
    {children}
  </button>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
    Approved: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
    Completed: 'bg-green-500/20 text-green-600 dark:text-green-400',
  };
  const icons = { Pending: Clock, Approved: CheckCircle, Completed: CheckCircle };
  const Icon = icons[status] || Clock;

  return (
    <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

// --- The Main Dashboard Component ---
const DonorDashboard = () => {
  const [donationData, setDonationData] = useState(initialFormState);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('new');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting donation:', donationData);
    setSuccessMessage('Thank you! Your donation has been submitted for approval.');
    setDonationData(initialFormState);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* ===================================
          HEADER & STATS
      ==================================== */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-light-text dark:text-dark-text">Welcome, Donor!</h1>
        <p className="text-lg text-light-subtle dark:text-gray-400">Thank you for making a difference.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="flex items-center gap-4">
            <Gift className="w-10 h-10 text-primary flex-shrink-0" />
            <div>
                <p className="text-light-subtle dark:text-gray-400">Total Donations</p>
                <p className="text-2xl font-bold"><AnimatedCounter to={previousDonations.length} /></p>
            </div>
        </Card>
        <Card className="flex items-center gap-4">
            <Wheat className="w-10 h-10 text-green-500 flex-shrink-0" />
            <div>
                <p className="text-light-subtle dark:text-gray-400">Meals Provided (Est.)</p>
                <p className="text-2xl font-bold"><AnimatedCounter to={137} /></p>
            </div>
        </Card>
      </div>

      {/* ===================================
          TABS
      ==================================== */}
      <div className="flex gap-2 mb-6">
        <TabButton active={activeTab === 'new'} onClick={() => setActiveTab('new')}>
          <Plus className="w-4 h-4" /> Post a New Donation
        </TabButton>
        <TabButton active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
          <List className="w-4 h-4" /> My Donation History
        </TabButton>
      </div>

      {/* ===================================
          TAB CONTENT
      ==================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'new' && (
            <Card>
              <h2 className="text-2xl font-bold mb-4">Post Leftover Food</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ... Form inputs ... */}
                <input type="text" name="title" value={donationData.title} onChange={handleChange} placeholder="Food Title (e.g., Leftover Pizza)" required className="w-full p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50" />
                <textarea name="description" value={donationData.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50" rows="3"></textarea>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input type="text" name="quantity" value={donationData.quantity} onChange={handleChange} placeholder="Quantity (e.g., 5 boxes)" required className="w-full p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50" />
                    <input type="text" name="bestBefore" value={donationData.bestBefore} onChange={handleChange} placeholder="Best Before (e.g., 10 PM today)" required className="w-full p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50" />
                </div>
                <input type="text" name="location" value={donationData.location} onChange={handleChange} placeholder="Pickup Location" required className="w-full p-2 rounded bg-light-input dark:bg-dark-bg border border-light-border dark:border-dark-border/50" />
                <input type="file" className="w-full text-sm text-light-subtle dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover" />
                <Button type="submit" className="w-full">Post Donation</Button>
                {successMessage && <div className="p-3 text-center bg-green-500/20 text-green-700 dark:text-green-300 rounded-md">{successMessage}</div>}
              </form>
            </Card>
          )}

          {activeTab === 'history' && (
            <Card>
              <h2 className="text-2xl font-bold mb-4">My Donation History</h2>
              <div className="space-y-4">
                {previousDonations.map(donation => (
                  <div key={donation.id} className="p-4 rounded-lg border border-light-border dark:border-dark-border/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-sm text-light-subtle dark:text-gray-500">{new Date(donation.date).toLocaleDateString()}</p>
                      <h3 className="font-bold text-lg text-light-text dark:text-dark-text">{donation.title}</h3>
                      <p className="text-sm text-light-subtle dark:text-gray-400">Quantity: {donation.quantity}</p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <StatusBadge status={donation.status} />
                        {donation.status === 'Pending' && <Button variant="secondary" className="!p-2"><Trash2 className="w-4 h-4" /></Button>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DonorDashboard;