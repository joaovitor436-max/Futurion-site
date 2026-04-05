import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Activity, MapPin, Thermometer, ClipboardCheck, Globe, Rocket, PlayCircle, ChevronRight, BarChart3, MessageSquare } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { HoverButton } from '../components/HoverButton';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const seedsImg = '/mockup-seeds-desk.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Workflow steps are now coming from translations

export default function FuturionSeeds() {
  const { t } = useI18n();
  
  const featurePills = [
    { dot: '#00fea2', label: t('seeds.feature_pills.0') },
    { dot: '#00D4FF', label: t('seeds.feature_pills.1') },
    { dot: '#c9bfff', label: t('seeds.feature_pills.2') },
    { dot: '#00fea2', label: t('seeds.feature_pills.3') },
  ];

  const workflowStepsLocal = (t('seeds.workflow_steps') || []).map((step, idx) => ({
    step: `0${idx + 1}`,
    ...step
  }));

  const FeatureSpotlight = ({ title, desc, img, isReversed, icon: Icon, id }) => (
    <div className="relative">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={`feature-card shadow-2xl p-8 md:p-12 rounded-[2.5rem] flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 overflow-hidden relative group mb-12`}
      >
        <div className="flex-1 flex flex-col items-start text-left relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#1a7bff]/10 border border-[#1a7bff]/30 text-[#1a7bff] flex items-center justify-center">
              <Icon size={24} />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white">{title}</h3>
          </div>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed font-light">
            {desc}
          </p>
          <div className="mt-10 flex gap-2">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#00ffa3] text-xs font-mono tracking-wider">{t('seeds.tag_premium')}</span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#00D4FF] text-xs font-mono tracking-wider whitespace-nowrap">{t('seeds.tag_precision')}</span>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center lg:justify-end relative">
          <div className={`relative w-full max-w-[580px] ${id}`}>
            <div className="absolute -inset-10 bg-[#1a7bff]/20 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img 
              src={img} 
              alt={title} 
              className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)] rounded-2xl border border-white/10 relative z-10" 
            />
            <div className="absolute inset-0 rounded-2xl border-4 border-white/5 pointer-events-none z-20"></div>
          </div>
        </div>
      </motion.div>
      
      {/* Vertical subtle connector line */}
      <div className="absolute left-1/2 -bottom-12 w-px h-12 bg-gradient-to-b from-[var(--color-accent-primary)]/40 to-transparent hidden lg:block"></div>
    </div>
  );

  const containerRef = React.useRef(null);

  useGSAP(() => {
    const mockups = [".mapping-mockup", ".loc-mockup", ".temp-mockup", ".trace-mockup", ".check-mockup", ".gestao-mockup"];
    mockups.forEach((mockup, i) => {
      gsap.to(mockup, {
        y: -15,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, { scope: containerRef });
  return (
    <div ref={containerRef} className="flex flex-col w-full overflow-hidden bg-[var(--color-bg-primary)]">

      <style>{`
        .seeds-grid-bg {
          background-image: radial-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 0);
          background-size: 32px 32px;
        }
        .seeds-glass-card {
          background: rgba(53, 52, 58, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
      
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden seeds-grid-bg px-6 md:px-10 py-20">

        {/* Background ambient glows */}
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'rgba(0, 212, 255, 0.06)', filter: 'blur(180px)' }}
        />
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, delay: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'rgba(201, 191, 255, 0.08)', filter: 'blur(140px)' }}
        />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* LEFT: Text Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col gap-8 z-10"
          >

            {/* Breadcrumb / Home link */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] font-mono uppercase tracking-wider mb-2">
              <Link to="/" className="hover:text-[var(--color-accent-primary)] transition-colors">{t('seeds.breadcrumb_home')}</Link>
              <ChevronRight size={14} />
              <span>{t('seeds.breadcrumb_products')}</span>
              <ChevronRight size={14} />
              <span className="text-[var(--color-accent-primary)]">{t('seeds.breadcrumb_current')}</span>
            </motion.div>

            {/* Logo instead of badge */}
            <motion.div variants={fadeInUp} className="self-start">
              <img 
                src="/seedslogo.png" 
                alt="Futurion Seeds Logo" 
                className="h-20 md:h-24 w-auto mb-2 drop-shadow-[0_0_15px_rgba(0,212,255,0.3)]"
              />
            </motion.div>

            {/* Main headline */}
            <motion.div variants={fadeInUp}>
              <h1 className="font-display font-extrabold text-5xl md:text-6xl xl:text-7xl tracking-tighter leading-[1.05]">
                <span className="bg-gradient-to-br from-[#e4e1e9] via-[#a8e8ff] to-[#bbc9cf] bg-clip-text text-transparent">
                  {t('seeds.hero_headline').split(' ').slice(0, 2).join(' ')}
                </span>
                <br/>
                <span className="bg-gradient-to-r from-[#00D4FF] to-[#52ffac] bg-clip-text text-transparent">
                  {t('seeds.hero_headline').split(' ').slice(2, 5).join(' ')}
                </span>
                <br/>
                <span className="bg-gradient-to-br from-[#e4e1e9] to-[#bbc9cf] bg-clip-text text-transparent">
                  {t('seeds.hero_headline').split(' ').slice(5).join(' ')}
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p variants={fadeInUp} className="text-[#bbc9cf] text-lg leading-relaxed max-w-xl font-light">
              {t('seeds.hero_description')}
            </motion.p>

            {/* Feature Pills */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              {featurePills.map(({ dot, label }) => (
                <span key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#a8e8ff] border border-[rgba(0,212,255,0.15)] bg-[rgba(0,212,255,0.08)] hover:bg-[rgba(0,212,255,0.16)] transition-all cursor-default" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: dot }}></span>
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-2">
              <HoverButton to="/contato" backgroundColor="var(--color-accent-primary)" textColor="var(--color-bg-primary)" hoverTextColor="var(--color-bg-primary)" glowColor="white">
                {t('seeds.btn_demo')}
              </HoverButton>
              <HoverButton href="#funcionalidades" className="!bg-transparent border-[rgba(60,73,78,0.5)] !text-[#a8e8ff] hover:!text-[#a8e8ff]">
                <PlayCircle size={18} /> {t('seeds.btn_features')}
              </HoverButton>
            </motion.div>

            {/* Trust stats */}
            <motion.div variants={fadeInUp} className="flex gap-8 mt-4 pt-6 border-t border-[rgba(255,255,255,0.05)]">
              {(t('seeds.trust_stats') || []).map((stat, i) => (
                <React.Fragment key={i}>
                  <div>
                    <p className="font-display text-2xl font-bold text-[#00D4FF]">{stat.value}</p>
                    <p className="text-xs text-[#bbc9cf] uppercase tracking-widest mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{stat.label}</p>
                  </div>
                  {i < 2 && <div className="w-px bg-[rgba(255,255,255,0.1)]"></div>}
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Tablet Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex items-center justify-center z-10"
          >

            {/* Glow behind tablet */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[75%] h-[60%] rounded-full" style={{ background: 'rgba(0, 212, 255, 0.12)', filter: 'blur(80px)' }}></div>
            </div>

            {/* Tablet image */}
            <div className="relative">
              <img
                src={seedsImg}
                alt="Futurion Seeds App no Tablet"
                className="relative w-full max-w-[750px] mx-auto drop-shadow-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(0,212,255,0.25),transparent)' }}></div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="py-24 px-6 bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)]">
        <div className="container mx-auto max-w-[1000px]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <motion.div variants={fadeInUp} className="w-16 h-1 bg-[var(--color-accent-primary)] mb-8"></motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-display font-bold mb-8 text-[var(--color-text-primary)]">{t('seeds.overview_title')}</motion.h2>
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-display font-light leading-relaxed text-[var(--color-text-primary)]">
                {t('seeds.overview_desc')}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="funcionalidades" className="py-32 px-6">
        <div className="container mx-auto max-w-[1440px]">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20"
          >
            <span className="font-mono text-[var(--color-accent-primary)] text-xs font-semibold tracking-[0.15em] uppercase mb-4">{t('seeds.features_overline')}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">{t('seeds.features_headline')}</h2>
          </motion.div>

          <div className="flex flex-col gap-12 relative">
            {/* Spotlight 1: Mapeamento Digital */}
            <FeatureSpotlight 
              title={t('seeds.features_list.0.title')} 
              desc={t('seeds.features_list.0.desc')} 
              img="/mapeamento.png" 
              isReversed={false} 
              icon={Globe} 
              id="mapping-mockup"
            />

            {/* Spotlight 2: Localizações */}
            <FeatureSpotlight 
              title={t('seeds.custom_loc_title')} 
              desc={t('seeds.custom_loc_desc')} 
              img="/camaras.png" 
              isReversed={true} 
              icon={MapPin} 
              id="loc-mockup"
            />

            {/* Spotlight 3: Controle de Temperatura */}
            <FeatureSpotlight 
              title={t('seeds.features_list.1.title')} 
              desc={t('seeds.features_list.1.desc')} 
              img="/temperatura.png" 
              isReversed={false} 
              icon={Thermometer} 
              id="temp-mockup"
            />

            {/* Spotlight 4: Rastreabilidade completa */}
            <FeatureSpotlight 
              title={t('seeds.features_list.2.title')} 
              desc={t('seeds.features_list.2.desc')} 
              img="/adm.png" 
              isReversed={true} 
              icon={ClipboardCheck} 
              id="trace-mockup"
            />

            {/* Spotlight 5: Checklists Digitais */}
            <FeatureSpotlight 
              title={t('seeds.features_list.3.title')} 
              desc={t('seeds.features_list.3.desc')} 
              img="/empilhadeira.png" 
              isReversed={false} 
              icon={Activity} 
              id="check-mockup"
            />

            {/* Spotlight 6: Gestão Eficaz */}
            <FeatureSpotlight 
              title={t('seeds.features_list.4.title')} 
              desc={t('seeds.features_list.4.desc')} 
              img="/relatorio.png" 
              isReversed={true} 
              icon={BarChart3} 
              id="gestao-mockup"
            />
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="py-24 px-6 bg-[var(--color-bg-secondary)] relative overflow-hidden">
        {/* Animated Pulse Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[rgba(255,255,255,0.05)] -translate-y-1/2 hidden lg:block">
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-[var(--color-accent-primary)] to-transparent opacity-50 animate-[shimmer_4s_infinite_linear]"></div>
        </div>

        <div className="container mx-auto max-w-[1440px] relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-display font-bold mb-4">{t('seeds.workflow_headline')}</h2>
            <p className="text-[var(--color-text-secondary)]">{t('seeds.workflow_overline')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative">
            {workflowStepsLocal.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-col items-center text-center lg:pt-12 relative"
              >
                {/* Connecting Line for Mobile */}
                {idx !== workflowStepsLocal.length - 1 && <div className="w-[2px] h-8 bg-[rgba(255,255,255,0.1)] lg:hidden my-2"></div>}
                
                <div className="w-16 h-16 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent-primary)] flex items-center justify-center text-xl font-bold font-mono text-[var(--color-accent-primary)] mb-6 relative z-10 shadow-[0_0_20px_rgba(0,212,255,0.3)] lg:absolute lg:top-[-32px]">
                  {step.step}
                </div>
                <h4 className="text-lg font-display font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE SECTION */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-[1000px]">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4">{t('seeds.target_headline')}</h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {(t('seeds.personas') || []).map((persona, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="glass-card p-6 flex flex-col items-start gap-4 hover:border-[var(--color-accent-primary)]">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="text-[var(--color-accent-primary)]" size={24} />
                  <h4 className="text-lg font-bold text-[var(--color-text-primary)]">{persona.title}</h4>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] italic leading-relaxed">"{persona.desc}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRODUCT CTA */}
      <section className="py-24 px-6 relative text-center overflow-hidden bg-gradient-to-b from-transparent to-[var(--color-bg-tertiary)] border-t border-[var(--color-border-subtle)]">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="container mx-auto max-w-4xl relative z-10"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold mb-10 leading-tight">
            {t('seeds.cta_headline')}
          </motion.h2>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <HoverButton to="/contato" backgroundColor="var(--color-accent-primary)" textColor="var(--color-bg-primary)" hoverTextColor="var(--color-bg-primary)" glowColor="white" className="w-full sm:w-auto !px-12 !py-5 text-lg">
              {t('seeds.cta_btn_demo')}
            </HoverButton>
            <HoverButton href="https://wa.me/5551995766416?text=Olá,%20gostaria%20de%20conhecer%20um%20pouco%20mais%20de%20suas%20soluções." target="_blank" rel="noopener noreferrer" glowColor="#25D366" className="!bg-transparent border-[#25D366] !text-[#25D366] hover:!text-[#25D366] w-full sm:w-auto !px-12 !py-5 text-lg">
              {t('seeds.cta_btn_expert')}
            </HoverButton>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
