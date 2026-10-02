import React, { useEffect, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    // Faster interval for a snappier load
    const interval = setInterval(() => {
      const increment = Math.random() * 8; 
      currentProgress += increment;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setProgress(100);
        
        // Short pause at 100%
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 800); 
        }, 200);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[999] bg-black text-white flex flex-col justify-between p-8 md:p-12 transition-transform duration-[1.2s] ease-[cubic-bezier(0.83,0,0.17,1)] ${
        isFinished ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="w-full flex justify-between items-start border-b border-white/20 pb-4">
        <span className="font-display font-bold text-lg">EE©</span>
        <span className="font-sans text-xs uppercase tracking-widest animate-pulse">
           {progress < 100 ? 'Initializing...' : 'Online'}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center">
          <div className="font-display text-[20vw] leading-none font-bold tracking-tighter tabular-nums mix-blend-difference">
            {progress}%
          </div>
      </div>

      <div className="w-full flex justify-between items-end border-t border-white/20 pt-4">
         <span className="font-sans text-xs uppercase tracking-widest">Portfolio 2026</span>
         <span className="font-serif italic text-xl">Product Designer</span>
      </div>
    </div>
  );
};