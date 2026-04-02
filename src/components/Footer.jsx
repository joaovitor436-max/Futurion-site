import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n/I18nContext';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.584 3.914 1.594 5.397l-.997 3.646 3.9-.997zm11.323-4.416c-.19-.094-1.127-.556-1.302-.619-.175-.063-.302-.094-.43.094-.127.19-.493.619-.604.745-.111.127-.223.143-.414.048-.19-.094-.8-.294-1.522-.94-.563-.502-.942-1.123-1.053-1.313-.11-.19-.013-.294.082-.388.086-.085.19-.223.285-.334.095-.11.127-.19.191-.317.064-.127.032-.239-.016-.334-.048-.094-.43-1.033-.587-1.43-.153-.38-.302-.33-.43-.33h-.365c-.127 0-.334.048-.509.239-.175.19-.668.651-.668 1.588 0 .937.683 1.842.778 1.968.095.127 1.343 2.051 3.255 2.877.455.197.81.314 1.084.402.458.145.874.125 1.205.074.368-.056 1.126-.46 1.285-.905.159-.444.159-.825.111-.905-.048-.08-.175-.127-.365-.221z"/>
  </svg>
);


export default function Footer() {
  const { t } = useI18n();
  const footerRef = useRef();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useGSAP(() => {
    gsap.from(".footer-item", {
      scrollTrigger: {
        trigger: ".footer-container",
        start: "top 98%",
      },
      y: 15,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    });
  }, { scope: footerRef });

  const links = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.solutions'), path: '/solucoes' },
    { name: 'Seeds', path: '/produtos/futurion-seeds' },
    { name: 'Stock', path: '/produtos/futurion-stock' },
    { name: t('nav.partners'), path: '/parceiros' },
    { name: t('nav.contact'), path: '/contato' }
  ];

  return (
    <footer ref={footerRef} className="py-20 relative border-t border-white/5 overflow-hidden">
      {/* Enhanced Glassmorphism Base */}
      <div className="absolute inset-0 bg-[#050A10]/80 backdrop-blur-[40px] z-0"></div>
      
      {/* Spatial Glow Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/40 to-transparent z-10"></div>

      <div className="container mx-auto px-6 max-w-[1440px] relative z-20">
        <div className="flex flex-col items-center gap-12 text-center">
          
          <div className="footer-item max-w-2xl">
            <p className="text-white text-xl md:text-2xl leading-tight font-display font-medium transition-all cursor-default select-none tracking-tight">
              {t('footer.tagline')}
            </p>
          </div>

          <nav className="footer-item flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {links.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="text-white/70 hover:text-white transition-all text-[13px] uppercase tracking-[0.2em] font-bold group relative py-1"
              >
                {link.name}
                <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-[var(--color-accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
            ))}
          </nav>

          <div className="footer-item flex flex-col items-center gap-6 pt-6 border-t border-white/5 w-full max-w-4xl">
            <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-between opacity-40">
              <span className="text-[12px] font-mono uppercase tracking-[0.3em]">
                {`© ${new Date().getFullYear()} ${t('footer.rights')}`}
              </span>
              
              <button 
                onClick={scrollToTop}
                className="group flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                aria-label="Back to Top"
              >
                {t('footer.back_to_top')}
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:border-[var(--color-accent-primary)] group-hover:bg-[var(--color-accent-primary)] group-hover:text-black">
                   <ArrowUp size={14} />
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
