import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LogoCloud } from '../components/ui/logo-cloud';
import { TestimonialsColumn } from '../components/ui/testimonials-column';
import { useI18n } from '../i18n/I18nContext';
import { HoverButton } from '../components/HoverButton';

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



export default function Partners() {
  const { t } = useI18n();
  // Get all localized testimonials
  const allTestimonials = t('partners.testimonials_list') || [];
  
  // Split them across 3 columns for the animated effect
  const testimonialsCol1 = allTestimonials.slice(0, 3);
  const testimonialsCol2 = allTestimonials.slice(3, 6);
  const testimonialsCol3 = allTestimonials.slice(6, 9);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[var(--color-bg-primary)]">
      
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 relative">
        <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-[rgba(123,97,255,0.05)] to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto max-w-[1000px] text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
            <motion.span variants={fadeInUp} className="font-mono text-[var(--color-accent-tertiary)] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
              {t('partners.overline')}
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-display font-extrabold leading-tight tracking-tight text-[var(--color-text-primary)] mb-6">
              {t('partners.headline')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-medium leading-relaxed max-w-2xl">
              {t('partners.subtitle')}
            </motion.p>
            <motion.p variants={fadeInUp} className="mt-4 text-[var(--color-text-muted)]">
              {t('partners.tagline')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* PARTNERS LOGO CLOUD */}
      <section className="py-24 px-6 overflow-hidden bg-[var(--color-bg-primary)]">
        <div className="container mx-auto max-w-[1440px]">
          <LogoCloud
            logos={[
              { src: '/cem.png', alt: 'Cem', height: 52 },
              { src: '/anteci.png', alt: 'Antecipy', height: 52 },
              { src: '/logcloud.png', alt: 'Cloud', height: 70, scale: 1 },
              { src: '/insure.png', alt: 'Insure', height: 52 },
              { src: '/megas.png', alt: 'Mega', height: 70, scale: 0.75 },
              { src: '/monis.png', alt: 'Monica', height: 52 },
              { src: '/implantare.png', alt: 'Implantare', height: 70 },
              { src: '/tco.png', alt: 'Tco', height: 52, scale: 1.25 },
              { src: '/ttirz.png', alt: 'Tirz', height: 70 }
            ]}
          />
        </div>
      </section>

      {/* TESTIMONIALS ANIMATED COLUMNS */}
      <section className="py-24 px-6 bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)] relative overflow-hidden">
        <div className="container mx-auto max-w-[1440px] z-10 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t('partners.testimonials_headline')}</h2>
            <p className="text-[var(--color-text-secondary)]">{t('partners.testimonials_subtitle')}</p>
          </motion.div>

          <div className="relative h-[600px] md:h-[800px] w-full [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full absolute inset-0">
              <TestimonialsColumn 
                testimonials={testimonialsCol1} 
                duration={35} 
                className="hidden md:block h-full" 
              />
              <TestimonialsColumn 
                testimonials={testimonialsCol2} 
                duration={45} 
                reverse={true} 
                className="h-full" 
              />
              <TestimonialsColumn 
                testimonials={testimonialsCol3} 
                duration={55} 
                className="hidden lg:block h-full" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="container mx-auto max-w-3xl">
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold mb-6">{t('partners.cta_headline')}</motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-[var(--color-text-secondary)] mb-10">{t('partners.cta_subtitle')}</motion.p>
          <motion.div variants={fadeInUp}>
            <HoverButton 
              to="/contato" 
              backgroundColor="var(--color-accent-primary)" 
              textColor="var(--color-bg-primary)" 
              hoverTextColor="var(--color-bg-primary)" 
              glowColor="white"
              className="group mx-auto !px-12 !py-5 text-lg"
            >
              {t('partners.cta_btn')} <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </HoverButton>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
