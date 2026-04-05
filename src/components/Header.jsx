import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import { Menu, X, ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { HoverButton } from './HoverButton';

// Helper for Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const { language, setLanguage, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.solutions'), path: '/solucoes' }, 
    { 
      name: t('nav.products'), 
      path: '#',
      dropdown: [
        { name: 'Futurion Seeds', path: '/produtos/futurion-seeds' },
        { name: 'Futurion Stock', path: '/produtos/futurion-stock' }
      ]
    },
    { name: t('nav.partners'), path: '/parceiros' },
    { name: t('nav.contact'), path: '/contato' }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-[var(--color-bg-glass)] backdrop-blur-md border-b border-[var(--color-border-subtle)] py-4" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6 max-w-[1440px] flex justify-between items-center lg:grid lg:grid-cols-3">
        
        {/* Logo (Left side) */}
        <div className="flex justify-start">
          <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
            <img src="/logofuturionbr.png" alt="Futurion Logo" className="h-[36px] md:h-[44px] w-auto" />
          </Link>
        </div>

        {/* Desktop Nav (Center) */}
        <nav className="hidden lg:flex items-center justify-center gap-8">
          {navLinks.map((link, idx) => (
            <div key={idx} className="relative group">
              {link.dropdown ? (
                <div className="flex items-center gap-1 cursor-pointer text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors">
                  {link.name}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                    <div className="bg-[#0A0A0F] border border-[rgba(255,255,255,0.1)] rounded-2xl shadow-xl overflow-hidden min-w-[200px] flex flex-col p-2">
                      {link.dropdown.map((dropLink, dIdx) => (
                        <Link 
                          key={dIdx} 
                          to={dropLink.path}
                          className="px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {dropLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  to={link.path}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    location.pathname === link.path ? "text-[var(--color-accent-primary)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)]"
                  )}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--color-accent-primary)] rounded-full"></span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions (Right side) */}
        <div className="hidden lg:flex items-center justify-end gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            {[
              { code: 'pt-BR', label: 'PT' },
              { code: 'en-US', label: 'EN' }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "px-3 py-1 rounded-full border text-xs font-bold tracking-widest transition-all duration-200",
                  language === lang.code
                    ? "border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] shadow-[0_0_8px_rgba(0,212,255,0.4)] bg-[rgba(0,212,255,0.08)]"
                    : "border-[var(--color-border-subtle)] text-[var(--color-text-muted)] opacity-70 hover:opacity-100 hover:text-[var(--color-text-primary)]"
                )}
                aria-label={`Switch to ${lang.code}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
          
          <HoverButton 
            to="/contato" 
            className="!py-2.5 !px-6 !text-sm border border-[var(--color-border-subtle)] backdrop-blur-md bg-white/5 hover:border-[var(--color-accent-primary)]/50"
            backgroundColor="transparent"
            textColor="var(--color-text-primary)"
            hoverTextColor="var(--color-accent-primary)"
            glowColor="var(--color-accent-primary)"
          >
            {t('nav.cta')}
          </HoverButton>
        </div>

        {/* Mobile Menu Toggle (Right side for mobile) */}
        <div className="flex lg:hidden justify-end">
          <button 
            className="text-[var(--color-text-primary)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0F] pt-24 px-6 lg:hidden">
          <div className="flex flex-col gap-6 h-full">
            {/* Lang Switcher Mobile */}
            <div className="flex items-center gap-3 mb-4">
              {[
                { code: 'pt-BR', label: 'PT' },
                { code: 'en-US', label: 'EN' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    "px-4 py-2 rounded-full border text-sm font-bold tracking-widest transition-all",
                    language === lang.code
                      ? "border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] shadow-[0_0_8px_rgba(0,212,255,0.4)] bg-[rgba(0,212,255,0.08)]"
                      : "border-[var(--color-border-subtle)] text-[var(--color-text-muted)] opacity-70"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-4 text-xl">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</Link>
              <Link to="/solucoes" onClick={() => setMobileMenuOpen(false)}>{t('nav.solutions')}</Link>
              <div className="flex flex-col gap-2 pl-4 border-l border-[var(--color-border-subtle)] my-2">
                <span className="text-sm text-[var(--color-text-muted)] uppercase tracking-wider">{t('nav.products')}</span>
                <Link to="/produtos/futurion-seeds" className="text-lg" onClick={() => setMobileMenuOpen(false)}>Futurion Seeds</Link>
                <Link to="/produtos/futurion-stock" className="text-lg" onClick={() => setMobileMenuOpen(false)}>Futurion Stock</Link>
              </div>
              <Link to="/parceiros" onClick={() => setMobileMenuOpen(false)}>{t('nav.partners')}</Link>
              <Link to="/contato" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</Link>
            </nav>

            <div className="mt-auto pb-12">
              <HoverButton 
                to="/contato" 
                className="w-full !py-4 border border-[var(--color-border-subtle)] backdrop-blur-md bg-white/5 hover:border-[var(--color-accent-primary)]/50"
                backgroundColor="transparent"
                textColor="var(--color-text-primary)"
                hoverTextColor="var(--color-accent-primary)"
                glowColor="var(--color-accent-primary)"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.cta')}
              </HoverButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
