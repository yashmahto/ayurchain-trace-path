import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo & Brand */}
        <div className="flex items-center space-x-3">
          <span className="font-bold text-xl text-foreground">AyurChain</span>
          <span className="text-muted-foreground text-sm">© {new Date().getFullYear()}</span>
        </div>
        {/* Center: Navigation */}
        <nav className="flex space-x-4 text-sm">
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/batch-lookup" className="hover:text-primary transition-colors">Batch Lookup</Link>
          <Link to="/consumer-portal" className="hover:text-primary transition-colors">Consumer Portal</Link>
          <Link to="/regulator-dashboard" className="hover:text-primary transition-colors">Regulator Dashboard</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>
        {/* Right: Socials */}
        <div className="flex space-x-3">
          <a href="https://github.com/yashmahto/ayurchain-trace-path" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="mailto:contact@ayurchain.com" className="hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
