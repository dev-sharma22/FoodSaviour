const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full border-t border-main-purple/20 bg-dark-purple py-4">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Food Savior. All rights reserved.</p>
        <p>Saving lives, one meal at a time.</p>
      </div>
    </footer>
  );
};

export default Footer;