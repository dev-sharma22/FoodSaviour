import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Users, Heart, Target, Zap } from 'lucide-react';

// --- For better management, we'll define our team data here ---
const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Founder & Visionary',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop',
    bio: 'Inspired by a passion to end hunger, Alex founded Food Savior to bridge the gap between waste and want.'
  },
  {
    name: 'Maria Garcia',
    role: 'Lead Developer',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop',
    bio: 'Maria architects the technology that powers our platform, ensuring a seamless experience for all our users.'
  },
  {
    name: 'David Chen',
    role: 'Community Outreach',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
    bio: 'David builds relationships with our NGO partners and volunteer networks, expanding our impact every day.'
  },
];

// --- A reusable sub-component for team member cards to keep the code clean ---
const TeamMemberCard = ({ name, role, imageUrl, bio }) => (
  <Card className="text-center hover:-translate-y-2 transition-transform duration-300">
    <img src={imageUrl} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20" />
    <h3 className="text-xl font-bold">{name}</h3>
    <p className="text-primary font-semibold mb-2">{role}</p>
    <p className="text-light-subtle dark:text-gray-400">{bio}</p>
  </Card>
);

// --- The main page component ---
const AboutPage = () => {
  return (
    <div className="bg-light-bg dark:bg-dark-bg">
      {/* ===================================
          HERO SECTION with Background Image
      ==================================== */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white px-6">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <motion.img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
            alt="Volunteers working together"
            className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Our Story, Our Mission.</h1>
          <p className="text-xl md:text-2xl mt-4 max-w-3xl mx-auto text-slate-200">
            We are a community-driven movement dedicated to fighting hunger by intelligently redirecting surplus food.
          </p>
        </motion.div>
      </section>

      {/* ===================================
          OUR GUIDING PRINCIPLES SECTION
      ==================================== */}
      <section className="container mx-auto px-6 py-20 md:py-24">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            { icon: Target, title: 'Purpose-Driven', description: 'Every feature we build is designed with one goal: to efficiently get food to those who need it most.' },
            { icon: Heart, title: 'Community First', description: 'We empower local heroes—donors, volunteers, and NGOs—to create a powerful, self-sustaining network of change.' },
            { icon: Zap, title: 'Action & Impact', description: 'We believe in moving fast and making a tangible impact. Our success is measured in meals served and lives touched.' }
          ].map((principle, index) => (
             <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
             >
              <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                <principle.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{principle.title}</h3>
              <p className="text-light-subtle dark:text-gray-400">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================================
          MEET THE TEAM SECTION
      ==================================== */}
      <section className="bg-light-card dark:bg-dark-card border-y border-light-border dark:border-dark-border/20 py-20 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-light-text dark:text-dark-text mb-4">The People Behind the Passion</h2>
          <p className="text-lg text-center text-light-subtle dark:text-gray-400 mb-16 max-w-3xl mx-auto">We are a small but dedicated team of volunteers united by a single, powerful mission.</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TeamMemberCard {...member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================
          FINAL CALL TO ACTION
      ==================================== */}
      <section className="container mx-auto px-6 py-20 md:py-24 text-center">
        <h2 className="text-4xl font-bold text-light-text dark:text-dark-text">Ready to Be Part of Our Story?</h2>
        <p className="text-lg text-light-subtle dark:text-gray-400 my-6 max-w-2xl mx-auto">
          This mission is bigger than us—it requires a community. Your skills, time, and passion can make a world of difference.
        </p>
        <Link to="/register">
          <Button className="!px-8 !py-3 !text-lg">
            Join the Movement
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;