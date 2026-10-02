import React from 'react';

export const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-auto bg-white text-black border-b border-black/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-12 px-6 md:px-12 py-6">
        <div className="col-span-1 md:col-span-6 flex items-center">
          <a href="#" className="font-display font-bold text-lg md:text-2xl lg:text-4xl tracking-tight uppercase">
            Eugene Ebere
          </a>
        </div>

        <div className="hidden md:flex col-span-6 justify-end gap-12">
          {['Profile', 'Work', 'Contact'].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="font-sans text-xs uppercase tracking-widest hover:opacity-50 transition-opacity flex items-center gap-2"
            >
              <span className="opacity-50">0{index + 1}</span> {item}
            </button>
          ))}
        </div>

        <div className="col-span-1 md:hidden flex justify-end">
          <button
            className="font-sans text-xs uppercase tracking-widest"
            onClick={() => scrollToSection('contact')}
          >
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
};