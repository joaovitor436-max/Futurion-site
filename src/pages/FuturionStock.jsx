import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, ArrowRight, ShieldCheck, Clock, MapPin, Search, Mic, Download, 
  MessageSquare, LayoutDashboard, Fullscreen, Truck, Eye, CheckCircle2,
  Box, Boxes, FileSpreadsheet, Lock, Users, Zap, Settings, HelpCircle, Key, Battery, Map, Crosshair, AlertTriangle, ArrowDown, Plus, Minus, Activity, BarChart4, Cpu, Sparkles,
  Server, ClipboardCheck, BarChart3, GitBranch
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n/I18nContext';
import { HoverButton } from '../components/HoverButton';

gsap.registerPlugin(ScrollTrigger);

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

// --- REUSABLE COMPONENTS ---
const Badge = ({ icon, text, type = 'blue', className = "" }) => {
  const colors = {
    blue: 'bg-[#0080CC]/15 text-[#60B5F0] border-[#0080CC]/30',
    red: 'bg-red-500/15 text-red-400 border-red-500/30',
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    cyan: 'bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20',
  };
  
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md ${colors[type]} ${className}`}>
      {icon && <span className="text-sm">{icon}</span>}
      <span className="font-['Inter'] text-[10px] font-bold tracking-[0.2em] uppercase">{text}</span>
    </div>
  );
};

const ResolveBadge = ({ text }) => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-500/10 border border-red-500/20 mb-4">
    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
    <span className="text-[10px] font-bold text-red-400 tracking-wider uppercase">RESOLVE: {text}</span>
  </div>
);

export default function FuturionStockLanding() {
  const { t } = useI18n();
  const [formType, setFormType] = useState('register');
  const mainRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });

      // Parallax Grid
      gsap.to(".bg-grid", {
        yPercent: 20,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Independent Section Animation Triggers
      gsap.utils.toArray(".animate-container").forEach((container) => {
        gsap.from(container.querySelectorAll(".animate-card"), {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
          }
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-[#0A1628] text-white font-['Inter'] selection:bg-[#0080CC] selection:text-white overflow-x-hidden min-h-screen relative">
      
      {/* GLOBAL BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#00619B]/20 blur-[120px] rounded-full mix-blend-screen"></div>
         <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#0080CC]/10 blur-[150px] rounded-full mix-blend-screen"></div>
         <div className="bg-grid absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50"></div>
      </div>

      {/* 2. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Navy to Blue Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0A1628] to-[#142C4C] -z-10"></div>
        
        <div className="container mx-auto max-w-[1200px] text-center relative z-10 hero-content">
          <Badge icon={<Zap size={14} className="text-[#00D4FF]"/>} text={t('stock.badge')} type="cyan" className="mb-8" />
          
          <img 
            src="/stocklogo.png" 
            alt="Futurion Stock Logo" 
            className="h-24 md:h-32 w-auto mx-auto mb-6 drop-shadow-[0_0_15px_rgba(0,128,204,0.3)]"
          />

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-['Space_Grotesk'] font-bold leading-[1.1] tracking-tight mb-8">
            {t('stock.headline_prefix')} <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#60B5F0] to-[#0080CC] drop-shadow-[0_0_30px_rgba(0,128,204,0.3)]">
              {t('stock.headline_highlight')}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto mb-12">
            {t('stock.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-24 justify-center">
            <HoverButton to="/contato" backgroundColor="white" textColor="#0A1628" hoverTextColor="#0080CC" glowColor="#0080CC" className="!rounded-full px-12 !h-14">
              {t('stock.btn_free')}
            </HoverButton>
            <HoverButton href="#recursos" backgroundColor="transparent" className="!bg-white/5 border-white/10 backdrop-blur-md !rounded-full px-12 !h-14">
              {t('stock.btn_features')}
            </HoverButton>
          </div>

          {/* Glossy Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full animate-container">
            {(t('stock.stats') || []).map((metric, i) => (
              <div key={i} className="animate-card bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden group hover:border-[#0080CC]/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(96,181,240,0.3)] group-hover:scale-110 transition-transform duration-500">{metric.v}</span>
                <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] text-center uppercase">{metric.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <ArrowDown size={24} />
        </div>
      </section>

      {/* 3. SEÇÃO "DORES" — Numbered Steps and RESOLVE Badges */}
      <section className="py-32 px-6 bg-[#0A1628]">
        <div className="container mx-auto max-w-[1200px]">
          <div className="text-center mb-24">
            <Badge icon={<AlertTriangle size={14} className="text-red-400"/>} text={t('stock.pains_overline')} type="red" className="mb-8" />
            <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold mb-8">
              {t('stock.pains_headline_prefix')} <br />
              <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                {t('stock.pains_headline_highlight')}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-container">
            {(t('stock.pains_list') || []).map((dor, i) => {
              const icons = [<Clock className="text-gray-400" size={24} />, <AlertTriangle className="text-gray-400" size={24} />, <ShieldCheck className="text-gray-400" size={24} />, <Truck className="text-gray-400" size={24} />];
              return (
                <div key={i} className="animate-card bg-[#142C4C]/40 border border-white/5 p-10 rounded-[2.5rem] relative group hover:bg-[#142C4C] transition-all duration-500 overflow-hidden">
                  <div className="absolute top-6 right-8 text-5xl font-['Space_Grotesk'] font-black text-white/[0.03] group-hover:text-[#0080CC]/10 transition-colors">0{i+1}</div>
                  
                  <div className="w-14 h-14 rounded-2xl bg-[#0A1628] border border-white/10 flex items-center justify-center mb-8 relative z-10">
                    {icons[i]}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00D4FF] rounded-full blur-[4px]"></div>
                  </div>

                  <h3 className="text-lg font-bold mb-4 flex items-center gap-3">
                    {dor.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    {dor.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MODER DESK MOCKUP — Interactive tablet showcase */}
      <section className="py-32 px-6 bg-[#142C4C] relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#0080CC]/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-black blur-[120px] opacity-60 pointer-events-none"></div>

        <div className="container mx-auto max-w-[1240px] relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            
            <div className="flex-1 text-left">
              <Badge icon={<Sparkles size={14} className="text-[#60B5F0]"/>} text={t('stock.showcase_badge')} type="blue" className="mb-8" />
              <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold mb-8 leading-tight">{t('stock.showcase_headline')}</h2>
              <p className="text-lg text-gray-400 font-medium leading-relaxed mb-12">{t('stock.showcase_desc')}</p>
              
              <div className="space-y-10">
                {(t('stock.showcase_benefits') || []).map((ben, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-[#0080CC]/50 transition-colors">
                      <CheckCircle2 className="text-[#0080CC]" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white group-hover:text-[#60B5F0] transition-colors">{ben.title}</h4>
                      <p className="text-gray-500 leading-relaxed max-w-md">{ben.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PHOTOREALISTIC TABLET MOCKUP ON DESK */}
            <div className="flex-1 w-full perspective-[2000px] py-20 relative">
               {/* Desk Surface */}
               <div className="absolute bottom-0 left-[-50%] right-[-50%] h-[400px] bg-gradient-to-t from-[#0A1628] to-transparent opacity-60 -z-10 rotate-x-60 skew-x-[-10deg]"></div>

               {/* The Tablet */}
               <div className="relative mx-auto w-full max-w-[600px] aspect-[1.4/1] bg-[#1f2c34] rounded-[2.5rem] border-[12px] border-[#0a0a0f] shadow-[0_100px_100px_rgba(0,0,0,0.8),0_0_50px_rgba(0,128,204,0.1)] overflow-hidden transform rotate-y-[-15deg] rotate-x-[15deg] rotate-z-[5deg] hover:rotate-y-0 hover:rotate-x-0 hover:rotate-z-0 transition-transform duration-1000 ease-out preserve-3d">
                  {/* Screen Content */}
                  <div className="absolute inset-0 bg-[#0A1628]">
                     <img src="/stock.png" alt="Futurion Stock 3D Map" className="w-full h-full object-contain opacity-90 p-4" />
                     
                     {/* Glass Overlay with AI Chat */}
                     <div className="absolute bottom-6 right-6 w-[280px] h-[340px] glass-card rounded-2xl border border-white/20 shadow-2xl p-4 flex flex-col gap-3 overflow-hidden translate-z-20">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0080CC] to-[#00D4FF] flex items-center justify-center"><Cpu size={16}/></div>
                           <div className="text-[10px] font-bold tracking-widest uppercase">{t('stock.ai_status_active')}</div>
                        </div>
                        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                           <div className="bg-white/5 p-3 rounded-xl rounded-tl-none text-[11px] leading-relaxed border border-white/5">
                              {t('stock.chat_greeting')}
                           </div>
                           <div className="bg-[#0080CC]/20 p-3 rounded-xl rounded-tr-none text-[11px] leading-relaxed self-end text-right border border-[#0080CC]/30">
                              {t('stock.chat_question')}
                           </div>
                           <div className="bg-emerald-500/10 p-3 rounded-xl rounded-tl-none text-[11px] leading-relaxed border border-emerald-500/20">
                              <span className="text-[#00D4FF] block mb-1 font-bold">{t('stock.chat_answer')}</span>
                              <div className="flex justify-between mt-2 opacity-60">
                                 <span>{t('stock.ai_chat_pos_label')}: B-12</span>
                                 <span>{t('stock.ai_chat_validity_label')}: 45d</span>
                              </div>
                           </div>
                        </div>
                        <div className="h-8 bg-black/40 rounded-full flex items-center px-3 border border-white/5">
                           <div className="text-[9px] text-gray-500 flex-1">{t('stock.chat_voice_cmd')}</div>
                           <Mic size={12} className="text-[#0080CC]"/>
                        </div>
                     </div>
                  </div>

                  {/* Tablet Bezel Shine */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.05] z-10"></div>
               </div>

               {/* Decorative Lights */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00D4FF]/20 blur-[80px] rounded-full"></div>
               <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#0080CC]/10 blur-[120px] rounded-full"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SEÇÃO "RECURSOS" — Resolve Style Feature Grid */}
      <section id="recursos" className="py-32 px-6 bg-[#0A1628]">
        <div className="container mx-auto max-w-[1200px]">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold mb-8">{t('stock.features_headline')}</h2>
            <p className="text-gray-400 font-medium">{t('stock.features_desc')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 animate-container">
            {(t('stock.features_list') || []).map((feat, i) => {
              const icons = [<Map size={24} />, <Cpu size={24} />, <FileSpreadsheet size={24} />, <CheckCircle2 size={24} />, <Search size={24} />, <Boxes size={24} />];
              const problems = t('stock.resolve_labels') || [];
              return (
                <div key={i} className="animate-card bg-white/[0.03] backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/[0.06] hover:border-[#0080CC]/50 transition-all duration-500 group relative">
                  <ResolveBadge text={problems[i]} />
                  
                  <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-[#00619B]/20 to-[#0080CC]/10 text-[#60B5F0] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(0,128,204,0.1)]">
                    {icons[i] || <Zap size={24} />}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 group-hover:text-[#60B5F0] transition-colors">{feat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. SEÇÃO "INTELIGÊNCIA ARTIFICIAL" — Destaque especial para o StockIA */}
      <section className="py-32 px-6 bg-[#142C4C] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] bg-[#00D4FF]/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto max-w-[1240px] relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            
            {/* Elegant AI Chat Mockup */}
            <div className="flex-1 w-full max-w-lg order-2 lg:order-1 relative group">
               <div className="bg-[#0b141a]/80 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5),0_0_30px_rgba(0,212,255,0.1)] overflow-hidden h-[600px] flex flex-col relative group-hover:scale-[1.02] transition-transform duration-700">
                  {/* Glassy Header */}
                  <div className="bg-white/5 backdrop-blur-md h-20 px-8 flex items-center gap-4 border-b border-white/5">
                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0080CC] flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)] animate-pulse">
                        <Cpu className="text-white" size={24}/>
                     </div>
                     <div>
                        <div className="text-white font-bold text-lg tracking-tight">{t('stock.ai_status_core')}</div>
                        <div className="text-[#00D4FF] text-[10px] font-black uppercase tracking-widest">{t('stock.ai_status_analyst')}</div>
                     </div>
                  </div>

                  {/* Chat Timeline */}
                  <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-[radial-gradient(circle_at_top_right,rgba(0,212,255,0.05),transparent)]">
                     <div className="bg-white/5 p-5 rounded-[1.5rem] rounded-tl-none text-sm text-gray-300 border border-white/5 max-w-[85%] leading-relaxed shadow-sm">
                        {t('stock.chat_greeting')}
                     </div>
                     <div className="bg-[#0080CC]/30 p-5 rounded-[1.5rem] rounded-tr-none text-sm text-white border border-[#0080CC]/40 max-w-[85%] self-end ml-auto leading-relaxed shadow-lg">
                        {t('stock.chat_question')}
                     </div>
                     <div className="bg-white/5 p-6 rounded-[1.5rem] rounded-tl-none text-sm text-gray-300 border border-white/10 max-w-[90%] shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                           <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{t('stock.ai_chat_location')}</span>
                        </div>
                        <p className="mb-4 text-gray-200">
                           {t('stock.chat_answer')}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                               <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">{t('stock.ai_chat_pos_label')}</div>
                              <div className="text-white font-mono text-xs">RACK-B.12.3</div>
                           </div>
                           <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                              <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">{t('stock.ai_chat_validity_label')}</div>
                              <div className="text-[#60B5F0] font-mono text-xs">45 DIAS</div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Glassy Input Bar */}
                  <div className="p-6 bg-white/5 backdrop-blur-md border-t border-white/5 flex items-center gap-4">
                     <div className="h-12 flex-1 glass-card rounded-2xl flex items-center px-5 border border-white/10 text-gray-500 text-sm italic">
                        {t('stock.ai_chat_placeholder')}
                     </div>
                     <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#00D4FF] hover:border-[#00D4FF]/50 hover:bg-[#00D4FF]/20 transition-all cursor-pointer">
                        <Mic size={20}/>
                     </div>
                  </div>
               </div>

               {/* Decorative floating badges */}
               <div className="absolute -top-6 -right-6 glass-card px-4 py-2 rounded-xl border border-white/20 text-[10px] font-bold text-[#00D4FF] z-20 shadow-2xl rotate-6 animate-bounce">
                  {t('stock.ai_precision_badge')}
               </div>
               <div className="absolute -bottom-6 -left-6 glass-card px-4 py-2 rounded-xl border border-white/20 text-[10px] font-bold text-white z-20 shadow-2xl -rotate-6">
                  {t('stock.ai_architecture_badge')}
               </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 text-left order-1 lg:order-2">
              <Badge icon={<Cpu size={14} className="text-[#00D4FF]"/>} text={t('stock.ai_badge')} type="cyan" className="mb-8" />
              <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold mb-8 leading-tight">{t('stock.ai_headline')}</h2>
              <p className="text-lg text-gray-400 font-medium leading-relaxed mb-12 max-w-xl">{t('stock.ai_desc')}</p>
              
              <div className="grid sm:grid-cols-2 gap-6 animate-container">
                {(t('stock.ai_features') || []).map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-2 h-2 rounded-full bg-[#0080CC] group-hover:scale-150 group-hover:bg-[#00D4FF] transition-all duration-300"></div>
                    <span className="text-sm font-semibold tracking-wide text-gray-300 group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-16 flex gap-4">
                 <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                    <Activity size={24}/>
                 </div>
                 <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                    <BarChart4 size={24}/>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. MÓDULOS CORPORATIVOS & ENTERPRISE */}
      <section className="py-32 px-6 bg-[#0A1628] relative">
        <div className="container mx-auto max-w-[1240px]">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold mb-8 leading-tight">{t('stock.enterprise_headline')}</h2>
            <p className="text-gray-500 font-medium">{t('stock.enterprise_desc')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-container">
            {(t('stock.enterprise_modules') || []).map((mod, i) => {
              const icons = [<LayoutDashboard className="text-[#00D4FF]"/>, <ShieldCheck className="text-emerald-400"/>, <Eye className="text-purple-400"/>, <Settings className="text-gray-400"/>, <Download className="text-orange-400"/>, <Users className="text-pink-400"/>];
              return (
                <div key={i} className="animate-card bg-white/[0.03] backdrop-blur-md border border-white/5 p-10 rounded-[3rem] hover:bg-white/[0.06] hover:border-[#0080CC]/50 transition-all duration-700 group perspective-[1000px]">
                  <div className="flex items-center justify-between mb-10 transform-gpu group-hover:translate-z-20 transition-transform">
                    <h4 className="font-bold text-lg text-white group-hover:text-[#60B5F0] transition-colors">{mod.title}</h4>
                    <div className="w-16 h-16 rounded-2xl bg-[#142C4C] border border-white/10 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,128,204,0.3)] transition-all">
                       {icons[i] || <Settings />}
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {(mod.features || []).map((f, j) => (
                      <li key={j} className="text-sm text-gray-500 flex items-start gap-4 group/item">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0080CC]/40 group-hover/item:bg-[#00D4FF] transition-all"></div>
                        <span className="group-hover/item:text-gray-300 transition-colors">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. SEÇÃO "PIPELINE OPERACIONAL" — Spatial Timeline */}
      <section className="py-32 px-6 bg-[#142C4C] relative overflow-hidden border-y border-white/5">
        <div className="container mx-auto max-w-[1240px] relative z-10">
          <div className="mb-24">
             <Badge icon={<Activity size={14} className="text-[#60B5F0]"/>} text={t('stock.pipeline_headline')} type="blue" className="mb-8" />
             <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold mb-8 leading-tight">{t('stock.pipeline_desc')}</h2>
          </div>

          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-[45px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#0080CC]/20 to-transparent"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 animate-container">
               {(t('stock.pipeline_steps') || []).map((item, i) => {
                 const icons = [<Download size={22}/>, <MapPin size={22}/>, <Activity size={22}/>, <CheckCircle2 size={22}/>, <Truck size={22}/>];
                 return (
                   <div key={i} className="animate-card relative flex flex-col items-center lg:items-start group">
                     <div className="w-24 h-24 rounded-3xl bg-[#0A1628] border border-white/10 shadow-[0_0_20px_rgba(0,128,204,0.1)] flex items-center justify-center text-[#60B5F0] mb-8 relative z-10 group-hover:scale-110 group-hover:border-[#0080CC]/50 transition-all duration-500">
                       {icons[i] || <Settings size={22}/>}
                       <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#0080CC] text-[10px] text-white font-black flex items-center justify-center border-4 border-[#142C4C] shadow-lg">{i + 1}</div>
                     </div>
                     <h4 className="font-bold text-lg mb-3 text-center lg:text-left group-hover:text-white transition-colors">{item.title}</h4>
                     <p className="text-xs text-gray-500 text-center lg:text-left leading-relaxed font-medium uppercase tracking-wider">{item.desc}</p>
                   </div>
                 );
               })}
            </div>
          </div>
        </div>
      </section>

      {/* 10. DEPOIMENTOS — Glass floating cards */}
      <section id="depoimentos" className="py-32 px-6 bg-[#0A1628]">
        <div className="container mx-auto max-w-[1240px]">
          <div className="text-center mb-24 max-w-2xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold mb-8">{t('stock.testimonials_headline')}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 animate-container">
            {(t('stock.testimonials_list') || []).map((dep, i) => (
              <div key={i} className="animate-card bg-white/[0.03] border border-white/10 p-12 rounded-[3rem] relative group hover:bg-[#142C4C] transition-all duration-700">
                <div className="flex gap-1 text-[#00D4FF] mb-10 group-hover:scale-110 transition-transform origin-left">
                   {[...Array(5)].map((_, j) => <Sparkles key={j} size={14} className="fill-current" />)}
                </div>
                <p className="text-lg text-gray-300 mb-12 italic leading-relaxed font-light">"{dep.text}"</p>
                <div className="mt-auto border-t border-white/10 pt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-bold text-[#00D4FF] shadow-inner">
                     {dep.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white tracking-tight">{dep.name}</div>
                    <div className="text-[10px] font-black text-[#60B5F0] uppercase tracking-[0.2em]">{dep.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. PLANOS — Hyper-modern Enterprise Showcase */}
      <section id="planos" className="py-32 px-6 bg-gradient-to-b from-[#142C4C] to-[#0A1628] relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] bg-[#0080CC]/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto max-w-[1000px] relative z-10">
          <div className="text-center mb-24">
             <Badge icon={<Sparkles size={14} className="text-[#00D4FF]"/>} text={t('stock.pricing_overline')} type="cyan" className="mb-8" />
             <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold mb-8 leading-tight">{t('stock.pricing_headline')}</h2>
             <p className="text-gray-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
               {t('stock.pricing_desc')}
             </p>
          </div>
          
          <div className="bg-[#0b141a]/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-1 md:p-2 shadow-[0_50px_100px_rgba(0,0,0,0.4),0_0_40px_rgba(0,128,204,0.1)] relative overflow-hidden group">
             {/* Header of the card */}
             <div className="p-12 md:p-16 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                <div>
                   <div className="text-[#00D4FF] font-black uppercase tracking-[0.3em] text-xs mb-4">{t('stock.pricing_card_header')}</div>
                   <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4">{t('stock.pricing_card_title')}</h3>
                   <p className="text-gray-500 font-medium max-w-md">{t('stock.pricing_card_subtitle')}</p>
                </div>
                <div className="text-left md:text-right">
                   <div className="text-4xl font-['Space_Grotesk'] font-bold text-white mb-2">{t('stock.pricing_card_price')}</div>
                   <div className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">{t('stock.pricing_card_price_note')}</div>
                </div>
             </div>

             {/* Features Grid */}
             <div className="p-12 md:p-16 grid md:grid-cols-2 lg:grid-cols-3 gap-16 relative z-10 bg-white/[0.01] animate-container">
                {(t('stock.pricing_sections') || []).map((section, idx) => {
                  const icons = [<Server size={20} />, <Cpu size={20} />, <ClipboardCheck size={20} />, <BarChart3 size={20} />, <ShieldCheck size={20} />, <GitBranch size={20} />];
                  const accentColors = ['text-[#00D4FF]', 'text-[#60B5F0]', 'text-emerald-400', 'text-orange-400', 'text-purple-400', 'text-pink-400'];
                  const checkColors = ['group-hover/item:text-[#00D4FF]', 'group-hover/item:text-[#60B5F0]', 'group-hover/item:text-emerald-500', 'group-hover/item:text-orange-500', 'group-hover/item:text-purple-500', 'group-hover/item:text-pink-500'];
                  
                  return (
                    <div key={idx} className="space-y-8 animate-card">
                       <div className={`flex items-center gap-4 ${accentColors[idx]}`}>
                          {icons[idx]}
                          <h4 className="font-bold text-lg tracking-tight">{section.title}</h4>
                       </div>
                       <ul className="space-y-4">
                          {(section.list || []).map((li, lidx) => (
                            <li key={lidx} className="text-sm text-gray-400 flex items-start gap-3 group/item">
                               <CheckCircle2 size={16} className={`mt-0.5 text-gray-700 ${checkColors[idx]} transition-colors`} />
                               <span className="group-hover/item:text-gray-200 transition-colors">{li}</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                  );
                })}
             </div>

             {/* Footer of the card */}
             <div className="p-12 md:p-16 bg-[#142C4C]/40 border-t border-white/5 relative z-10 text-center">
                <HoverButton to="/contato" backgroundColor="white" textColor="#0A1628" hoverTextColor="#0080CC" glowColor="#0080CC" className="w-full max-w-lg mb-8 !rounded-2xl !h-16 text-lg">
                   {t('stock.pricing_cta')}
                </HoverButton>
                <div className="flex flex-wrap justify-center gap-8 text-[10px] uppercase font-black tracking-widest text-gray-500">
                   {(t('stock.pricing_footer_notes') || []).map((note, idx) => (
                    <div key={idx} className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00D4FF]"></div> {note}</div>
                   ))}
                </div>
             </div>

             {/* Animated border/glow effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-[#00D4FF]/5 via-transparent to-[#0080CC]/5 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* END OF SECTIONS */}
    </div>
  );
}
