import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, PlayCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { HoverButton } from './HoverButton';

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

// Shared layout for product pages that don't have screenshots yet (Lux, Med).
// Same sections as the Seeds page: hero, overview, features, workflow, audience, CTA.
export default function ProductLanding({ ns, logo, name, accent, accentSoft, icons }) {
  const { t } = useI18n();

  const pills = t(`${ns}.feature_pills`) || [];
  const features = t(`${ns}.features_list`) || [];
  const steps = t(`${ns}.workflow_steps`) || [];
  const personas = t(`${ns}.personas`) || [];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[var(--color-bg-primary)]">

      <style>{`
        .product-grid-bg {
          background-image: radial-gradient(${accentSoft} 1px, transparent 0);
          background-size: 32px 32px;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden product-grid-bg px-6 md:px-10 pt-32 pb-20">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: accentSoft, filter: 'blur(180px)' }}
        />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* LEFT: Text Content */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col gap-8 z-10">
            <motion.div variants={fadeInUp} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] font-mono uppercase tracking-wider mb-2">
              <Link to="/" className="hover:text-[var(--color-accent-primary)] transition-colors">{t(`${ns}.breadcrumb_home`)}</Link>
              <ChevronRight size={14} />
              <span>{t(`${ns}.breadcrumb_products`)}</span>
              <ChevronRight size={14} />
              <span style={{ color: accent }}>{t(`${ns}.breadcrumb_current`)}</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="self-start">
              <img src={logo} alt={`${name} Logo`} className="h-16 md:h-20 w-auto mb-2" />
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display font-extrabold text-5xl md:text-6xl tracking-tighter leading-[1.05] bg-gradient-to-br from-[#e4e1e9] to-[#bbc9cf] bg-clip-text text-transparent">
              {t(`${ns}.hero_headline`)}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[#bbc9cf] text-lg leading-relaxed max-w-xl font-light">
              {t(`${ns}.hero_description`)}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-2">
              <HoverButton to="/contato" backgroundColor={accent} textColor="var(--color-bg-primary)" hoverTextColor="var(--color-bg-primary)" glowColor="white" className="whitespace-nowrap">
                {t(`${ns}.btn_demo`)}
              </HoverButton>
              <HoverButton href="#funcionalidades" className="!bg-transparent border-[rgba(60,73,78,0.5)] whitespace-nowrap" textColor={accent} hoverTextColor={accent} glowColor={accent}>
                <PlayCircle size={18} /> {t(`${ns}.btn_features`)}
              </HoverButton>
            </motion.div>
          </motion.div>

          {/* RIGHT: Modules panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative z-10"
          >
            <div className="absolute -inset-10 rounded-full blur-[80px] pointer-events-none" style={{ background: accentSoft }}></div>
            <div className="relative spatial-glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/10">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-3 h-3 rounded-full bg-[#ff5e5e]/70"></span>
                <span className="w-3 h-3 rounded-full bg-[#ff9d00]/70"></span>
                <span className="w-3 h-3 rounded-full bg-[#00ffa3]/70"></span>
                <span className="ml-4 font-mono text-xs tracking-widest uppercase text-white/40">{name}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pills.map((label, idx) => {
                  const Icon = icons[idx];
                  return (
                    <div key={label} className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{ color: accent, borderColor: accent + '4D', background: accent + '1A' }}>
                        <Icon size={22} />
                      </div>
                      <span className="font-display font-semibold text-white text-lg leading-tight">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${accent}40,transparent)` }}></div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="py-24 px-6 bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)]">
        <div className="container mx-auto max-w-[1000px]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="w-16 h-1 mb-8" style={{ background: accent }}></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-display font-bold mb-8 text-[var(--color-text-primary)]">{t(`${ns}.overview_title`)}</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-display font-light leading-relaxed text-[var(--color-text-primary)]">
              {t(`${ns}.overview_desc`)}
            </motion.p>
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
            <span className="font-mono text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: accent }}>{t(`${ns}.features_overline`)}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">{t(`${ns}.features_headline`)}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = icons[idx + pills.length] || CheckCircle2;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="spatial-glass-card p-10 rounded-[2.5rem] border border-white/5 flex flex-col items-start relative overflow-hidden group"
                >
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center mb-8" style={{ color: accent }}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl mb-4 tracking-tight">{feat.title}</h3>
                  <p className="text-[16px] text-gray-400 leading-relaxed font-light">{feat.desc}</p>
                  <div className="absolute bottom-0 left-0 w-full h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }}></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="py-24 px-6 bg-[var(--color-bg-secondary)] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[rgba(255,255,255,0.05)] -translate-y-1/2 hidden lg:block">
          <div className="h-full w-1/3 opacity-50 animate-[shimmer_4s_infinite_linear]" style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }}></div>
        </div>

        <div className="container mx-auto max-w-[1440px] relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-4">{t(`${ns}.workflow_headline`)}</h2>
            <p className="text-[var(--color-text-secondary)]">{t(`${ns}.workflow_overline`)}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-col items-center text-center lg:pt-12 relative"
              >
                {idx !== steps.length - 1 && <div className="w-[2px] h-8 bg-[rgba(255,255,255,0.1)] lg:hidden my-2"></div>}
                <div
                  className="w-16 h-16 rounded-full bg-[var(--color-bg-primary)] border-2 flex items-center justify-center text-xl font-bold font-mono mb-6 relative z-10 lg:absolute lg:top-[-32px]"
                  style={{ borderColor: accent, color: accent, boxShadow: `0 0 20px ${accent}4D` }}
                >
                  0{idx + 1}
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">{t(`${ns}.target_headline`)}</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personas.map((persona, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="glass-card p-6 flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <CheckCircle2 size={24} style={{ color: accent }} />
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
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="container mx-auto max-w-4xl relative z-10">
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold mb-10 leading-tight">
            {t(`${ns}.cta_headline`)}
          </motion.h2>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <HoverButton to="/contato" backgroundColor={accent} textColor="var(--color-bg-primary)" hoverTextColor="var(--color-bg-primary)" glowColor="white" className="w-full sm:w-auto !px-12 !py-5 text-lg">
              {t(`${ns}.cta_btn_demo`)}
            </HoverButton>
            <HoverButton href={t('contact.whatsapp_url')} target="_blank" rel="noopener noreferrer" glowColor="#25D366" className="!bg-transparent border-[#25D366] !text-[#25D366] hover:!text-[#25D366] w-full sm:w-auto !px-12 !py-5 text-lg">
              {t(`${ns}.cta_btn_expert`)}
            </HoverButton>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
