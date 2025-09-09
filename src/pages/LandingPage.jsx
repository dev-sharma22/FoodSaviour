import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ArrowRight, UtensilsCrossed, HandHeart, ShieldCheck, Users, Wheat } from 'lucide-react';
import AnimatedCounter from '../components/motion/AnimatedCounter';

// Reusable component for section titles
const SectionTitle = ({ children }) => (
  <h2 className="text-4xl md:text-5xl font-extrabold text-center text-light-text dark:text-dark-text">{children}</h2>
);

// Reusable component for section subtitles
const SectionSubtitle = ({ children }) => (
  <p className="text-lg text-center text-light-subtle dark:text-gray-400 mt-4 max-w-3xl mx-auto">{children}</p>
);

const LandingPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Animation variants for staggered text
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="overflow-x-hidden">
      {/* ===================================
          HERO SECTION WITH VIDEO
      ==================================== */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center text-white px-6 py-20">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            // You can replace this src with your own video file
            src="\public\mixkit-colored-powders-in-a-colorful-explosion-51809-full-hd.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.h1
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            {"Donate Food, Save Lives.".split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8">
            A seamless platform connecting food donors, volunteers, and NGOs to combat hunger and reduce waste.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button variant="primary-on-dark">Join Now <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="secondary-on-dark">Learn More</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ===================================
          IMPACT NUMBERS SECTION
      ==================================== */}
      <section ref={ref} className="py-20 bg-light-card dark:bg-dark-card border-y border-light-border dark:border-dark-border/20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <Wheat className="w-12 h-12 text-primary mx-auto mb-4"/>
            <h3 className="text-5xl font-bold text-light-text dark:text-dark-text">
              {isInView && <AnimatedCounter to={10500} />} +
            </h3>
            <p className="text-light-subtle dark:text-gray-400 mt-2">Meals Donated</p>
          </div>
          <div className="p-4">
            <Users className="w-12 h-12 text-primary mx-auto mb-4"/>
            <h3 className="text-5xl font-bold text-light-text dark:text-dark-text">
              {isInView && <AnimatedCounter to={350} />} +
            </h3>
            <p className="text-light-subtle dark:text-gray-400 mt-2">Active Volunteers</p>
          </div>
          <div className="p-4">
            <HandHeart className="w-12 h-12 text-primary mx-auto mb-4"/>
            <h3 className="text-5xl font-bold text-light-text dark:text-dark-text">
              {isInView && <AnimatedCounter to={50} />} +
            </h3>
            <p className="text-light-subtle dark:text-gray-400 mt-2">NGO Partners</p>
          </div>
        </div>
      </section>

      {/* ===================================
          HOW IT WORKS SECTION
      ==================================== */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <SectionTitle>A Simple, Powerful Process</SectionTitle>
        <SectionSubtitle>We've streamlined the process of donation to ensure food gets to where it's needed—fast.</SectionSubtitle>
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
          {[
            { icon: HandHeart, title: 'Post a Donation', description: 'Donors with surplus food list items on our platform in under 60 seconds.' },
            { icon: UtensilsCrossed, title: 'Volunteer & Collect', description: 'Our volunteers are notified, accept missions, and collect food donations promptly.' },
            { icon: ShieldCheck, title: 'Distribute with NGOs', description: 'Food is delivered to our trusted NGO partners for safe and effective distribution.' }
          ].map((step, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }}>
              <Card className="h-full text-center hover:border-primary hover:-translate-y-2 transition-all duration-300">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-light-subtle dark:text-gray-400">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================================
          CALL TO ACTION SECTION
      ==================================== */}
       <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="bg-primary text-white text-center py-12 px-6">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-4xl font-extrabold mb-4">
              Ready to Make a Difference?
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="text-lg text-indigo-200 max-w-2xl mx-auto mb-8">
              Whether you have food to give, time to volunteer, or a network to share, your contribution is vital. Join the Food Savior community today.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button variant="primary-on-dark">Become a Donor</Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary-on-dark">Join as Volunteer</Button>
              </Link>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;