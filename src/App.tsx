/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

// === Inline Icons ===
const GoldenStrawberry = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
    <path d="M12 21.5C12 21.5 6 16.5 4.5 11.5C3.5 8.5 4.5 5.5 7 4C9.5 2.5 12 5 12 5C12 5 14.5 2.5 17 4C19.5 5.5 20.5 8.5 19.5 11.5C18 16.5 12 21.5 12 21.5Z" fill="url(#goldGradient)" stroke="#F59E0B" strokeWidth="0.5"/>
    <path d="M12 3C11 1.5 9 1.5 9 1.5C9 1.5 10 3.5 11 4C11.5 4 12 3.5 12 3Z" fill="#10B981" stroke="#047857" strokeWidth="0.5"/>
    <path d="M12 3C13 1.5 15 1.5 15 1.5C15 1.5 14 3.5 13 4C12.5 4 12 3.5 12 3Z" fill="#10B981" stroke="#047857" strokeWidth="0.5"/>
    <circle cx="8.5" cy="8.5" r="0.8" fill="#FEF3C7"/>
    <circle cx="15.5" cy="8.5" r="0.8" fill="#FEF3C7"/>
    <circle cx="10" cy="12" r="0.8" fill="#FEF3C7"/>
    <circle cx="14" cy="12" r="0.8" fill="#FEF3C7"/>
    <circle cx="12" cy="15" r="0.8" fill="#FEF3C7"/>
    <defs>
      <linearGradient id="goldGradient" x1="4" y1="4" x2="20" y2="21.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A"/>
        <stop offset="0.5" stopColor="#F59E0B"/>
        <stop offset="1" stopColor="#D97706"/>
      </linearGradient>
    </defs>
  </svg>
);


// === Scene Components ===

