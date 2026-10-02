import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  isHoveringLink?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isHoveringLink }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [hoveringAnyLink, setHoveringAnyLink] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (followerRef.current) {
        followerRef.current.animate({
          transform: `translate3d(${e.clientX - 24}px, ${e.clientY - 24}px, 0)`
        }, {
          duration: 400,
          fill: "forwards",
          easing: "ease-out"
        });
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Detect generic link hovering for other parts of the site
    const handleLinkHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setHoveringAnyLink(true);
      } else {
        setHoveringAnyLink(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleLinkHoverStart);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleLinkHoverStart);
    };
  }, []);

  const isLinkActive = isHoveringLink || hoveringAnyLink;

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`
          fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference
          transition-transform duration-200
          ${clicked ? 'scale-75' : 'scale-100'}
          ${isLinkActive ? 'opacity-0' : 'opacity-100'}
        `}
        style={{ marginTop: '-6px', marginLeft: '-6px' }}
      />
      <div 
        ref={followerRef}
        className={`
          fixed top-0 left-0 w-12 h-12 border border-white/60 rounded-full pointer-events-none z-[99] mix-blend-difference
          transition-all duration-300 ease-out
          ${clicked ? 'scale-90' : 'scale-100'}
          ${isLinkActive ? 'scale-[1.5] bg-white text-black border-transparent' : ''}
        `}
      />
    </>
  );
};

export default CustomCursor;