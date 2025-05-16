'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaDiscord, FaTiktok } from 'react-icons/fa';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function PortfolioPage() {
  const [navOpen, setNavOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);

  const taglines = ['Developer', 'Designer', 'Engineer', 'Creator'];
  const projects = [
    { title: 'JustMyLinks', href: 'https://justmylinks.vercel.app', repo: 'https://github.com/ftpggversed/justmylinks', desc: 'Create a customizable bio link page with themes, analytics, and social integrations.' },
    { title: 'JustMyWallet', href: 'https://justmywallet.vercel.app', repo: 'https://github.com/ftpggversed/justmywallet', desc: 'Manage payments, subscriptions, and tips in one unified creator monetization dashboard.' },
    { title: 'JustMyCDN', href: '/tools/cdn', repo: 'https://github.com/ftpggversed/justmycdn', desc: 'Fast, reliable image and file delivery backed by Supabase storage + usage analytics.' },
    { title: 'Private CDN', href: 'https://privatecdn.vercel.app', repo: 'https://github.com/ftpggversed/private-cdn', desc: 'Secure, private content delivery network for enterprise-grade file distribution.' },
    { title: 'Simple Sandbox', href: 'https://simplesandbox.vercel.app', repo: 'https://github.com/ftpggversed/simplesandbox', desc: 'A live, in-browser code sandbox with support for animations, Three.js 3D scenes, and custom module imports.' },
    { title: 'Phantom Nodes', href: 'https://phantomnodes.vercel.app', repo: 'https://github.com/ftpggversed/phantom-nodes', desc: 'Robust VPS and game server hosting with Pterodactyl panel and Proxmox integration for maximum uptime.' }
  ];

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const iv = setInterval(() => setTaglineIndex(i => (i + 1) % taglines.length), 2500);
    return () => clearInterval(iv);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="flex flex-col items-center bg-bg text-text transition-colors duration-500">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-50">
        <div className="container mx-auto flex justify-end items-center p-4 space-x-4">
          {/* Nav Links */}
          <nav className={`${navOpen ? 'flex' : 'hidden'} md:flex items-center space-x-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-md p-4 md:p-0 absolute md:relative top-full md:top-auto right-4 md:right-auto shadow-lg md:shadow-none`}>
            {['home','projects','skills','contact'].map(sec => (
              <button key={sec}
                onClick={() => { setNavOpen(false); scrollTo(sec); }}
                className="uppercase text-sm font-medium hover:text-primary transition"
              >{sec}</button>
            ))}
            {mounted && (
              <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                {theme==='dark'?<Sun size={20}/>:<Moon size={20}/>}              
              </button>
            )}
          </nav>
          {/* Hamburger Toggle */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setNavOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {navOpen? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 pt-20">
        <motion.h1
          className="text-6xl font-bold mb-4"
          initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.8}}
        >
          GGVersed
        </motion.h1>
        {/* Social Icons */}
        <div className="flex space-x-6 mb-6">
          <Link href="https://github.com/ftpggversed" target="_blank" className="hover:text-primary transition">
            <FaGithub size={24} className={`${!mounted || theme === 'dark' ? 'text-white' : 'text-black'} transition-colors`} />
          </Link>
          <Link href="https://discord.gg/BBBcbw3kdS" target="_blank" className="hover:text-primary transition">
            <FaDiscord size={24} className={`${!mounted || theme === 'dark' ? 'text-white' : 'text-black'} transition-colors`} />
          </Link>
          <Link href="https://www.tiktok.com/@ftpggversed" target="_blank" className="hover:text-primary transition">
            <FaTiktok size={24} className={`${!mounted || theme === 'dark' ? 'text-white' : 'text-black'} transition-colors`} />
          </Link>
        </div>
        <div className="h-10 mb-8 relative">
          <AnimatePresence mode="wait">
            <motion.h2 key={taglineIndex} className="text-2xl font-semibold"
              initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-20,opacity:0}} transition={{duration:0.5}}
            >{taglines[taglineIndex]}</motion.h2>
          </AnimatePresence>
        </div>
        <p className="text-lg text-center max-w-md text-gray-700 dark:text-gray-300 mb-16">
          A passionate frontend developer crafting beautiful and performant web applications. Learning backend development, self-taught, and occasionally vibe-code for fun.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full py-16 bg-secondary/10 dark:bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-4xl font-semibold text-center mb-8"
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.6}}
          >Projects</motion.h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p,i)=>(
              <motion.div
                key={p.title}
                className="relative block p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                {/* Badge */}
                <span className="absolute top-3 right-3 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  In Development
                </span>
                <Link href={p.href} className="block">
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400">{p.desc}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Link href={p.href} className="text-primary font-medium hover:underline">
                    View Project →
                  </Link>
                  <div className="flex items-center space-x-2">
                    <Link href={p.repo} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition">
                      <FaGithub size={20} />
                    </Link>
                    <a
                      href="https://discord.gg/BBBcbw3kdS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                    >
                      <FaDiscord className="mr-2" />
                      Join Discord
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full py-16">
        <h2 className="text-4xl font-semibold text-center mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4 px-6">
          {['Next.js','React','Tailwind','TypeScript','Framer Motion','Node.js','Express','HTML','CSS','JavaScript','C#','Lua'].map(skill=>(
            <span key={skill} className="px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-primary">{skill}</span>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-16 bg-primary/20 flex flex-col items-center">
        <h2 className="text-4xl font-semibold mb-4">Get In Touch</h2>
        <p className="mb-6 text-center max-w-md">I’m open to collaborating on projects. Reach out via email to start a conversation!</p>
        <motion.a href="mailto:you@example.com"
          className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition"
          whileHover={{scale:1.05}}
        >Say Hello</motion.a>
      </section>
    </div>
  );
}
