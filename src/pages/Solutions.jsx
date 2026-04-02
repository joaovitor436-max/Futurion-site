import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { motion } from 'framer-motion';
import { HoverButton } from '../components/HoverButton';
import { ArrowRight, Code2, Cpu, BarChart3, Globe2, Layers, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export default function Solutions() {
  const { t } = useI18n();
  
  const services = t('home.services') || [];
  const icons = [<Globe2 />, <Cpu />, <Layers />, <Code2 />, <BarChart3 />, <ShieldCheck />];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[var(--color-bg-primary)]">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--color-accent-primary)] opacity-[0.05] blur-[120px] rounded-full -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[var(--color-accent-secondary)] opacity-[0.03] blur-[100px] rounded-full translate-x-1/2"></div>
        
        <div className="container mx-auto max-w-[1440px] relative z-10 text-center">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="flex flex-col items-center gap-6"
          >
            <motion.span variants={fadeInUp} className="font-mono text-[var(--color-accent-primary)] text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 bg-[var(--color-accent-primary)]/5 rounded-full border border-[var(--color-accent-primary)]/10">
              {t('home.solutions_overline')}
            </motion.span>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-7xl font-display font-extrabold leading-[1.1] max-w-4xl hero-gradient-text">
              {t('home.solutions_headline')}
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mx-auto font-light">
              {t('home.solutions_subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-[1440px]">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp} 
                className="glass-card p-10 group relative overflow-hidden transition-all duration-500 hover:border-[var(--color-accent-primary)]/30"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 p-8 text-[var(--color-accent-primary)]/5 pointer-events-none group-hover:scale-150 transition-transform duration-700">
                  {React.cloneElement(icons[idx] || <Layers />, { size: 120 })}
                </div>
                
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-primary)]/10 flex items-center justify-center text-[var(--color-accent-primary)] mb-8 group-hover:scale-110 group-hover:bg-[var(--color-accent-primary)] group-hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                  {React.cloneElement(icons[idx] || <Layers />, { size: 28 })}
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[var(--color-accent-primary)]/10 rounded-full text-[var(--color-accent-primary)] text-[10px] font-bold tracking-widest uppercase">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4 group-hover:text-[var(--color-accent-primary)] transition-colors">{service.title}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg font-light mb-8 italic">
                    {service.desc}
                  </p>
                  
                  <Link to="/contato" className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] group-hover:translate-x-2 transition-transform cursor-pointer">
                    {t('common.learn_more')} <ArrowRight size={16} className="text-[var(--color-accent-primary)]" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-24 px-6 bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)] relative">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <span className="font-mono text-[var(--color-accent-primary)] text-xs font-semibold tracking-widest uppercase mb-4 block">{t('solutions_page.workflow_overline')}</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">{t('solutions_page.workflow_headline')}</h2>
              <p className="text-xl text-[var(--color-text-secondary)] font-light leading-relaxed mb-10">
                {t('solutions_page.workflow_subtitle')}
              </p>
              
              <div className="flex flex-col gap-8">
                {(t('solutions_page.workflow_steps') || []).map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="text-3xl font-display font-bold text-[var(--color-accent-primary)] opacity-50">0{idx + 1}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-[var(--color-text-secondary)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-tertiary)] border border-[var(--color-border-subtle)] shadow-2xl flex items-center justify-center p-12 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
                {/* Visual Representation of System/Code */}
                <div className="relative z-10 w-full h-full flex flex-col gap-6 font-mono text-sm overflow-hidden opacity-50">
                   <div className="p-4 rounded-lg bg-[var(--color-accent-primary)]/5 border border-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] animate-[pulse_4s_infinite]">
                      {"{"} type: "AI_AGENT", accuracy: "99.9%", status: "OPTIMIZED" {"}"}
                   </div>
                   <div className="p-4 rounded-lg bg-[var(--color-accent-secondary)]/5 border border-[var(--color-accent-secondary)]/20 text-[var(--color-accent-secondary)] ml-8 animate-[pulse_6s_infinite]">
                      const deploy = await Futurion.launch(projectContext);
                   </div>
                   <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20 text-green-500 ml-4 animate-[pulse_5s_infinite]">
                      success: "Production environmental established successfully."
                   </div>
                   <div className="p-4 rounded-lg bg-[var(--color-accent-primary)]/5 border border-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] ml-12">
                      {"["} scale: "ELASTIC", uptime: "99.99%", latency: "12ms" {"]"}
                   </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass-card p-6 border-[var(--color-accent-primary)]/40 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center text-white">
                       <Cpu size={24} />
                    </div>
                    <div>
                       <div className="text-xs font-mono text-[var(--color-accent-primary)] font-bold mb-1">{t('solutions_page.ai_engine_title')}</div>
                       <div className="text-lg font-bold">{t('solutions_page.ai_engine_desc')}</div>
                    </div>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 relative text-center">
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            <h2 className="text-4xl md:text-6xl font-display font-extrabold hero-gradient-text leading-tight">
              {t('solutions_page.final_cta_headline')}
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {t('solutions_page.final_cta_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mt-4 w-full sm:w-auto">
              <HoverButton to="/contato" className="w-full sm:w-auto !px-12 !py-5 text-lg">
                {t('solutions_page.final_cta_btn_expert')}
              </HoverButton>
              <HoverButton to="/produtos/futurion-seeds" className="!bg-transparent border-[var(--color-border-subtle)] w-full sm:w-auto !px-12 !py-5 text-lg">
                {t('solutions_page.final_cta_btn_products')}
              </HoverButton>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
