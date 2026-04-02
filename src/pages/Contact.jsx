import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MessageSquare, MapPin, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { HoverButton } from '../components/HoverButton';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useI18n();
  const container = useRef();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useGSAP(() => {
    // Hero Animations
    const tl = gsap.timeline();
    tl.from(".hero-title", { y: 60, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

    // Floating Orbs Animation
    gsap.to(".orb-primary", {
      y: -40,
      x: 30,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    gsap.to(".orb-secondary", {
      y: 30,
      x: -20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Form Hover Tilt Logic
    const formEl = container.current.querySelector(".contact-form-container");
    if (formEl) {
      const onMove = (e) => {
        const bounds = formEl.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const xPct = (mouseX / bounds.width - 0.5) * 2;
        const yPct = (mouseY / bounds.height - 0.5) * 2;

        gsap.to(formEl, {
          rotateY: xPct * 4,
          rotateX: -yPct * 4,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true
        });
      };

      const onLeave = () => {
        gsap.to(formEl, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        });
      };

      formEl.addEventListener("mousemove", onMove);
      formEl.addEventListener("mouseleave", onLeave);
    }

    // Reveal Form on Scroll
    gsap.from(".contact-form-container", {
      scrollTrigger: {
        trigger: ".contact-form-container",
        start: "top 85%",
      },
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });

  }, { scope: container });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        assunto: '',
        mensagem: ''
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  return (
    <div ref={container} className="flex flex-col w-full min-h-screen bg-[var(--color-bg-primary)] overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="pt-48 pb-24 px-6 relative overflow-hidden">
        {/* Antigravity Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-primary floating-orb w-[500px] h-[500px] bg-[var(--color-accent-primary)] opacity-[0.08] top-[-100px] right-[-100px]"></div>
          <div className="orb-secondary floating-orb w-[400px] h-[400px] bg-[var(--color-accent-tertiary)] opacity-[0.06] bottom-[-50px] left-[-50px]"></div>
        </div>

        <div className="container mx-auto max-w-[1100px] text-center relative z-10">
          <div className="flex flex-col items-center">
            <h1 className="hero-title text-6xl md:text-8xl font-display font-black leading-tight tracking-tighter text-[var(--color-text-primary)] mb-8">
              {t('contact.headline')}
            </h1>
            <h2 className="hero-subtitle text-2xl md:text-5xl bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-tertiary)] bg-clip-text text-transparent font-bold mb-8">
              {t('contact.subtitle_primary')}
            </h2>
            <p className="hero-desc text-xl md:text-2xl text-[var(--color-text-secondary)] font-light leading-relaxed max-w-3xl">
              {t('contact.subtitle_secondary')}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-16 px-6 relative z-10">
        <div className="container mx-auto max-w-[1440px]">
          <div className="cards-grid grid grid-cols-1 md:grid-cols-3 gap-8 perspective-container">
            {/* E-mail Card */}
            <div className="contact-card spatial-glass-card p-12 flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-2xl bg-[rgba(0,212,255,0.05)] text-[var(--color-accent-primary)] flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_0_30px_rgba(0,212,255,0.15)] border border-[rgba(0,212,255,0.2)]">
                <Mail size={36} />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">{t('contact.card_email_title')}</h3>
              <p className="text-[var(--color-text-primary)] mb-2 font-semibold text-xl tracking-tight">contato@futurion.com.br</p>
              <p className="text-[var(--color-text-secondary)] mb-10 text-base opacity-80">{t('contact.card_email_note')}</p>
              <HoverButton
                href="mailto:contato@futurion.com.br"
                backgroundColor="var(--color-accent-primary)"
                glowColor="rgba(0,212,255,0.4)"
                className="w-full mt-auto !py-5 uppercase tracking-widest text-sm font-black"
              >
                {t('contact.card_email_btn')}
              </HoverButton>
            </div>

            {/* WhatsApp Card */}
            <div className="contact-card spatial-glass-card p-12 flex flex-col items-center text-center group border-[rgba(37,211,102,0.2)] hover:border-[rgba(37,211,102,0.5)]">
              <div className="w-20 h-20 rounded-2xl bg-[rgba(37,211,102,0.05)] text-[#25D366] flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-[0_0_30px_rgba(37,211,102,0.2)] border border-[rgba(37,211,102,0.3)] relative">
                <div className="absolute inset-0 bg-[#25D366] opacity-0 group-hover:opacity-10 blur-xl transition-opacity animate-pulse"></div>
                <WhatsAppIcon />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">{t('contact.card_whatsapp_title')}</h3>
              <p className="text-[var(--color-text-primary)] mb-2 font-semibold text-xl tracking-tight">{t('contact.card_whatsapp_value')}</p>
              <p className="text-[var(--color-text-secondary)] mb-10 text-base opacity-80">{t('contact.card_whatsapp_note')}</p>
              <HoverButton
                onClick={() => window.open(t('contact.whatsapp_url'), "_blank")}
                backgroundColor="#25D366"
                glowColor="rgba(37,211,102,0.4)"
                className="w-full mt-auto !py-5 uppercase tracking-widest text-sm font-black"
              >
                {t('contact.card_whatsapp_btn')}
              </HoverButton>
            </div>

            {/* Location Card */}
            <div className="contact-card spatial-glass-card p-12 flex flex-col items-center text-center group border-[rgba(123,97,255,0.2)] hover:border-[rgba(123,97,255,0.5)]">
              <div className="w-20 h-20 rounded-2xl bg-[rgba(123,97,255,0.05)] text-[var(--color-accent-tertiary)] flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_0_30px_rgba(123,97,255,0.2)] border border-[rgba(123,97,255,0.3)]">
                <MapPin size={36} />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">{t('contact.card_location_title')}</h3>
              <p className="text-[var(--color-text-primary)] mb-2 font-semibold text-xl tracking-tight">{t('contact.card_location_value')}</p>
              <p className="text-[var(--color-text-secondary)] mb-10 text-base opacity-80">{t('contact.card_location_note')}</p>
              <HoverButton
                onClick={() => window.open("https://maps.google.com", "_blank")}
                backgroundColor="var(--color-accent-tertiary)"
                glowColor="rgba(123,97,255,0.4)"
                className="w-full mt-auto !py-5 uppercase tracking-widest text-sm font-black"
              >
                {t('contact.card_location_btn')}
              </HoverButton>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-24 px-6 relative z-10 w-full flex justify-center perspective-container">
        <div className="contact-form-container w-full max-w-5xl spatial-glass-card p-10 md:p-20 relative overflow-hidden">
          {/* Decorative Corner Glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-accent-primary)] opacity-5 rounded-br-full blur-[80px]"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--color-accent-tertiary)] opacity-5 rounded-tl-full blur-[80px]"></div>

          <h2 className="text-4xl md:text-5xl font-display font-black mb-16 text-center tracking-tight">{t('contact.form_title')}</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-10 relative z-10">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Nome */}
              <div className="relative group">
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  className="block py-4 px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-primary)] peer transition-all"
                  placeholder=" "
                  required
                  value={formData.nome}
                  onChange={handleChange}
                />
                <label
                  htmlFor="nome"
                  className="absolute text-xl text-[var(--color-text-muted)] duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--color-accent-primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
                >
                  {t('contact.form_label_name')}
                </label>
              </div>

              {/* E-mail */}
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block py-4 px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-primary)] peer transition-all"
                  placeholder=" "
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  className="absolute text-xl text-[var(--color-text-muted)] duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--color-accent-primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
                >
                  {t('contact.form_label_email')}
                </label>
              </div>

              {/* Telefone */}
              <div className="relative group">
                <input
                  type="tel"
                  name="telefone"
                  id="telefone"
                  className="block py-4 px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-primary)] peer transition-all"
                  placeholder=" "
                  required
                  value={formData.telefone}
                  onChange={handleChange}
                />
                <label
                  htmlFor="telefone"
                  className="absolute text-xl text-[var(--color-text-muted)] duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--color-accent-primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
                >
                  {t('contact.form_label_phone')}
                </label>
              </div>

              {/* Empresa */}
              <div className="relative group">
                <input
                  type="text"
                  name="empresa"
                  id="empresa"
                  className="block py-4 px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-primary)] peer transition-all"
                  placeholder=" "
                  required
                  value={formData.empresa}
                  onChange={handleChange}
                />
                <label
                  htmlFor="empresa"
                  className="absolute text-xl text-[var(--color-text-muted)] duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--color-accent-primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
                >
                  {t('contact.form_label_company')}
                </label>
              </div>
            </div>

            {/* Assunto (Select) */}
            <div className="relative group">
              <select
                name="assunto"
                id="assunto"
                className="block py-4 px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-primary)] peer transition-all cursor-pointer"
                required
                value={formData.assunto}
                onChange={handleChange}
              >
                <option value="" disabled className="bg-[var(--color-bg-secondary)] py-2 text-[var(--color-text-muted)]">{t('contact.form_label_subject')}</option>
                {(t('contact.form_subjects') || []).map((subject, idx) => (
                  <option key={idx} value={subject} className="bg-[var(--color-bg-secondary)] py-2 text-white">{subject}</option>
                ))}
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>

            {/* Mensagem */}
            <div className="relative group">
              <textarea
                name="mensagem"
                id="mensagem"
                rows="4"
                className="block py-4 px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-primary)] peer transition-all resize-none"
                placeholder=" "
                required
                value={formData.mensagem}
                onChange={handleChange}
              ></textarea>
              <label
                htmlFor="mensagem"
                className="absolute text-xl text-[var(--color-text-muted)] duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--color-accent-primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
              >
                {t('contact.form_label_message')}
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <HoverButton
                type="submit"
                disabled={isSubmitting}
                backgroundColor="var(--color-accent-primary)"
                textColor="var(--color-bg-primary)"
                hoverTextColor="var(--color-bg-primary)"
                glowColor="white"
                className={`w-full md:w-auto md:px-24 !py-6 text-xl self-center font-black uppercase tracking-tighter ${isSubmitting ? 'opacity-80' : ''}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    {t('contact.form_btn_sending')}
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={24} />
                    {t('contact.form_btn_success')}
                  </div>
                ) : (
                  <>
                    {t('contact.form_btn')}
                  </>
                )}
              </HoverButton>
            </div>

            {isSuccess && (
              <div className="absolute top-10 right-10 bg-[rgba(0,255,163,0.1)] border border-[rgba(0,255,163,0.3)] text-[var(--color-accent-secondary)] px-6 py-4 rounded-2xl flex items-center gap-3 text-base shadow-[0_0_30px_rgba(0,255,163,0.2)] backdrop-blur-md">
                <CheckCircle2 size={20} /> {t('contact.form_success_msg')}
              </div>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
