'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView, useReducedMotion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { CarBrandMarquee } from '@/components/CarBrandMarquee';
import Footer from '@/components/Footer';
import { useI18n } from '@/lib/i18n/context';
import { SectionKicker } from '@/components/ui/section-kicker';
import { WordRotate } from '@/components/ui/word-rotate';
import { MoneyIcon, ShieldIcon, HomeIcon, ExchangeIcon, HeartIcon, ChartIcon, ArrowIcon } from '@/components/ui/icons';

const AutoLoanRefinanceCalculator = dynamic(
  () => import('@/components/ui/auto-loan-refinance-calculator').then(m => m.AutoLoanRefinanceCalculator),
  { ssr: false }
);
const TrustpilotMarquee = dynamic(() => import('@/components/TrustpilotMarquee'), { ssr: false });

export default function Home() {
  const { ts } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = useMemo(() => prefersReducedMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring", stiffness: 260, damping: 20 } },
  [prefersReducedMotion]);

  const staggerChildren = useMemo(() => prefersReducedMotion
    ? { animate: {} }
    : { animate: { transition: { staggerChildren: 0.05 } } },
  [prefersReducedMotion]);

  const [activeService, setActiveService] = useState(0);
  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesInView = useInView(servicesSectionRef, { margin: '-25% 0px -25% 0px' });

  const services = useMemo(() => [
    {
      title: ts('home.services.autoRefinance.title'),
      description: ts('home.services.autoRefinance.description'),
      image: "/auto/hero-auto-refinance-v2.webp",
      href: "/services/auto-refinance",
      category: "Auto Refinance",
      icon: <MoneyIcon />,
    },
    {
      title: ts('home.services.vehicleCoverage.title'),
      description: ts('home.services.vehicleCoverage.description'),
      image: "/auto/hero-vehicle-coverage-v2.webp",
      href: "/services/vehicle-coverage",
      category: "Coverage & Protection",
      icon: <ShieldIcon />,
    },
    {
      title: ts('home.services.homeRefinance.title'),
      description: ts('home.services.homeRefinance.description'),
      image: "/auto/hero-home-refinance-v2.webp",
      href: "/services/home-refinance",
      category: "Home Loans",
      icon: <HomeIcon />,
    },
    {
      title: ts('home.services.insuranceConsultation.title'),
      description: ts('home.services.insuranceConsultation.description'),
      image: "/auto/hero-auto-insurance-v2.webp",
      href: "/services/auto-insurance",
      category: "Auto Insurance",
      icon: <ExchangeIcon />,
    },
    {
      title: ts('home.services.lifeInsurance.title'),
      description: ts('home.services.lifeInsurance.description'),
      image: "/auto/hero-life-insurance-v2.webp",
      href: "/services/life-insurance",
      category: "Life Insurance",
      icon: <HeartIcon />,
    },
    {
      title: ts('home.services.creditSavings.title'),
      description: ts('home.services.creditSavings.description'),
      image: "/auto/hero-credit-calculator-v2.webp",
      href: "/services/credit-consultations",
      category: "Credit & Savings",
      icon: <ChartIcon />,
    },
  ], [ts]);

  useEffect(() => {
    if (!servicesInView || prefersReducedMotion) return;
    const id = setInterval(() => {
      setActiveService((i) => (i + 1) % services.length);
    }, 5000);
    return () => clearInterval(id);
  }, [servicesInView, prefersReducedMotion, services.length]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navigation overlay />

      {/* ─── HERO ─── editorial, sharp, Rogo/Harvey aesthetic */}
      <section className="relative min-h-[100svh] w-full flex flex-col overflow-hidden">
        {/* Background — static photo, layered scrims */}
        <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none">
          <Image
            src="/auto/heroGarage2.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/90" />
          <div className="absolute top-1/3 right-[-10%] w-[640px] h-[640px] bg-dpe-green/12 rounded-full blur-[160px] mix-blend-screen" />
          {/* Hairline grid overlay for editorial feel */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '120px 120px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <SectionKicker align="left" tone="white">
                Drive Point Exchange · Nationwide
              </SectionKicker>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-white leading-[0.98] font-heading font-bold tracking-[-0.03em] mb-7"
            >
              Your roadmap to<br />
              <span className="text-green-sweep animate-gradient-text-sweep">
                financial freedom.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            >
              <WordRotate
                words={[
                  'Lower your payments.',
                  'Protect your vehicle.',
                  'Build a stronger financial future.',
                ]}
                className="block text-white font-medium"
              />
              <span className="block text-white/55 font-light mt-1">
                With experts who put you first.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-slate-950 text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
              >
                Start your application
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/calculator?type=auto"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white text-sm font-medium hover:bg-white/[0.04] hover:border-white/30 transition-colors"
              >
                Calculate savings
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mt-auto">
          <CarBrandMarquee />
        </div>
      </section>

      {/* ─── CALCULATOR BODY ─── */}
      <section className="relative z-20 w-full max-w-7xl mx-auto px-4 pb-24">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="relative w-full"
        >
          <AutoLoanRefinanceCalculator />
        </motion.div>
      </section>

      {/* ─── SERVICES TABS ─── editorial dark band, sharp panels */}
      <section ref={servicesSectionRef} className="bg-slate-950 overflow-hidden border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

          {/* Header — left-aligned, restrained */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerChildren}
            className="mb-14 max-w-2xl"
          >
            <motion.div variants={fadeInUp}>
              <SectionKicker align="left" tone="white">
                Our services
              </SectionKicker>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.025em] leading-[1.02]"
            >
              {ts('home.services.title')}
            </motion.h2>
          </motion.div>

          {/* Tab bar — sharp segmented */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex gap-0 mb-10 border border-white/10 overflow-hidden"
          >
            {services.map((service, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveService(index)}
                aria-label={service.category}
                className={`relative flex flex-1 min-w-0 items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 sm:py-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-200 border-r border-white/10 last:border-r-0 ${
                  activeService === index
                    ? 'text-slate-950 bg-white'
                    : 'text-white/55 bg-transparent hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {service.icon}
                <span className="hidden sm:inline">{service.category}</span>
              </button>
            ))}
          </motion.div>

          {/* Feature panel — sharp, hairline-bordered */}
          <div
            className="relative overflow-hidden border border-white/10"
            style={{ height: '560px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className={`object-cover ${activeService === 5 ? 'scale-125' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#01040E]/75 via-[#01040E]/15 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01040E]/55 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Content overlay */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 md:p-14 max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${activeService}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                >
                  <span className="inline-flex items-center gap-2 text-overline text-dpe-green mb-4">
                    <span aria-hidden className="block w-0.5 h-3.5 bg-dpe-green" />
                    {services[activeService].category}
                  </span>
                  <h3 className="text-3xl md:text-5xl text-white mb-5 leading-[1.04] tracking-[-0.02em] font-bold">
                    {services[activeService].title}
                  </h3>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed mb-7 font-light max-w-lg">
                    {services[activeService].description}
                  </p>
                  <Link
                    href={services[activeService].href}
                    className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white text-slate-950 text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
                  >
                    {ts('home.services.learnMore')}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Step indicators — sharp ticks */}
              <div className="flex gap-1.5 mt-10">
                {services.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveService(i)}
                    className={`h-px transition-all duration-300 ${
                      i === activeService ? 'w-10 bg-dpe-green' : 'w-5 bg-white/25 hover:bg-white/50'
                    }`}
                    aria-label={`Go to service ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <TrustpilotMarquee />

      {/* ─── CTA ─── light editorial close */}
      <section className="py-28 bg-white border-t border-slate-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerChildren}
            className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-end"
          >
            <div>
              <motion.div variants={fadeInUp}>
                <SectionKicker align="left" tone="green">
                  Get started today
                </SectionKicker>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl text-slate-950 mb-6 tracking-[-0.025em] leading-[1.02]"
              >
                {ts('home.cta.title')}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-slate-500 font-light leading-relaxed mb-9 max-w-xl"
              >
                {ts('home.cta.subtitle')}
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-slate-950 text-white text-sm font-semibold tracking-wide hover:bg-slate-800 transition-colors"
                >
                  Get in touch
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-300 text-slate-700 text-sm font-medium hover:border-slate-950 hover:text-slate-950 transition-colors"
                >
                  Explore services
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={fadeInUp}
              className="border-l border-slate-200 pl-8 py-2 lg:py-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-2">
                Main office
              </p>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                North Michigan Business Center
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                205 North Michigan Avenue, Suite 810
              </p>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Chicago, IL 60601, US
              </p>
              <a
                href="tel:+18883510782"
                className="text-3xl lg:text-4xl font-bold text-slate-950 hover:text-dpe-green transition-colors tracking-[-0.02em]"
              >
                (888) 351-0782
              </a>
              <p className="text-sm text-slate-500 font-light mt-3 leading-relaxed">
                Speak with a financing specialist — no obligations, no fees.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
