'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Navigation from '../../components/Navigation';
import { AutoLoanRefinanceCalculator } from '../../components/ui/auto-loan-refinance-calculator';
import Footer from '../../components/Footer';
import { useI18n } from '../../lib/i18n/context';
import TrustpilotReviews from '../../components/TrustpilotReviews';
import SocialFeed from '../../components/SocialFeed';
import ShaderBackground from '../../components/ui/shader-background';

export default function Home() {
  const { ts } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring", stiffness: 100, damping: 15 } };

  const staggerChildren = prefersReducedMotion
    ? { animate: {} }
    : { animate: { transition: { staggerChildren: 0.12 } } };

  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: ts('home.services.autoRefinance.title'),
      description: ts('home.services.autoRefinance.description'),
      image: "/auto/svc-auto-refinance.jpg",
      href: "/services/auto-refinance",
      category: "Auto Refinance",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: ts('home.services.vehicleCoverage.title'),
      description: ts('home.services.vehicleCoverage.description'),
      image: "/auto/svc-vehicle-coverage.jpg",
      href: "/services/vehicle-coverage",
      category: "Coverage & Protection",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: ts('home.services.homeRefinance.title'),
      description: ts('home.services.homeRefinance.description'),
      image: "/auto/svc-home-refinance.jpg",
      href: "/services/home-refinance",
      category: "Home Loans",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: ts('home.services.insuranceConsultation.title'),
      description: ts('home.services.insuranceConsultation.description'),
      image: "/auto/svc-auto-insurance.jpg",
      href: "/services/auto-insurance",
      category: "Auto Insurance",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      title: ts('home.services.lifeInsurance.title'),
      description: ts('home.services.lifeInsurance.description'),
      image: "/auto/svc-life-insurance.jpg",
      href: "/services/life-insurance",
      category: "Life Insurance",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: ts('home.services.creditSavings.title'),
      description: ts('home.services.creditSavings.description'),
      image: "/auto/svc-credit-consultations.jpg",
      href: "/services/credit-consultations",
      category: "Credit & Savings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navigation overlay />

      {/* ─── HERO ─── full viewport, nav overlays */}
      <section className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden pt-20 pb-40">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 bg-slate-900 pointer-events-none">
          <motion.div
            animate={{
              scale: [1.02, 1.12, 1.02],
              x: ["0%", "-1%", "0%"],
              y: ["0%", "1%", "0%"],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image 
              src="/auto/heroGarage2.jpg" 
              alt="Garage Background" 
              fill 
              sizes="100vw" 
              className="object-cover opacity-100" 
              priority 
              unoptimized
            />
          </motion.div>
          {/* Base tint matching DPE's dark identity - Lightened */}
          <div className="absolute inset-0 bg-slate-950/40" />
          
          {/* Rich gradient overlay to ensure text pops without hiding the image */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/80" />
          
          {/* Mountain-like geometric overlay for subtle texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          
          {/* Dynamic lighting effect to enhance modern feel */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-dpe-green/20 rounded-full blur-[150px] opacity-60 mix-blend-screen translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Removed foreground lighting component to make the page cleaner. */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col gap-8 lg:gap-12 items-center">
          {/* Top — Text */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="space-y-4 lg:space-y-6 w-full max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <p className="text-overline text-gray-300/80 mb-4 lg:mb-5">
                Nationwide Coverage
              </p>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl text-white leading-[0.95]">
                {ts('home.hero.title')}
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 sm:gap-10 mt-6 lg:mt-8 max-w-4xl mx-auto border-t border-white/10 pt-6 lg:pt-8">
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-2">
                  Take control of your finances today.
                </p>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-lg mx-auto sm:mx-0">
                  Take control of your auto loan today. We offer nationwide coverage, flexible terms, and expert guidance every step of the way.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full sm:w-56 shrink-0">
                <Link
                  href="/contact"
                  className="bg-dpe-green hover:bg-green-600 text-white font-semibold text-sm py-3 lg:py-4 px-6 rounded-xl tracking-widest uppercase transition-all duration-200 text-center shadow-lg shadow-green-900/30 w-full hover:-translate-y-1"
                >
                  Get Started
                </Link>
                <Link
                  href="/services"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium text-sm py-3 lg:py-4 px-6 rounded-xl tracking-widest uppercase transition-all duration-200 text-center border border-white/15 w-full hover:-translate-y-1"
                >
                  {ts('home.hero.learnMore')}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CALCULATOR BODY ─── (Pulled over the hero section fold) */}
      <section className="relative z-20 w-full max-w-7xl mx-auto px-4 -mt-[112px] md:-mt-[128px] pb-24">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="relative w-full"
        >
          <AutoLoanRefinanceCalculator />
        </motion.div>
      </section>

      {/* ─── SERVICES TABS ─── */}
      <section className="py-24 bg-[#0a1628] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-14"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 border border-dpe-green/30 bg-dpe-green/10 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-dpe-green animate-pulse" />
              <span className="text-overline text-dpe-green">Our Services</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl text-white">
              {ts('home.services.title')}
            </motion.h2>
          </motion.div>

          {/* Tab bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeService === index
                    ? 'text-[#0a1628] bg-dpe-green shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                    : 'text-white/60 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {service.icon}
                <span className="hidden sm:inline">{service.category}</span>
              </button>
            ))}
          </motion.div>

          {/* Feature panel */}
          <div className="relative rounded-2xl overflow-hidden" style={{ height: '520px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
              >
                <Image
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover"
                  priority
                />
                {/* Dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Content overlay */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${activeService}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
                >
                  <span className="inline-flex items-center gap-1.5 text-overline text-dpe-green mb-3">
                    {services[activeService].icon}
                    {services[activeService].category}
                  </span>
                  <h3 className="text-3xl md:text-4xl text-white mb-4 leading-tight">
                    {services[activeService].title}
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed mb-6 font-light">
                    {services[activeService].description}
                  </p>
                  <Link
                    href={services[activeService].href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-dpe-green text-[#0a1628] font-semibold rounded-full text-sm hover:bg-dpe-green/90 transition-all duration-200 hover:gap-3 shadow-[0_0_24px_rgba(34,197,94,0.35)]"
                  >
                    {ts('home.services.learnMore')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Step indicators */}
              <div className="flex gap-1.5 mt-8">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveService(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === activeService ? 'w-8 bg-dpe-green' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to service ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── TRUST ─── */}
      <section className="relative py-24 bg-slate-950 overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 z-0">
          <ShaderBackground className="absolute top-0 left-0 w-full h-full opacity-80" />
          <div className="absolute inset-0 bg-dpe-blue/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/80" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col gap-8 lg:gap-12 items-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-dpe-green animate-pulse" />
              <span className="text-overline text-white/80">Trusted Nationwide</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl text-white mb-4">
              {ts('home.trust.title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-400 font-light">
              {ts('home.trust.subtitle')}
            </motion.p>
          </motion.div>

          {/* Trustpilot Reviews */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 w-full flex justify-center"
          >
            <div className="w-full max-w-4xl">
               <TrustpilotReviews />
            </div>
          </motion.div>

          {/* Forbes Recognition */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center px-4 sm:px-6 w-full flex justify-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 w-full mix-blend-screen pt-4 border-t border-white/10" style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.2)' }}>
              <Image
                src="/auto/forbes.png"
                alt="As seen in Forbes"
                width={500}
                height={150}
                className="opacity-80 hover:opacity-100 transition-opacity duration-300 w-full max-w-[320px] md:max-w-[380px]"
              />
              <Image
                src="/auto/Forbes-Logo-1999-present.png"
                alt="Featured in Forbes"
                width={500}
                height={150}
                className="opacity-80 hover:opacity-100 transition-opacity duration-300 w-full max-w-[320px] md:max-w-[380px]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <SocialFeed />

      {/* ─── CTA ─── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 border border-dpe-green/20 bg-dpe-green/5 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-dpe-green animate-pulse" />
              <span className="text-overline text-dpe-green">Get Started Today</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl text-gray-900 mb-4">
              {ts('home.cta.title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 font-light mb-10 max-w-2xl mx-auto">
              {ts('home.cta.subtitle')}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact"
                className="text-center bg-dpe-green hover:bg-green-600 text-white font-semibold text-sm py-3.5 px-8 rounded-xl tracking-widest uppercase shadow-lg shadow-green-900/15 transition-all duration-200"
              >
                {ts('home.cta.getStarted')}
              </Link>
              <Link
                href="/services"
                className="text-center bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm py-3.5 px-8 rounded-xl tracking-widest uppercase transition-all duration-200"
              >
                {ts('home.cta.learnMore')}
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-[#f8fafc] border border-gray-100 rounded-2xl px-8 py-6"
            >
              <div className="text-center sm:text-left">
                <p className="text-overline text-gray-400 mb-1">Main Office</p>
                <a href="tel:+18889907112" className="text-xl font-semibold text-gray-900 hover:text-dpe-green transition-colors tracking-tight">
                  (888) 990-7112
                </a>
              </div>
              <div className="hidden sm:block w-px h-10 bg-gray-200" />
              <div className="text-center sm:text-left">
                <p className="text-overline text-gray-400 mb-1">Customer Support — 24/7</p>
                <a href="tel:+17737821005" className="text-xl font-semibold text-gray-900 hover:text-dpe-green transition-colors tracking-tight">
                  (773) 782-1005
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
