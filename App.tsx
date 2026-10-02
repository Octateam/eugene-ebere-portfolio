import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import { Intro } from './components/Intro';
import { Navbar } from './components/Navbar';
import { ProjectList } from './components/ProjectList';
import { Reveal } from './components/Reveal';
import { Project } from './types';

const projects: Project[] = [
  {
    id: 1,
    title: "Kredete ($22M series A)",
    category: "Product Design • UX Research",
    year: "2023 — Present",
    image: "https://picsum.photos/id/1/800/600",
    link: "https://apps.apple.com/ng/app/kredete/id1660925127"
  },
  {
    id: 3,
    title: "NetworkX",
    category: "Lead Product Designer",
    year: "2024 — 2025",
    image: "https://images.unsplash.com/photo-1616499615673-924110429962?q=80&w=1470&auto=format&fit=crop",
    link: "https://www.networkx.ai/"
  },
  {
    id: 2,
    title: "Koletspace (Airbnb for eventspaces)",
    category: "Founder • Product Design",
    year: "2020 — Present",
    image: "https://picsum.photos/id/119/800/600",
    link: "https://www.koletspace.com/"
  }
];

const App: React.FC = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [isHoveringName, setIsHoveringName] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <>
      <div className="hidden md:block">
        <CustomCursor isHoveringLink={isHoveringName} />
      </div>

      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

      <div className={`bg-white text-black min-h-screen selection:bg-black selection:text-white ${introComplete ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        <Navbar />

        {/* Floating Profile Image for Name Hover - Using the provided professional headshot */}
        <div
          className="pointer-events-none fixed z-[60] hidden md:block"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className={`
            w-[24vw] h-[24vw] max-w-[380px] max-h-[380px]
            rounded-full overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] bg-neutral-100
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center border-[12px] border-white
            ${isHoveringName ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-12'}
          `}>
            <img
              src="/hover-image.jpg"
              alt="Eugene Ebere"
              className="w-full h-full object-cover scale-110"
              onError={(e) => {
                // Fallback if the specific link breaks
                e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
              }}
            />
          </div>
        </div>

        {/* Main Grid Container */}
        <div className="max-w-[1400px] mx-auto border-x border-black/5 min-h-screen relative">

          {/* Hero Section */}
          <section className="min-h-screen flex flex-col md:justify-center px-6 md:px-12 pt-24 md:pt-32 pb-12 border-b border-black/5 relative overflow-hidden">

            {/* Mobile Content Wrapper for Vertical Centering */}
            <div className="flex-grow flex flex-col justify-center items-center md:block md:flex-grow-0">
              {/* Mobile Static Hero Image */}
              <div className="block md:hidden mb-8">
                <Reveal>
                  <div className="p-10">
                    <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-[6px] border-neutral-100 shadow-xl">
                      <img
                        src="/hover-image.jpg"
                        alt="Eugene Ebere"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
                        }}
                      />
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal>
                <div
                  className="relative inline-block cursor-none z-20 md:mix-blend-normal md:text-black pr-4 w-full md:w-auto"
                  onMouseEnter={() => setIsHoveringName(true)}
                  onMouseLeave={() => setIsHoveringName(false)}
                >
                  <div className="flex flex-col items-center md:items-start font-display font-black text-[min(12.5vw,175px)] leading-[0.85] tracking-tighter uppercase transition-colors duration-300 py-2">
                    <div className="flex items-center gap-4 md:gap-8">
                      <span className="md:hover:text-transparent md:hover:bg-clip-text md:hover:bg-gradient-to-br md:hover:from-black md:hover:to-neutral-500 transition-all duration-500">
                        Eugene
                      </span>
                      <div className="h-[2vw] flex-grow bg-current mt-2 hidden md:block animate-pulse opacity-20" />
                    </div>
                    <span className="md:text-left md:self-auto md:hover:text-transparent md:hover:bg-clip-text md:hover:bg-gradient-to-br md:hover:from-black md:hover:to-neutral-500 transition-all duration-500">
                      Ebere
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="col-span-12 md:col-span-5">
                <Reveal delay={0.2}>
                  <p className="font-serif italic text-3xl md:text-5xl leading-tight">
                    Product Designer
                  </p>
                </Reveal>
              </div>
              <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-black/5 pt-6">
                <span className="font-sans text-xs uppercase tracking-widest text-neutral-400 mb-4 md:mb-0 animate-pulse">(Based in Nigeria)</span>
                <p className="font-sans text-sm md:text-base max-w-sm text-neutral-600 leading-relaxed">
                  Crafting seamless digital experiences through thoughtful research and high-fidelity design.
                </p>
              </div>
            </div>
          </section>

          {/* Profile / About Section */}
          <section id="profile" className="grid grid-cols-1 md:grid-cols-12 border-b border-black/5">
            <div className="col-span-12 md:col-span-2 p-6 md:p-12 border-b md:border-b-0 md:border-r border-black/5">
              <div className="md:sticky md:top-32">
                <span className="font-sans text-xs uppercase tracking-widest text-neutral-400 block mb-2">(01)</span>
                <span className="font-display font-bold text-lg uppercase">Profile</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-10 p-6 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                <Reveal>
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-widest text-neutral-400 mb-6">Manifesto</h3>
                    <p className="font-display text-3xl md:text-4xl font-bold leading-tight mb-8">
                      Design acts as the bridge between raw technology and human intuition.
                    </p>
                    <p className="font-sans text-base text-neutral-600 leading-relaxed max-w-md">
                      I help forward-thinking companies launch products that are honest, unobtrusive, and long-lasting. With a strong background in both design and development, I ensure the vision remains intact from concept to code.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-widest text-neutral-400 mb-6">Expertise</h3>
                    <ul className="space-y-6">
                      {[
                        "Product Strategy",
                        "UI/UX Design",
                        "Design Systems",
                        "Interaction Design",
                        "Creative Direction"
                      ].map((service) => (
                        <li key={service} className="flex items-center gap-6 border-b border-black/5 pb-4 group cursor-default">
                          <span className="w-1.5 h-1.5 bg-neutral-300 group-hover:bg-black transition-colors rounded-full" />
                          <span className="font-serif text-2xl italic group-hover:translate-x-2 transition-transform duration-300">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Work Section */}
          <section id="work" className="grid grid-cols-1 md:grid-cols-12 border-b border-black/5">
            <div className="col-span-12 md:col-span-2 p-6 md:p-12 border-b md:border-b-0 md:border-r border-black/5 bg-white z-10">
              <div className="md:sticky md:top-32">
                <span className="font-sans text-xs uppercase tracking-widest text-neutral-400 block mb-2">(02)</span>
                <span className="font-display font-bold text-lg uppercase">Selected Work</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-10">
              <ProjectList projects={projects} />
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="grid grid-cols-1 md:grid-cols-12 min-h-[80vh]">
            <div className="col-span-12 md:col-span-2 p-6 md:p-12 border-b md:border-b-0 md:border-r border-black/5">
              <div className="md:sticky md:top-32">
                <span className="font-sans text-xs uppercase tracking-widest text-neutral-400 block mb-2">(03)</span>
                <span className="font-display font-bold text-lg uppercase">Contact</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-10 flex flex-col justify-between p-6 md:p-12 bg-neutral-50/50">
              <Reveal width="100%">
                <div className="w-full pt-12 md:pt-24 pr-4">
                  <h2 className="font-display font-black text-[7vw] leading-[0.85] tracking-tighter uppercase mb-12 mix-blend-darken">
                    Let's Build<br />The<br />Iconic.
                  </h2>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/5 pt-12 pb-12">
                <div>
                  <h3 className="font-sans text-xs uppercase tracking-widest text-neutral-400 mb-4">Email</h3>
                  <a href="mailto:eugeneebere@gmail.com" className="font-serif italic text-2xl hover:text-neutral-500 transition-colors">eugeneebere@gmail.com</a>
                </div>
                <div>
                  <h3 className="font-sans text-xs uppercase tracking-widest text-neutral-400 mb-4">Socials</h3>
                  <div className="flex flex-col gap-2 font-sans text-sm font-medium">
                    <a
                      href="https://www.linkedin.com/in/eugene-ebere-3a588715b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:translate-x-1 transition-transform inline-block"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://x.com/Eugenedotfig"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:translate-x-1 transition-transform inline-block"
                    >
                      Twitter / X
                    </a>
                    <a
                      href="https://www.instagram.com/eugeneebere/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:translate-x-1 transition-transform inline-block"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <p className="font-sans text-xs text-neutral-400">
                    © 2026 Eugene Ebere.<br />All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default App;