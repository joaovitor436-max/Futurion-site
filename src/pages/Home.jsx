import React, { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, ArrowRight, CheckCircle2, MessageSquare, Globe, Layout, Bot, Smartphone, 
  Cpu, Brain, Cloud, MapPin, Thermometer, ClipboardCheck, Activity, BarChart3, 
  Sparkles, ShieldCheck, Zap, Server, Boxes, FileSpreadsheet, Mic, LayoutDashboard, Eye, Settings, Download, Users, AlertTriangle, Search, Map
} from 'lucide-react';
import { GlobeInteractive } from '../components/GlobeInteractive';
import { HoverButton } from '../components/HoverButton';

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- Custom Components for Homepage ---

const MetricCounter = ({ value, suffix = '', label, description }) => {
  return (
    <motion.div variants={fadeInUp} className="glass-card p-8 flex flex-col gap-4">
      <div className="font-display font-bold text-5xl md:text-6xl text-[var(--color-accent-primary)]">
        {value}{suffix}
      </div>
      <div>
        <h4 className="font-display font-semibold text-xl mb-2">{label}</h4>
        <p className="text-[var(--color-text-secondary)]">{description}</p>
      </div>
    </motion.div>
  );
};

// Workflow Section logic moved inline

const ResolveBadge = ({ text }) => (
  <div className="absolute top-6 left-6 py-1 px-3 bg-[#00ffa3]/20 border border-[#00ffa3]/40 rounded-full flex items-center gap-2 z-20 backdrop-blur-sm">
    <div className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse shadow-[0_0_8px_#1a7bff]"></div>
    <span className="text-[9px] font-black uppercase tracking-widest text-[#00ffa3]">{text}</span>
  </div>
);

const PerspectiveCard = ({ children, className = "" }) => {
  const cardRef = React.useRef(null);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        preserve3d: true,
      }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { t } = useI18n();
  const seedsRef = React.useRef(null);
  const solutionsRef = React.useRef(null);
  const finalCtaRef = React.useRef(null);


  useGSAP(() => {
    // Entrance for the main container
    gsap.from(".seeds-container", {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".seeds-container",
        start: "top 80%",
      }
    });

    // Staggered entrance for the flow steps
    gsap.from(".flow-step", {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".flow-grid",
        start: "top 85%",
      }
    });

    // Staggered entrance for features
    gsap.from(".feature-card", {
      opacity: 0,
      scale: 0.9,
      y: 30,
      stagger: 0.08,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 90%",
      }
    });

    // Floating effect for the mockup with GSAP
    gsap.to(".seeds-mockup", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: seedsRef });

  useGSAP(() => {
    gsap.fromTo(".solution-card-wrapper", 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".solutions-grid",
          start: "top 85%",
        }
      }
    );

    // Subtly animate the icons in the background
    gsap.to(".solution-card-wrapper .absolute", {
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.2,
        from: "random"
      }
    });
  }, { scope: solutionsRef });

  useGSAP(() => {
    // Entrace animation for the Final CTA card
    gsap.from(".final-cta-card", {
      opacity: 0,
      y: 100,
      rotateX: 15,
      scale: 0.95,
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".final-cta-card",
        start: "top 90%",
      }
    });

    // Subtle floating y-axis animation
    gsap.to(".final-cta-card", {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Parallax for floating orbs
    gsap.to(".cta-orb-1", {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".final-cta-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
    
    gsap.to(".cta-orb-2", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".final-cta-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });
  }, { scope: finalCtaRef });



  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* SECTION 1: HERO */}
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center pt-0 pb-12 px-6 bg-[#0a0a0a] overflow-hidden">

        <div className="container mx-auto max-w-[1440px] z-10 flex flex-col items-center text-center">
          
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex flex-col items-center gap-0 -mt-12 md:-mt-20">
              <motion.img 
                variants={fadeInUp}
                src="/futurionwhite.png"
                alt="Futurion Logo"
                className="h-[320px] md:h-[480px] w-auto opacity-90"
              />

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-[clamp(3.5rem,6.5vw,6rem)] font-display font-extrabold leading-[1.05] tracking-tight max-w-5xl -mt-16 md:-mt-24">
                {/* Manual splitting to add gradient text to "amanhã" or "tomorrow" */}
                {t('hero.headline').split(' ').map((word, i, arr) => {
                  const isHighlight = word.toLowerCase().includes('amanhã') || word.toLowerCase().includes('tomorrow') || word.toLowerCase().includes('mañana');
                  return (
                    <React.Fragment key={i}>
                      {isHighlight ? <span className="hero-gradient-text">{word}</span> : word}
                      {i !== arr.length - 1 && ' '}
                    </React.Fragment>
                  );
                })}
              </motion.h1>
            </div>

            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed mx-auto font-light">
              {t('hero.subtitle')}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto mt-4 px-4 sm:px-0">
              <HoverButton href="#produtos" backgroundColor="var(--color-accent-primary)" textColor="var(--color-bg-primary)" hoverTextColor="var(--color-bg-primary)" glowColor="white" className="w-full sm:w-80 !py-5 !text-lg">
                {t('hero.btnPrimary')}
              </HoverButton>
              <HoverButton to="/contato" className="!bg-transparent border-[rgba(255,255,255,0.2)] w-full sm:w-80 !py-5 !text-lg font-bold">
                {t('hero.btnSecondary')}
              </HoverButton>
            </motion.div>


          </motion.div>
        </div>


      </section>

      {/* SECTION: GLOBAL PRESENCE */}
      <section className="py-24 px-6 relative z-10 bg-[var(--color-bg-primary)] overflow-hidden">
        {/* Ambient glows behind globe */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--color-accent-primary)] opacity-[0.03] blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto max-w-[1440px]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex justify-center items-center w-full"
            >
              <GlobeInteractive className="w-full max-w-[420px]" />
            </motion.div>

            {/* Right Column: Text and Square Cards */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-4">
                <motion.span variants={fadeInUp} className="font-mono text-[var(--color-accent-primary)] text-xs font-semibold tracking-[0.15em] uppercase">{t('home.presence_overline')}</motion.span>
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold">{t('home.presence_headline')}</motion.h2>
              </div>

              <div className="flex flex-col gap-5 mt-2 w-full max-w-[480px]">
                {/* Cards */}
                {(t('home.presence_cards') || []).map((card, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="flex flex-col p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)] shadow-sm">
                    <h3 className="text-[2.5rem] font-display font-bold text-[#00ffa3] mb-2 tracking-tight">{card.title}</h3>
                    <h4 className="text-[15px] font-bold text-white mb-2">{card.label}</h4>
                    <p className="text-[14px] text-[#A0A0A0] leading-relaxed">
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES */}
      <section id="solucoes" ref={solutionsRef} className="py-24 px-6 relative z-10">
        <div className="container mx-auto max-w-[1440px]">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
          >
            <span className="font-mono text-[var(--color-accent-primary)] text-xs font-semibold tracking-[0.15em] uppercase mb-4">{t('home.solutions_overline')}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{t('home.solutions_headline')}</h2>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('home.solutions_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container relative z-10 solutions-grid">
            {/* Cards */}
            {(t('home.services') || []).map((service, idx) => {
              const icons = [
                <Layout size={32} strokeWidth={1.5} />, 
                <Bot size={32} strokeWidth={1.5} />, 
                <Smartphone size={32} strokeWidth={1.5} />, 
                <Cpu size={32} strokeWidth={1.5} />, 
                <Brain size={32} strokeWidth={1.5} />, 
                <Cloud size={32} strokeWidth={1.5} />
              ];
              return (
                <div key={idx} className="solution-card-wrapper opacity-0">
                  <div className="glass-card p-10 group relative h-full flex flex-col items-start text-left">
                    {/* Floating background icon */}
                    <div className="absolute -top-6 -right-6 text-[var(--color-accent-primary)] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity transform scale-[3] -rotate-12 group-hover:rotate-0 duration-700">
                      {icons[idx]}
                    </div>
                    
                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="px-3 py-1 bg-[rgba(0,212,255,0.15)] rounded-full text-[var(--color-accent-primary)] text-[10px] font-bold tracking-wider relative z-10 border border-[rgba(0,212,255,0.2)]">{service.tag}</div>
                    </div>
                    
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-transparent border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[var(--color-accent-primary)] mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_8px_16px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                      {icons[idx]}
                    </div>
                    <h3 className="font-display font-bold text-2xl mb-4 relative z-10 text-white tracking-tight">{service.title}</h3>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed relative z-10 text-[15px] font-light">{service.desc}</p>
                    
                    {/* Bottom accent glow */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent-primary)] to-transparent opacity-0 group-hover:opacity-40 transition-opacity"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCTS SHOWCASE */}
      <section id="produtos" className="py-24 px-6 bg-[var(--color-bg-secondary)] relative border-y border-[var(--color-border-subtle)]">
        <div className="container mx-auto max-w-[1440px]">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20"
          >
            <span className="font-mono text-[var(--color-accent-primary)] text-xs font-semibold tracking-[0.15em] uppercase mb-4">{t('home.products_overline')}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{t('home.products_headline')}</h2>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('home.products_subtitle')}
            </p>
          </motion.div>

          {/* Block 1 - Futurion Seeds (Redesigned) */}
          <div ref={seedsRef} className="seeds-container mb-32 bg-[rgba(26,123,255,0.02)] border border-[rgba(26,123,255,0.15)] backdrop-blur-xl rounded-[3rem] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-[0_0_80px_rgba(26,123,255,0.05)]">
            {/* Background Glows */}
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[rgba(26,123,255,0.08)] rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-[rgba(0,212,255,0.04)] rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header + Mockup */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 relative z-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col items-start">
                <motion.img 
                  variants={fadeInUp}
                  src="/seedslogo.png"
                  alt="Futurion Seeds Logo"
                  className="h-12 md:h-16 w-auto mb-6 object-contain"
                />
                <motion.h3 variants={fadeInUp} className="text-3xl md:text-[2.75rem] font-display font-bold mb-6 leading-[1.15] text-white">
                  {t('seeds.hero_headline')}
                </motion.h3>
                <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 leading-relaxed font-light">
                  {t('seeds.hero_description')}
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <HoverButton to="/produtos/futurion-seeds" backgroundColor="#1a7bff" textColor="white" hoverTextColor="white" glowColor="rgba(26,123,255,0.6)">
                    {t('home.product_cta')}
                  </HoverButton>
                </motion.div>
              </motion.div>
              
              <div className="relative flex justify-center seeds-mockup">
                <div className="relative w-full max-w-[600px]">
                  <img src="/mockup-seeds-desk.png" alt="Futurion Seeds App no Desktop" className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)] rounded-3xl border border-[rgba(255,255,255,0.1)] relative z-10" />
                  {/* Decorative element behind mockup */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[#1a7bff]/20 to-transparent blur-2xl -z-10 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Como Funciona o Fluxo — Standardized with Seeds Page */}
            <div className="py-24 px-6 relative overflow-hidden bg-white/[0.01] rounded-[3rem] border border-white/5 my-20">
               {/* Animated Pulse Line Background */}
               <div className="absolute top-[45%] left-0 w-full h-[2px] bg-[rgba(255,255,255,0.05)] -translate-y-1/2 hidden lg:block">
                 <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#1a7bff] to-transparent opacity-50 animate-[shimmer_4s_infinite_linear]"></div>
               </div>

               <div className="container mx-auto max-w-[1440px] relative z-10">
                 <div className="text-center mb-20">
                   <h4 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">{t('seeds.workflow_headline')}</h4>
                   <p className="text-gray-400">{t('seeds.workflow_overline')}</p>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative">
                   {((t('seeds.workflow_steps') || [])).map((step, idx) => (
                     <motion.div 
                       key={idx}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: idx * 0.2 }}
                       className="flex flex-col items-center text-center lg:pt-12 relative"
                     >
                       {/* Connecting Line for Mobile */}
                       {idx !== (t('seeds.workflow_steps') || []).length - 1 && <div className="w-[2px] h-8 bg-[rgba(255,255,255,0.1)] lg:hidden my-2"></div>}
                       
                       <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border-2 border-[#1a7bff] flex items-center justify-center text-xl font-bold font-mono text-[#1a7bff] mb-6 relative z-10 shadow-[0_0_20px_rgba(26,123,255,0.3)] lg:absolute lg:top-[-32px]">
                         0{idx + 1}
                       </div>
                       <h4 className="text-lg font-display font-semibold mb-2 text-white">{step.title}</h4>
                       <p className="text-sm text-gray-400">{step.desc}</p>
                     </motion.div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Funcionalidades e Qualidades — ADVANCED ANTIGRAVITY GRID */}
            <div className="relative z-10 py-10">
              <div className="flex flex-col items-center text-center mb-24">
                <span className="font-mono text-[#00ffa3] text-[10px] font-black tracking-[0.6em] uppercase mb-6 block drop-shadow-[0_0_10px_rgba(0,255,163,0.3)]">{t('seeds.features_overline')}</span>
                <h4 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-6">
                   {t('seeds.features_qualities_headline')}
                </h4>
                <p className="text-gray-400 max-w-2xl font-light">
                   {t('seeds.features_desc')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(t('seeds.features_list') || []).map((feat, idx) => {
                  const icons = [<Globe size={28} />, <Thermometer size={28} />, <CheckCircle2 size={28} />, <ClipboardCheck size={28} />, <Activity size={28} />, <Cloud size={28} />];
                  const colors = ['#00ffa3', '#00D4FF', '#c9bfff', '#ff9d00', '#ff5e5e', '#1a7bff'];
                  return (
                   <PerspectiveCard key={idx} className="group cursor-default">
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="spatial-glass-card p-12 rounded-[3.5rem] border border-white/5 backdrop-blur-[40px] flex flex-col items-start transition-all duration-500 hover:border-[#1a7bff]/40 relative overflow-hidden h-full group"
                      >
                         {/* Dynamic Background Glow */}
                         <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000" style={{ background: colors[idx] }}></div>

                         {/* Floating Icon Container */}
                         <div 
                           style={{ transform: "translateZ(50px)", color: colors[idx] }}
                           className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-10 text-white transition-all duration-500 group-hover:bg-[#1a7bff]/10 group-hover:border-[#1a7bff]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
                         >
                            {icons[idx]}
                         </div>

                         <div style={{ transform: "translateZ(30px)" }} className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-4 rounded-full" style={{ background: colors[idx] }}></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-[#1a7bff] transition-colors duration-500">Feature Qualify</span>
                         </div>

                         <h5 style={{ transform: "translateZ(40px)" }} className="font-display font-bold text-white text-2xl mb-5 tracking-tight group-hover:text-white transition-colors duration-500">{feat.title}</h5>
                         <p style={{ transform: "translateZ(20px)" }} className="text-[16px] text-gray-500 leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-500">{feat.desc}</p>
                         
                         {/* Bottom Accent */}
                         <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#1a7bff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                         {/* Rare Sparkle */}
                         <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                             <Sparkles size={16} className="text-[#00ffa3] animate-pulse" />
                         </div>
                      </motion.div>
                   </PerspectiveCard>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border-accent)] to-transparent my-16 opacity-50"></div>

          {/* Block 2 - Futurion Stock (Redesigned & Standardized) */}
          <div className="bg-[rgba(0,212,255,0.02)] border border-[rgba(0,128,204,0.15)] backdrop-blur-xl rounded-[3rem] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-[0_0_80px_rgba(0,128,204,0.05)]">
            {/* Background Glows */}
            <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-[rgba(0,212,255,0.08)] rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-[rgba(0,128,204,0.04)] rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header + Premium Tablet Mockup */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 relative z-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col items-start">
                <motion.img 
                  variants={fadeInUp}
                  src="/stocklogo.png"
                  alt="Futurion Stock Logo"
                  className="h-12 md:h-16 w-auto mb-6 object-contain"
                />
                <motion.h3 variants={fadeInUp} className="text-3xl md:text-[2.75rem] font-display font-bold mb-6 leading-[1.15] text-white">
                  {t('stock.headline_prefix')}{t('stock.headline_highlight')}
                </motion.h3>
                <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 leading-relaxed font-light">
                  {t('stock.subtitle')}
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <HoverButton to="/produtos/futurion-stock" backgroundColor="#0080CC" textColor="white" hoverTextColor="white" glowColor="rgba(0,212,255,0.6)">
                    {t('stock.btn_features')}
                  </HoverButton>
                </motion.div>
              </motion.div>
              
              {/* Premium Tablet Mockup */}
              <div className="relative flex justify-center perspective-[2000px]">
                <motion.div 
                  initial={{ opacity: 0, rotateY: -20, rotateX: 10 }}
                  whileInView={{ opacity: 1, rotateY: -15, rotateX: 10 }}
                  viewport={{ once: true }}
                  className="relative w-full max-w-[550px] aspect-[1.4/1] bg-[#1f2c34] rounded-[2rem] border-[10px] border-[#0a0a0f] shadow-[0_60px_100px_rgba(0,0,0,0.6),0_0_40px_rgba(0,128,204,0.15)] overflow-hidden transform-gpu hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-1000 ease-out preserve-3d"
                >
                    <div className="absolute inset-0 bg-[#0A1628]">
                      <img src="/stock.png" alt="Futurion Stock UI" className="w-full h-full object-contain p-4 opacity-90" />
                    </div>
                </motion.div>
                {/* Decorative element behind mockup */}
                <div className="absolute -inset-10 bg-gradient-to-tr from-[#0080CC]/15 to-transparent blur-3xl -z-10 rounded-full"></div>
              </div>
            </div>

            {/* Sub-Section 1: Qualidades (Features) */}
            <div className="mb-32 relative z-10">
              <div className="text-center mb-16">
                <span className="font-mono text-[#00D4FF] text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">{t('stock.showcase_badge')}</span>
                <h4 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">{t('stock.features_headline')}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(t('stock.showcase_benefits') || []).map((item, idx) => {
                  const icons = [<Map size={24} />, <Cpu size={24} />, <BarChart3 size={24} />];
                  return (
                  <div key={idx} className="spatial-glass-card p-10 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-500 hover:border-[#0080CC]/40 hover:bg-[#0080CC]/5 group">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#00D4FF] group-hover:scale-110 group-hover:bg-[#0080CC]/20 transition-all duration-500 shadow-xl">
                      {icons[idx] || <BarChart3 size={24} />}
                    </div>
                    <h5 className="font-display font-bold text-white text-xl mb-3 tracking-tight">{item.title}</h5>
                    <p className="text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Sub-Section 2: Fluxo Operacional (Sync with Seeds) */}
            <div className="py-24 px-6 relative overflow-hidden bg-white/[0.01] rounded-[3rem] border border-white/5 mb-32">
               {/* Animated Pulse Line */}
               <div className="absolute top-[45%] left-0 w-full h-[2px] bg-[rgba(255,255,255,0.05)] -translate-y-1/2 hidden lg:block">
                 <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#0080CC] to-transparent opacity-50 animate-[shimmer_4s_infinite_linear]"></div>
               </div>

               <div className="container mx-auto max-w-[1440px] relative z-10">
                 <div className="text-center mb-20">
                   <h4 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white">{t('stock.pipeline_headline')}</h4>
                   <p className="text-gray-400">{t('stock.pipeline_overline')}</p>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative">
                   {(t('stock.pipeline_steps') || []).map((step, idx) => (
                     <motion.div 
                       key={idx}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: idx * 0.2 }}
                       className="flex flex-col items-center text-center lg:pt-12 relative"
                     >
                       {/* Connecting Line for Mobile */}
                       {idx !== (t('stock.pipeline_steps') || []).length - 1 && <div className="w-[2px] h-8 bg-[rgba(255,255,255,0.1)] lg:hidden my-2"></div>}
                       
                       <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border-2 border-[#0080CC] flex items-center justify-center text-xl font-bold font-mono text-[#0080CC] mb-6 relative z-10 shadow-[0_0_20px_rgba(0,128,204,0.3)] lg:absolute lg:top-[-32px]">
                         0{idx + 1}
                       </div>
                       <h4 className="text-lg font-display font-semibold mb-2 text-white">{step.title}</h4>
                       <p className="text-sm text-gray-400">{step.desc}</p>
                     </motion.div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Sub-Section 3: Vantagens Estratégicas (Resolve Cards) */}
            <div className="relative z-10">
               <div className="text-center mb-16">
                 <h4 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">{t('stock.enterprise_headline')}</h4>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(t('stock.pains_list') || []).map((feat, idx) => (
                    <div key={idx} className="animate-card bg-white/[0.03] backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/[0.06] hover:border-[#0080CC]/50 transition-all duration-500 group relative">
                      <ResolveBadge text={t('stock.resolve_labels')[idx]} />
                      <div className="w-14 h-14 rounded-2xl bg-[#142C4C] border border-white/10 flex items-center justify-center mb-8 text-[#00D4FF] group-hover:scale-110 transition-transform duration-500 shadow-xl">
                        <CheckCircle2 size={24} />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#60B5F0] transition-colors">{feat.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">{feat.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY FUTURION (DIFFERENTIALS) */}
      <section className="py-24 px-6 relative z-10">
        <div className="container mx-auto max-w-[1440px]">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
          >
            <span className="font-mono text-[var(--color-accent-primary)] text-xs font-semibold tracking-[0.15em] uppercase mb-4">{t('home.why_overline')}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">{t('home.why_headline')}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <MetricCounter value={t('home.stats.0.value')} label={t('home.stats.0.label')} description={t('home.stats.0.desc')} />
            <MetricCounter value={t('home.stats.1.value')} label={t('home.stats.1.label')} description={t('home.stats.1.desc')} />
            
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once:true }} className="glass-card p-8 flex flex-col gap-4">
              <div className="font-display font-bold text-5xl md:text-6xl hero-gradient-text w-max">
                {t('home.stats.2.value')}
              </div>
              <div>
                <h4 className="font-display font-semibold text-xl mb-2">{t('home.stats.2.label')}</h4>
                <p className="text-[var(--color-text-secondary)]">{t('home.stats.2.desc')}</p>
              </div>
            </motion.div>

            <MetricCounter value={t('home.stats.3.value')} label={t('home.stats.3.label')} description={t('home.stats.3.desc')} />
          </div>
        </div>
      </section>



      {/* SECTION 6: FINAL CTA (REDESIGNED) */}
      <section ref={finalCtaRef} className="final-cta-section py-40 px-6 relative text-center overflow-hidden spatial-scene">
        {/* Deep Spatial Background Elements */}
        <div className="absolute inset-0 bg-[#07070a] z-0">
          {/* Animated Grids or Mesh */}
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          
          {/* Floating Glowing Orbs */}
          <div className="cta-orb-1 floating-orb w-[600px] h-[600px] bg-[var(--color-accent-primary)] -top-1/4 -left-1/4 opacity-[0.07]"></div>
          <div className="cta-orb-2 floating-orb w-[500px] h-[500px] bg-[var(--color-accent-tertiary)] -bottom-1/4 -right-1/4 opacity-[0.05]"></div>
          
          {/* Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-[radial-gradient(circle,rgba(0,212,255,0.08)_0%,transparent_70%)] pointer-events-none"></div>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="final-cta-card glass-panel p-12 md:p-24 rounded-[3rem] relative overflow-hidden group">
            {/* Subtle inner reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="relative z-10"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="font-mono text-[var(--color-accent-primary)] text-xs font-semibold tracking-[0.3em] uppercase">{t('home.final_cta_overline')}</span>
              </motion.div>
              
              <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-display font-extrabold mb-8 hero-gradient-text leading-[1.1] tracking-tight">
                {t('home.final_cta_headline')}
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                {t('home.final_cta_subtitle')}
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <HoverButton to="/contato" backgroundColor="var(--color-accent-primary)" textColor="var(--color-bg-primary)" hoverTextColor="var(--color-bg-primary)" glowColor="white" className="w-full sm:w-auto !px-14 !py-6 text-xl font-bold shadow-[0_20px_40px_rgba(0,212,255,0.3)]">
                  {t('home.final_cta_btn')}
                </HoverButton>
                
                <HoverButton href="https://wa.me/5551995766416?text=Olá,%20gostaria%20de%20conhecer%20um%20pouco%20mais%20de%20suas%20soluções." target="_blank" rel="noopener noreferrer" glowColor="#25D366" className="!bg-transparent border-[rgba(37,211,102,0.4)] !text-[#25D366] hover:!bg-[rgba(37,211,102,0.05)] w-full sm:w-auto !px-14 !py-6 text-xl font-bold">
                  <MessageSquare size={24} className="mr-2" /> {t('home.whatsapp')}
                </HoverButton>
              </motion.div>
            </motion.div>
            
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/5 rounded-tl-[3rem] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/5 rounded-br-[3rem] pointer-events-none"></div>
          </div>
        </div>
      </section>


    </div>
  );
}
