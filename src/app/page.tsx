// File: src/app/page.tsx
// This is the main portfolio page component, written in TypeScript with JSX (.tsx).
// This version fixes a TypeScript error related to accessing the opacity of a THREE.js material.

'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FaGithub, FaDiscord, FaTiktok } from 'react-icons/fa';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';

// Define the global THREE.js namespace to avoid TS errors
declare global {
  namespace THREE {
    export const Group: typeof import('three')['Group'];
    export const BufferGeometry: typeof import('three')['BufferGeometry'];
    export const BufferAttribute: typeof import('three')['BufferAttribute'];
    export const PointsMaterial: typeof import('three')['PointsMaterial'];
    export const Scene: typeof import('three')['Scene'];
    export const PerspectiveCamera: typeof import('three')['PerspectiveCamera'];
    export const WebGLRenderer: typeof import('three')['WebGLRenderer'];
    export const Vector3: typeof import('three')['Vector3'];
    export const LineSegments: typeof import('three')['LineSegments'];
    export const LineBasicMaterial: typeof import('three')['LineBasicMaterial'];
  }
}

export default function PortfolioPage() {
  const [navOpen, setNavOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);

  // State to track if the device is a mobile device (for performance optimization)
  const [isMobile, setIsMobile] = useState(false);

  // useRef to get a reference to the canvas element. Correctly typed for TypeScript.
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // useRef to store the mouse position for a persistent value that doesn't trigger re-renders
  const mouseRef = useRef({ x: 0, y: 0, z: 0 });

  const taglines = ['Developer', 'Designer', 'Engineer', 'Creator'];
  const projects = [
    { title: 'JustMyLinks', href: 'https://justmylinks.vercel.app', repo: 'https://github.com/ftpggversed/justmylinks', desc: 'Create a customizable bio link page with themes, analytics, and social integrations.', discord: 'https://discord.gg/placeholder' },
    { title: 'JustMyWallet', href: 'https://justmywallet.vercel.app', repo: 'https://github.com/ftpggversed/justmylinks', desc: 'Manage payments, subscriptions, and tips in one unified creator monetization dashboard.', discord: 'https://discord.gg/placeholder' },
    { title: 'JustMyCDN', href: '/tools/cdn', repo: 'https://github.com/ftpggversed/justmycdn', desc: 'Fast, reliable image and file delivery backed by Supabase storage + usage analytics.', discord: 'https://discord.gg/placeholder' },
    { title: 'Private CDN', href: 'https://privatecdn.vercel.app', repo: 'https://github.com/ftpggversed/private-cdn', desc: 'Secure, private content delivery network for enterprise-grade file distribution.', discord: 'https://discord.gg/placeholder' },
    { title: 'Simple Sandbox', href: 'https://simplesandbox.vercel.app', repo: 'https://github.com/ftpggversed/simplesandbox', desc: 'A live, in-browser code sandbox with support for animations, Three.js 3D scenes, and custom module imports.', discord: 'https://discord.gg/placeholder' },
    { title: 'Phantom Nodes', href: 'https://phantomnodes.vercel.app', repo: 'https://github.com/ftpggversed/phantom-nodes', desc: 'Robust VPS and game server hosting with Pterodactyl panel and Proxmox integration for maximum uptime.', discord: 'https://discord.gg/placeholder' },
    { title: 'JavaPvP', href: 'https://javapvp.vercel.app', repo: 'https://github.com/placeholder/javapvp', desc: 'A website for the Lifesteal server owned by NS_Skull.', discord: 'https://discord.gg/DFMh8Jz3' }
  ];

  // Data for the Community Contributions section
  const communityWork = [
    { title: 'Owner', server: 'Soul Network', desc: 'Oversaw all aspects of server management, community engagement, and technical infrastructure for the Minecraft server.', website: '#', discord: 'https://discord.gg/s3rgU7jtJE', retired: false },
    { title: 'Owner', server: 'Phantom Solutions', desc: 'Managed a large Discord server for the Phantom Nodes project, including moderation, community events, and user support.', website: 'https://phantom-nodes.vercel.app', discord: 'https://discord.gg/BBBcbw3kdS', retired: false },
    { title: 'Manager', server: 'CoastSMP', desc: 'Coordinated a team of staff members, handled player relations, and managed day-to-day operations for the Minecraft server.', website: 'https://store.coastsmp.net/', discord: 'https://discord.gg/invite/coastsmp', retired: true },
    { title: 'Manager', server: 'Blossom Network', desc: 'Led a team of moderators and a server-side development team to deliver a smooth and enjoyable experience, but the network has since been reworked and I no longer have any contact information.', website: '#', discord: '#', retired: true },
    { title: 'Support Staff', server: 'Artillex Studios', desc: 'Provided technical support and customer service to community members, resolving issues and ensuring a positive user experience.', website: 'https://www.artillex-studios.com/', discord: 'https://discord.gg/rGgm7duNk7', retired: false }
  ];
  
  // Data for the Skills section, grouped by category
  const skills = [
    {
      category: 'Frontend',
      items: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'Supabase', 'C#', 'SQL']
    },
    {
      category: 'Tools & Technologies',
      items: ['Git', 'GitHub', 'Vercel', 'Docker', 'REST APIs', 'Postman']
    },
    {
      category: 'Game Development',
      items: ['Three.js', 'Lua']
    }
  ];

  // Data for the "Now" page section
  const nowPageContent = {
    title: 'Currently',
    description: "Here's what I'm currently focusing on both professionally and personally.",
    currentFocus: [
      'Learning backend development with Node.js and Supabase.',
      'Developing the "JustMyLinks" project with new features and a better UI.',
      'Contributing to open-source projects on GitHub.',
      'Improving my skills with TypeScript and modern React hooks.',
    ]
  };

  // Data for the new "Certifications" section
  const certifications = [
    {
      title: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      date: 'January 2024',
      url: 'https://www.freecodecamp.org/certification/your-name/responsive-web-design'
    },
    {
      title: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: 'February 2024',
      url: 'https://www.freecodecamp.org/certification/your-name/javascript-algorithms-and-data-structures'
    },
    {
      title: 'Full-Stack Web Development',
      issuer: 'The Odin Project',
      date: 'Ongoing',
      url: 'https://www.theodinproject.com/full-stack-javascript'
    }
  ];

  // Data for the new "Testimonials" section
  const testimonials = [
    {
      quote: 'GGVersed is an incredibly talented and dedicated developer. Their work on our project was a game-changer, and they consistently delivered high-quality code with a great attitude.',
      name: 'Jane Doe',
      title: 'Project Manager at Tech Solutions'
    },
    {
      quote: 'I had the pleasure of working with GGVersed on a complex web application. Their expertise in React and Next.js was instrumental in bringing our vision to life. Highly recommended!',
      name: 'John Smith',
      title: 'Senior Developer at Web Innovators'
    },
    {
      quote: 'The creativity and attention to detail GGVersed brings to every project is outstanding. They are a joy to work with and a valuable asset to any team.',
      name: 'Alex Johnson',
      title: 'Designer at Creative Studios'
    }
  ];

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const iv = setInterval(() => setTaglineIndex(i => (i + 1) % taglines.length), 2500);
    return () => clearInterval(iv);
  }, [taglines.length]);

  // THREE.js Particle Web Effect
  useEffect(() => {
    const isMobileDevice = window.innerWidth <= 768; // Tailwind's 'md' breakpoint
    setIsMobile(isMobileDevice);

    if (isMobileDevice) {
        // Do not run the three.js animation on mobile
        return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let particles: THREE.Points;
    let lines: THREE.LineSegments;
    
    // Particle parameters
    const particleCount = 1000;
    const particleDistance = 15; // Increased distance for a denser web
    const particleSpeed = 0.05;

    // Data for particles
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    // Initial setup
    const init = () => {
      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 100);

      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Populate initial particle data
      for (let i = 0; i < particleCount * 3; i += 3) {
        // Random positions within a cube
        particlePositions[i] = Math.random() * 200 - 100;
        particlePositions[i + 1] = Math.random() * 200 - 100;
        particlePositions[i + 2] = Math.random() * 200 - 100;

        // Random initial velocity
        particleVelocities[i] = (Math.random() - 0.5) * particleSpeed;
        particleVelocities[i + 1] = (Math.random() - 0.5) * particleSpeed;
        particleVelocities[i + 2] = (Math.random() - 0.5) * particleSpeed;

        // Set colors
        particleColors[i] = 0.5;
        particleColors[i + 1] = 0.8;
        particleColors[i + 2] = 1.0;
      }
      
      // Particles Geometry and Material
      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8
      });
      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      // Lines Geometry and Material
      const linesGeometry = new THREE.BufferGeometry();
      // Estimate max lines for pre-allocation
      const maxLines = particleCount * (particleCount - 1) / 2;
      linesGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxLines * 2 * 3), 3));
      linesGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(maxLines * 2 * 3), 3));
      lines = new THREE.LineSegments(linesGeometry, new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true
      }));
      scene.add(lines);

      window.addEventListener('resize', onWindowResize);
      window.addEventListener('mousemove', onMouseMove);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to [-1, 1] range
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const animate = () => {
      requestAnimationFrame(animate);

      // Update particle positions and apply forces
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const linePositions = lines.geometry.attributes.position.array as Float32Array;
      const lineColors = lines.geometry.attributes.color.array as Float32Array;
      const particleColors = particles.geometry.attributes.color.array as Float32Array;
      let lineIndex = 0;

      // Mouse position in 3D space
      const mouseVector = new THREE.Vector3(mouseRef.current.x * 100, mouseRef.current.y * 100, 0);

      // Update particles
      for (let i = 0; i < particleCount * 3; i += 3) {
        // Move particle
        positions[i] += particleVelocities[i];
        positions[i + 1] += particleVelocities[i + 1];
        positions[i + 2] += particleVelocities[i + 2];

        // Apply a repulsive force from the mouse
        const particleVector = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
        const distance = particleVector.distanceTo(mouseVector);
        
        // Repulsion force is much stronger now, with a defined falloff radius
        if (distance < 50) {
          const force = mouseVector.clone().sub(particleVector).normalize().multiplyScalar(-10 / distance);
          positions[i] += force.x;
          positions[i + 1] += force.y;
          positions[i + 2] += force.z;
          
          // Animate particle color based on proximity to mouse
          const influence = 1 - Math.min(1, distance / 50); // 0 to 1
          particleColors[i] = 0.5 + 0.5 * influence;
          particleColors[i + 1] = 0.8;
          particleColors[i + 2] = 1.0;
        } else {
          // Reset color if not near the mouse
          particleColors[i] = 0.5;
          particleColors[i + 1] = 0.8;
          particleColors[i + 2] = 1.0;
        }

        // Keep particles within bounds
        if (Math.abs(positions[i]) > 100) particleVelocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 100) particleVelocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 100) particleVelocities[i + 2] *= -1;
      }

      // Rebuild line segments based on proximity
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1_idx = i * 3;
          const p2_idx = j * 3;
          
          const dx = positions[p1_idx] - positions[p2_idx];
          const dy = positions[p1_idx + 1] - positions[p2_idx + 1];
          const dz = positions[p1_idx + 2] - positions[p2_idx + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          // Also check distance to mouse for lines
          const p1Vector = new THREE.Vector3(positions[p1_idx], positions[p1_idx + 1], positions[p1_idx + 2]);
          const p2Vector = new THREE.Vector3(positions[p2_idx], positions[p2_idx + 1], positions[p2_idx + 2]);
          const midPoint = p1Vector.add(p2Vector).divideScalar(2);
          const distToMouse = midPoint.distanceTo(mouseVector);
          
          if (distance < particleDistance) {
            linePositions[lineIndex++] = positions[p1_idx];
            linePositions[lineIndex++] = positions[p1_idx + 1];
            linePositions[lineIndex++] = positions[p1_idx + 2];
            linePositions[lineIndex++] = positions[p2_idx];
            linePositions[lineIndex++] = positions[p2_idx + 1];
            linePositions[lineIndex++] = positions[p2_idx + 2];

            // Animate line color and opacity based on proximity to mouse
            const lineInfluence = 1 - Math.min(1, distToMouse / 50); // 0 to 1
            const lineOpacity = 0.2 + lineInfluence * 0.8; // Opacity goes from 0.2 to 1.0
            const lineColor = new THREE.Color(0x88ccff).lerp(new THREE.Color(0xffffff), lineInfluence);
            
            // FIX: Add a type assertion to tell TypeScript that material is not an array
            (lines.material as THREE.LineBasicMaterial).opacity = lineOpacity;

            // Set color for the line vertices
            lineColors[lineIndex - 6] = lineColor.r;
            lineColors[lineIndex - 5] = lineColor.g;
            lineColors[lineIndex - 4] = lineColor.b;
            lineColors[lineIndex - 3] = lineColor.r;
            lineColors[lineIndex - 2] = lineColor.g;
            lineColors[lineIndex - 1] = lineColor.b;
          }
        }
      }
      
      // Clear unused line positions and colors
      for (let i = lineIndex; i < lines.geometry.attributes.position.array.length; i++) {
        linePositions[i] = 0;
        lineColors[i] = 0;
      }
      
      lines.geometry.attributes.position.needsUpdate = true;
      lines.geometry.attributes.color.needsUpdate = true;
      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.color.needsUpdate = true;
      
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [isMobile]); // Rerun effect when isMobile changes

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-bg text-text transition-colors duration-500 overflow-hidden">
      
      {/* The 3D canvas element for the wavy background */}
      {/* Conditionally render the canvas based on isMobile state */}
      {!isMobile && (
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-50">
        <div className="container mx-auto flex justify-end items-center p-4 space-x-4">
          {/* Mobile: Hamburger + Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setNavOpen(o => !o)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle menu"
            >
              {navOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
          </div>
          {/* Desktop Nav + Theme */}
          <nav className="hidden md:flex items-center space-x-6">
            {['home', 'now', 'projects', 'community', 'skills', 'certifications', 'testimonials', 'contact'].map(sec => (
              <button
                key={sec}
                onClick={() => scrollTo(sec)}
                className="uppercase text-sm font-medium hover:text-primary transition"
              >
                {sec}
              </button>
            ))}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
          </nav>
        </div>
        {/* Mobile Dropdown */}
        <nav
          className={`${navOpen ? 'flex' : 'hidden'} md:hidden flex-col space-y-2 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md p-4 mx-4 rounded-b-lg shadow-lg`}
        >
          {['home', 'now', 'projects', 'community', 'skills', 'certifications', 'testimonials', 'contact'].map(sec => (
            <button
              key={sec}
              onClick={() => { setNavOpen(false); scrollTo(sec); }}
              className="w-full text-left uppercase text-sm font-medium hover:text-primary transition"
            >
              {sec}
            </button>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 relative z-10">

        {/* Profile Picture */}
        <div className="mb-6">
          <Image
            src="/images/kuromi.jpg"
            alt="Profile Picture"
            width={150}
            height={150}
            className="rounded-full border-4 border-primary"
          />
        </div>

        <motion.h1
          className="text-6xl font-bold mb-4 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
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
      
      {/* Now Section */}
      <section id="now" className="w-full py-16 bg-secondary/10 dark:bg-secondary/20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-semibold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {nowPageContent.title}
          </motion.h2>
          <p className="text-lg text-center max-w-2xl mx-auto mb-8 text-gray-700 dark:text-gray-300">
            {nowPageContent.description}
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {nowPageContent.currentFocus.map((item, i) => (
              <motion.div
                key={i}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full py-16 bg-secondary/10 dark:bg-secondary/20 relative z-10">
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
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                className="relative block p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
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
                    {p.repo && (
                      <Link href={p.repo} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition">
                        <FaGithub size={20} />
                      </Link>
                    )}
                    {p.discord && (
                      <a href={p.discord} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition">
                        <FaDiscord className="mr-2" />
                        Discord
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="w-full py-16 bg-secondary/10 dark:bg-secondary/20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-semibold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Community Contributions
          </motion.h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {communityWork.map((item, i) => (
              <motion.div
                key={item.server}
                className="relative block p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <div className="absolute top-3 right-3 flex space-x-2">
                  {item.retired && (
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      Retired
                    </span>
                  )}
                  <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                    {item.title}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.server}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                <div className="mt-4 flex justify-between items-center">
                  {/* Conditional rendering for website link */}
                  {item.website && item.website !== '#' ? (
                    <Link href={item.website} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                      Website →
                    </Link>
                  ) : (
                    <span className="text-gray-500">Website: N/A</span>
                  )}
                  
                  {/* Conditional rendering for discord link */}
                  {item.discord && item.discord !== '#' ? (
                    <a
                      href={item.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition"
                    >
                      <FaDiscord className="mr-2" />
                      Join Discord
                    </a>
                  ) : (
                    <span className="text-gray-500">Discord: N/A</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full py-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-semibold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Skills
          </motion.h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skillCategory, i) => (
              <motion.div
                key={skillCategory.category}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-primary/30">{skillCategory.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full text-primary text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="w-full py-16 bg-secondary/10 dark:bg-secondary/20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-semibold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Certifications
          </motion.h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <motion.a
                key={cert.title}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cert.date}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-16 bg-secondary/10 dark:bg-secondary/20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-semibold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Testimonials
          </motion.h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="relative block p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-16 bg-primary/20 flex flex-col items-center relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left max-w-md">
            <h2 className="text-4xl font-semibold mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Feel free to reach out to me for collaborations, questions, or just to say hello! You can connect with me through the links below or send me an email.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <motion.a
              href="mailto:you@example.com"
              className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              Send an Email
            </motion.a>
            <div className="flex space-x-6">
              <Link href="https://github.com/ftpggversed" target="_blank" className="text-gray-700 dark:text-gray-300 hover:text-primary transition">
                <FaGithub size={30} />
              </Link>
              <Link href="https://discord.gg/BBBcbw3kdS" target="_blank" className="text-gray-700 dark:text-gray-300 hover:text-primary transition">
                <FaDiscord size={30} />
              </Link>
              <Link href="https://www.tiktok.com/@ftpggversed" target="_blank" className="text-gray-700 dark:text-gray-300 hover:text-primary transition">
                <FaTiktok size={30} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
