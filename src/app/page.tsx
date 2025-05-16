'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaDiscord, FaTiktok } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function PortfolioPage() {
  const [navOpen, setNavOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);

  const taglines = ['Developer', 'Designer', 'Engineer', 'Creator'];
  const projects = [
    {
      title: 'JustMyLinks',
      href: '/tools/links',
      desc: 'Create a customizable bio link page with themes, analytics, and social integrations.'
    },
    {
      title: 'JustMyWallet',
      href: '/tools/wallet',
      desc: 'Manage payments, subscriptions, and tips in one unified creator monetization dashboard.'
    },
    {
      title: 'JustMyCDN',
      href: '/tools/cdn',
      desc: 'Fast, reliable image and file delivery backed by Supabase storage + usage analytics.'
    },
    {
      title: 'Private CDN',
      href: '/tools/private-cdn',
      desc: 'Secure, private content delivery network for enterprise-grade file distribution.'
    },
    {
      title: 'Simple Sandbox',
      href: '/tools/sandbox',
      desc: 'A live, in-browser code sandbox with support for animations, Three.js 3D scenes, and custom module imports.'
    },
    {
      title: 'Phantom Nodes',
      href: '/tools/phantom-nodes',
      desc: 'Robust VPS and game server hosting with Pterodactyl panel and Proxmox integration for maximum uptime.'
    }
  ];

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % taglines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center bg-bg text-text transition-colors duration-500">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-50">
        <div className="container mx-auto flex items-center p-4">
          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle menu"
          >
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {/* Spacer to push nav to right */}
          <div className="flex-1" />
          {/* Nav Links */}
          <nav className={` ${navOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent p-4 md:p-0 absolute md:relative top-full md:top-auto right-4 md:right-auto rounded-md md:rounded-none shadow-md md:shadow-none`}>
            {['home', 'projects', 'skills', 'contact'].map((sec) => (
              <button
                key={sec}
                onClick={() => { setNavOpen(false); scrollTo(sec); }}
                className="uppercase text-sm font-medium hover:text-primary transition"
              >
                {sec}
              </button>
            ))}
            {mounted && (
              <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6">
        <motion.h1
          className="text-6xl font-bold mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          GGVersed
        </motion.h1>
        {/* Social Icons */}
        <div className="flex space-x-6 mb-6">
          <Link href="https://github.com/yourhandle" target="_blank" className="hover:text-primary transition">
            <FaGithub size={24} className={`${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors`} />
          </Link>
          <Link href="https://discord.com/invite/yourserver" target="_blank" className="hover:text-primary transition">
            <FaDiscord size={24} className={`${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors`} />
          </Link>
          <Link href="https://www.tiktok.com/@yourhandle" target="_blank" className="hover:text-primary transition">
            <FaTiktok size={24} className={`${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors`} />
          </Link>
        </div>
        <div className="h-10 mb-8 relative">
          <AnimatePresence mode="wait">
            <motion.h2
              key={taglineIndex}
              className="text-2xl font-semibold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {taglines[taglineIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>
        <p className="text-lg text-center max-w-md text-gray-700 dark:text-gray-300 mb-16">
          A passionate frontend developer crafting beautiful and performant web applications. Learning backend development, self-taught, and occasionally vibe-code for fun.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full py-16 bg-secondary/10 dark:bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-semibold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Projects
          </motion.h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((proj, idx) => (
              <motion.a
                key={proj.title}
                href={proj.href}
                className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{proj.desc}</p>
                <span className="inline-block mt-4 text-primary font-medium hover:underline">
                  View Project →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full py-16">
        <h2 className="text-4xl font-semibold text-center mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4 px-6">
          {['Next.js', 'React', 'Tailwind', 'TypeScript', 'Framer Motion', 'Node.js', 'Express', 'HTML', 'CSS', 'JavaScript', 'C#', 'Lua'].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-16 bg-primary/20 flex flex-col items-center">
        <h2 className="text-4xl font-semibold mb-4">Get In Touch</h2>
        <p className="mb-6 text-center max-w-md">
          I’m open to collaborating on projects. Reach out via email to start a conversation!
        </p>
        <motion.a
          href="mailto:you@example.com"
          className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition"
          whileHover={{ scale: 1.05 }}
        >
          Say Hello
        </motion.a>
      </section>
    </div>
  );
}