const Prologue: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (slide === 0) {
      timeout = setTimeout(() => setSlide(1), 800);
    } else if (slide === 1) {
      timeout = setTimeout(() => setSlide(2), 3500);
    } else if (slide === 2) {
      timeout = setTimeout(() => setSlide(3), 3500);
    } else if (slide === 3) {
      timeout = setTimeout(() => setSlide(4), 4000);
    } else if (slide === 4) {
      onComplete();
    }
    return () => clearTimeout(timeout);
  }, [slide, onComplete]);

  const texts = [
    "",
    "Hey Matunda...",
    "Today is the day.",
    "I built this space for us. But first, I have one question..."
  ];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 text-center z-20 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
    >
      <AnimatePresence mode="wait">
        {slide > 0 && slide <= 3 && (
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-2xl sm:text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-rose-500 via-pink-600 to-rose-800 max-w-3xl leading-relaxed tracking-wide italic"
          >
            {texts[slide]}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Proposal: React.FC<{ onAccept: () => void; onBack: () => void }> = ({ onAccept, onBack }) => {
  const [noCount, setNoCount] = useState(0);

  const noPhrases = [
    "No",
    "Are you sure?",
    "Think again!",
    "You're breaking my heart 🥺",
    "Please?",
    "Don't do this to me!",
    "I'll buy you food!",
    "Okay I'm officially sad.",
    "Is that your final answer?",
    "I'm not giving up!",
    "Just click Yes..."
  ];

  const handleNoInteraction = () => {
    setNoCount((prev) => prev + 1);
  };

  const yesScale = 1 + (noCount * 0.5);
  const noScale = Math.max(0, 1 - (noCount * 0.15));
  const phraseIndex = Math.min(noCount, noPhrases.length - 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // smooth ease out
      className="backdrop-blur-xl bg-white/60 border border-white shadow-[0_0_60px_rgba(225,29,72,0.1)] rounded-3xl p-8 sm:p-14 w-full max-w-2xl flex flex-col items-center text-center relative z-10"
    >
      <button onClick={onBack} className="self-start text-rose-900/40 hover:text-rose-900/80 transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-semibold mb-8 z-50 focus:outline-none">
         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
         Restart
      </button>

      <motion.h1 
        className="text-4xl sm:text-6xl font-serif mb-16 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-700 tracking-wide relative z-20"
      >
        Will you be my girlfriend?
      </motion.h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full h-[220px] sm:h-[120px] relative z-20">
        <motion.button
          whileHover={{ scale: yesScale * 1.05 }}
          whileTap={{ scale: yesScale * 0.95 }}
          animate={{ scale: yesScale }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={onAccept}
          className="bg-gradient-to-r from-rose-400 to-rose-600 text-white font-bold px-12 py-4 rounded-full shadow-[0_0_30px_rgba(225,29,72,0.3)] hover:shadow-[0_0_40px_rgba(225,29,72,0.5)] transition-shadow z-50 whitespace-nowrap origin-center tracking-widest text-lg"
        >
          Yes
        </motion.button>

        <AnimatePresence>
          {noScale > 0 && (
            <motion.button
              key="no-button"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: noScale, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleNoInteraction}
              className="border border-rose-900/10 text-rose-900/60 px-8 py-4 rounded-full hover:bg-rose-100/50 hover:text-rose-900 transition-colors z-30 whitespace-nowrap tracking-wider font-light backdrop-blur-md bg-white/40"
            >
              {noPhrases[phraseIndex]}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Fireworks = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      decay: number;

      constructor(x: number, y: number, baseHue: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        // Vary the hue slightly from the base hue for each particle
        const hue = (baseHue + Math.floor(Math.random() * 40 - 20)) % 360;
        this.color = `hsl(${hue}, 100%, 60%)`;
        this.size = Math.random() * 3 + 1;
        this.decay = Math.random() * 0.015 + 0.005;
      }

      update() {
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.vy += 0.05; // gravity
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles: Particle[] = [];
    const explode = (x: number, y: number) => {
      const baseHue = Math.floor(Math.random() * 360);
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle(x, y, baseHue));
      }
    };

    let animationId: number;
    let frame = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      if (frame % 45 === 0 && Math.random() > 0.4) {
        explode(Math.random() * width, Math.random() * height * 0.6);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      frame++;
      animationId = requestAnimationFrame(loop);
    };

    // Initial dramatic explosions
    explode(width / 2, height / 3);
    setTimeout(() => explode(width / 3, height / 2), 200);
    setTimeout(() => explode(width * 0.6, height / 4), 400);

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const Dashboard: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const [showSecret, setShowSecret] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(0);

  const memories = [
    { id: 1, src: "https://i.ibb.co/Q3Nqd9hr/1764652449083-2-transcpr.jpg" },
    { id: 2, src: "https://i.ibb.co/3L91XN4/IMG-20260424-102340.jpg" },
    { id: 3, src: "https://i.ibb.co/zVNTMy8m/IMG-20260123-235612-753.webp" }
  ];

  useEffect(() => {
    let images: HTMLImageElement[] = [];
    memories.forEach(memory => {
      const img = new Image();
      img.src = memory.src;
      images.push(img);
    });
    
    const timer = setInterval(() => {
      setCurrentMemory((prev) => (prev + 1) % memories.length);
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);

  const nextMemory = () => setCurrentMemory((prev) => (prev + 1) % memories.length);
  const prevMemory = () => setCurrentMemory((prev) => (prev - 1 + memories.length) % memories.length);

  return (
    <>
      <Fireworks />
      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full max-w-[1024px] flex flex-col gap-6 flex-1 relative z-10 mt-4 lg:mt-0 w-full mb-10 pb-8"
    >
      {/* Top Layout Grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:min-h-[600px] lg:max-h-[85vh]">
        {/* Left Panel: The Master Letter */}
        <div className="col-span-1 lg:col-span-7 bg-white/60 border border-white backdrop-blur-2xl rounded-3xl p-6 sm:p-10 flex flex-col shadow-2xl shadow-rose-900/5 relative overflow-hidden lg:h-full">
         <button onClick={onReset} className="w-fit text-rose-900/40 hover:text-rose-900/80 transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-semibold mb-6 focus:outline-none">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
           Restart Journey
         </button>
         <h1 className="text-3xl sm:text-4xl font-serif tracking-tight mb-2 text-rose-950">
           To my dearest <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 font-script text-4xl sm:text-5xl pr-2">Georgina Mueni</span>,
         </h1>
         <div className="w-12 h-0.5 bg-rose-400/50 mb-8 rounded-full shrink-0"></div>
         
         <div className="flex-1 lg:overflow-y-auto pr-2 lg:pr-4 custom-scrollbar space-y-6 text-rose-950/80 font-light leading-relaxed text-base sm:text-lg pb-6 lg:pb-10 relative z-20">
            <p>
              From the moment everything shifted in mid-December 2024, that's when it all started. I never thought accepting the dare would be one of the best things I've ever done in my life.
            </p>
            <p>
              Georgina Mueni you really are amazing , you are even more than I need and the only word in the dictionary that could describe you is unique. You fell in love with who I am, you mean the whole world to me 🥹, I don't even know why you choose me every single day.
            </p>
            <p>
              You love me better, better than I love myself, I just want you to know, you trust me better than I trust myself and I'm ready to be fully give in to you. Even after all the many downs I'm sure with out a doubt we will always find our way to each other. Damn onions.. I know I haven't been the best but over the years you've made me a better person thanks for that 😊.. 
            </p>
            <p>
              when others left you stayed, when I pushed you away you never allowed me to let go.. the fact you learnt chess so we could play is just one of many reasons of why you are a queen. All you ever wanted was someone to love and of of 8 billion I was lucky🙂🫠..
            </p>
            <p>
              Now I can't promise I'm perfect but I can promise the best.. I promise right or wrong, I'll show you respect, just know if your down bad I'll take the weight off your chest, and I'll always do the most cause you wont settle for less and everyday that we in love I want you by my side I know I'm afraid but for you I'm willing to try, if I was ever blind and had one wish wish it would be to see you smile 🥹💫.. 
            </p>
            <p>
              the grass will be greener on the other side I promise.. Even though we took the long way, we knew we would get there someday.. you are the one I run to you are the one I belong too.. unanifaa MUENI 143244!!!!!!!
            </p>
            <div className="pt-12 pb-4">
              <p className="text-sm tracking-[0.2em] text-rose-500/80 uppercase font-semibold">Always yours,</p>
              <p className="text-4xl sm:text-5xl font-script mt-2 text-rose-900 pr-2">Emmanuel Amani</p>
            </div>
         </div>
      </div>

      {/* Right Panel Container */}
      <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 lg:h-full">
        
        {/* The Milestone Track */}
        <div className="bg-white/60 border border-white backdrop-blur-2xl rounded-3xl p-6 sm:p-8 flex-1 flex flex-col shadow-2xl shadow-rose-900/5 relative overflow-visible lg:overflow-hidden">
          <div className="absolute top-0 right-0 p-6 pointer-events-none hidden sm:block">
             <svg className="w-24 h-24 text-rose-900/[0.02] absolute -top-8 -right-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
          </div>

          <h2 className="text-xs tracking-[0.4em] uppercase text-rose-900/40 font-bold mb-10 z-10 shrink-0">
            Milestone Track
          </h2>
          
          <div className="relative flex-1 z-10 overflow-visible lg:overflow-hidden">
            {/* Vertical Line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-rose-400/50 via-rose-300/20 to-transparent"></div>

            <div className="space-y-12 relative h-auto lg:h-full lg:overflow-y-auto custom-scrollbar pr-2 lg:pr-4 pb-6 lg:pb-0">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-6 items-start relative"
              >
                <div className="w-4 h-4 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(225,29,72,0.4)] z-10 mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-rose-500 font-bold block mb-1">The Beginning</span>
                  <div className="text-xl font-serif text-rose-950">First Met</div>
                  <div className="text-xs text-rose-900/50 mt-1">
                    The day everything changed. A quiet spark that promised an entire universe of possibilities.
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-6 items-start relative"
              >
                <div className="w-4 h-4 rounded-full border-2 border-rose-400/50 bg-white z-10 mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-rose-900/40 block mb-1">The Build Up</span>
                  <div className="text-xl font-serif text-rose-950/80">Countless Conversations</div>
                  <div className="text-xs text-rose-900/50 mt-1">
                    Late night texts, effortless laughter, and the subtle realization that I was falling for you.
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-6 items-start relative pb-4"
              >
                <div className="relative w-4 h-4 shrink-0 mt-1">
                  <div className="absolute inset-0 rounded-full bg-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.6)] animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-rose-300 animate-ping" />
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-rose-500 font-bold block mb-1">Today</span>
                  <div className="text-xl font-serif text-rose-800">The Yes</div>
                  <div className="text-xs text-rose-500/80 mt-1">
                    The official start of our chapter together. The best is yet to come.
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Interactive Accent Footer */}
        <div className="bg-gradient-to-r from-rose-300 to-pink-400 rounded-3xl p-5 sm:p-6 shadow-lg shadow-rose-900/10 relative z-10 flex flex-col justify-center shrink-0 text-rose-950 mb-8 sm:mb-0">
           <div className="flex justify-between items-center w-full">
             <div>
               <h4 className="font-bold uppercase tracking-tighter text-lg">Status: Accepted</h4>
               <p className="opacity-70 text-[10px] uppercase tracking-widest font-bold">Life-Time Partnership Active</p>
             </div>
             
             <button 
               onClick={(e) => {
                 setShowSecret(!showSecret);
                 
                 const rect = e.currentTarget.getBoundingClientRect();
                 const x = (rect.left + rect.right) / 2 / window.innerWidth;
                 const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

                 confetti({
                   particleCount: 150,
                   spread: 80,
                   origin: { x, y },
                   colors: ['#FDE68A', '#F59E0B', '#D97706', '#10B981', '#f43f5e']
                 });
               }}
               className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/50 transition-colors focus:outline-none shrink-0"
             >
               <GoldenStrawberry />
             </button>
           </div>
           
           <AnimatePresence>
             {showSecret && (
               <motion.div
                 initial={{ height: 0, opacity: 0, marginTop: 0 }}
                 animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                 exit={{ height: 0, opacity: 0, marginTop: 0 }}
                 transition={{ duration: 0.4 }}
                 className="overflow-hidden"
               >
                 <div className="px-4 py-3 bg-white/40 rounded-xl border border-white/30 text-rose-950/90 text-xs italic tracking-wider text-center">
                   "Every great love starts with a great story. Ours just has a little more code."
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

      </div>
      </div>

      {/* Memories Carousel Section */}
      <div className="bg-white/60 border border-white backdrop-blur-2xl rounded-3xl p-6 sm:p-8 flex flex-col shadow-2xl shadow-rose-900/5 relative overflow-hidden shrink-0">
         <h2 className="text-xs tracking-[0.4em] uppercase text-rose-900/40 font-bold mb-6 text-center">
            Memories
         </h2>
         <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden bg-rose-950 group">
            <AnimatePresence mode="popLayout">
               <motion.img 
                  key={currentMemory}
                  src={memories[currentMemory].src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-contain"
               />
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button onClick={prevMemory} className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-rose-950 pointer-events-auto hover:bg-white transition-colors shadow-lg">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={nextMemory} className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-rose-950 pointer-events-auto hover:bg-white transition-colors shadow-lg">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
         </div>
         {/* Dots */}
         <div className="flex justify-center gap-2 mt-4">
            {memories.map((_, idx) => (
               <button 
                  key={idx} 
                  onClick={() => setCurrentMemory(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentMemory ? 'w-6 bg-rose-500' : 'w-2 bg-rose-300'}`}
                  aria-label={`Go to slide ${idx + 1}`}
               />
            ))}
         </div>
      </div>

    </motion.div>
    </>
  );
};


// === Main App Wrapper ===

export default function App() {
  const [scene, setScene] = useState<number>(0); 

  useEffect(() => {
    // Check persistence to avoid showing the intro again
    const accepted = localStorage.getItem('matunda_accepted');
    if (accepted === 'true') {
      setScene(3);
      // Wait for user interaction to play music if loading directly into scene 3
    } else {
      setScene(1);
    }
  }, []);

  // Loading state block
  if (scene === 0) return <div className="min-h-screen bg-[#fdf8f8]" />;

  return (
    <div className={`min-h-[100dvh] bg-[#fdf8f8] text-rose-950 overflow-x-hidden relative flex flex-col items-center font-sans select-none p-4 sm:p-8 ${scene === 3 ? 'justify-start lg:justify-center overflow-y-auto' : 'justify-center overflow-hidden'}`}>
      {/* Ambient Glows */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-rose-400/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-pink-400/20 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {scene === 3 && (
        <header className="relative z-10 w-full max-w-[1024px] flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-8 shrink-0 mt-8 sm:mt-0 gap-4 sm:gap-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-300 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className="tracking-[0.3em] text-xs font-semibold uppercase text-rose-500/80">Amani loves Mueni</span>
            </div>
          </header>
      )}

      <div className="relative z-10 w-full max-w-[1024px] flex-1 flex flex-col items-center justify-center min-h-0">
        <AnimatePresence mode="wait">
          {scene === 1 && <Prologue key="prologue" onComplete={() => setScene(2)} />}
          
          {scene === 2 && (
            <Proposal 
              key="proposal" 
              onAccept={() => {
                localStorage.setItem('matunda_accepted', 'true');
                setScene(3);
              }} 
              onBack={() => setScene(1)}
            />
          )}

          {scene === 3 && <Dashboard key="dashboard" onReset={() => {
            localStorage.removeItem('matunda_accepted');
            setScene(1);
          }} />}
        </AnimatePresence>
      </div>

      {scene === 3 && (
        <footer className="mt-2 sm:mt-8 w-full max-w-[1024px] flex flex-col-reverse sm:flex-row justify-between items-center sm:items-end relative z-10 shrink-0 pb-12 sm:pb-0 gap-4 sm:gap-0">
          <div className="text-[10px] tracking-[0.4em] uppercase text-rose-900/20">
            Encrypted Space • Private Access
          </div>
          <div className="flex items-center gap-3">
             <span className="text-[10px] tracking-widest uppercase text-rose-500/40">Crafted with Love</span>
             <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
          </div>
        </footer>
      )}
    </div>
  );
}
