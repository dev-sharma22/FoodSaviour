import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { HandHeart, UtensilsCrossed, ShieldCheck, Star, ArrowDown } from 'lucide-react';

// --- Step 1: Create a reusable component for each step in the timeline ---
const TimelineStep = ({ icon: Icon, title, description, isLast = false, index }) => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2 } }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="relative pl-16"
    >
      {/* The timeline's vertical line and icon */}
      <div className="absolute left-0 top-1 flex flex-col items-center">
        <div className="flex-shrink-0 bg-primary/10 p-4 rounded-full border-2 border-primary/20">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        {!isLast && (
          <div className="h-full w-px bg-primary/30 mt-2"></div>
        )}
      </div>
      
      {/* The content card for the step */}
      <div className="ml-4">
        <h3 className="text-2xl font-bold mb-2 text-light-text dark:text-dark-text">{title}</h3>
        <p className="text-light-subtle dark:text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};


// --- Step 2: Assemble the new page layout ---
const HowItWorksPage = () => {
  const steps = [
    { 
      icon: HandHeart, 
      title: 'It Starts with a Simple Act of Kindness', 
      description: 'A donor has surplus food. Instead of letting it go to waste, they take a minute to post it on our platform. This single act sets in motion a chain of hope.' 
    },
    { 
      icon: UtensilsCrossed, 
      title: 'A Hero Accepts the Call', 
      description: 'Our network of passionate student volunteers sees the new donation. A local hero accepts the mission, ready to bridge the gap between surplus and need.' 
    },
    { 
      icon: ShieldCheck, 
      title: 'Quality and Safety First', 
      description: 'Our admin team quickly verifies every submission. We ensure the donation is safe and coordinate the logistics for a smooth, reliable pickup.' 
    },
    { 
      icon: Star, 
      title: 'A Meal, A Smile, An Impact', 
      description: 'The food is delivered to a trusted NGO partner or a community event, reaching the hands of those who need it most. It’s more than a meal; it’s a message that someone cares.' 
    },
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-dark-text"
        >
          Our Journey of Hope
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-light-subtle dark:text-gray-400 mt-4 max-w-3xl mx-auto"
        >
          Every donation creates a powerful ripple effect. Follow the journey from a simple post to a heartfelt meal.
        </motion.p>
      </div>

      {/* The new vertical timeline */}
      <div className="max-w-3xl mx-auto space-y-16">
        {steps.map((step, index) => (
          <TimelineStep
            key={index}
            index={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>

      {/* Motivational Closing Section */}
      <div className="text-center mt-24">
        <Card className="max-w-4xl mx-auto py-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-light-text dark:text-dark-text">Your Chapter in This Story Starts Here</h2>
            <p className="text-lg text-light-subtle dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              You have the power to start the next journey. Whether by donating, volunteering, or partnering with us, you can be the reason someone has a meal tonight.
            </p>
            <div className="mt-8">
              <Link to="/register">
                <Button className="!px-8 !py-3 !text-lg">
                  Join the Mission
                </Button>
              </Link>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default HowItWorksPage;