'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFoundPage() {
  const [navOpen, setNavOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const sections = ['home', 'projects', 'skills', 'contact'];

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text transition-colors duration-500">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/30 dark:bg-gray-900/30 backdrop-blur-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className="text-2xl font-bold text-black dark:text-white">
            GGVersed
          </Link>
          <div className="flex items-center space-x-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              {sections.map((sec) => (
                <button
                  key={sec}
                  onClick={() => document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' })}
                  className="uppercase text-sm font-medium text-black dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  {sec}
                </button>
              ))}
            </nav>
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700 transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            {/* Mobile Toggle */}
            <button
              onClick={() => setNavOpen((o) => !o)}
              className="md:hidden p-2 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700 transition"
              aria-label="Toggle menu"
            >
              {navOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Dropdown */}
        {navOpen && (
          <nav className="md:hidden flex flex-col space-y-2 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md p-4 mx-4 rounded-b-lg shadow-lg">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  setNavOpen(false);
                  document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left uppercase text-sm font-medium text-black dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                {sec}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* 404 Hero */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-32">
        <motion.h1
          className="text-indigo-500 dark:text-indigo-400 text-8xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Lost in the Code?
        </motion.h1>
        <motion.p
          className="text-2xl text-black dark:text-gray-200 mb-6 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          It seems you’ve ventured into a phantom route. Let’s get you back on track!
        </motion.p>
        <motion.div
          className="flex space-x-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            href="/"
            className="px-6 py-3 bg-indigo-500 dark:bg-indigo-400 text-white font-semibold rounded-full hover:opacity-90 transition"
          >
            Home
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-800 dark:text-gray-400">
        © {new Date().getFullYear()} GGVersed. Crafted with passion.
      </footer>
    </div>
  );
}
