'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { useI18n } from '../../lib/i18n/context';

export default function Services() {
  const { ts } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  const fadeInLeft = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 } };

  const fadeInRight = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 } };

  const staggerChildren = prefersReducedMotion
    ? { animate: {} }
    : { animate: { transition: { staggerChildren: 0.1 } } };
  
  const services = [
    {
      title: ts('home.services.autoRefinance.title'),
      description: ts('home.services.autoRefinance.description'),
      features: [ts('services.features.lowerRates'), ts('services.features.quickApproval'), ts('services.features.noPenalties'), ts('services.features.flexibleTerms')],
      image: "/auto/svc-auto-refinance.jpg",
      reverse: false
    },
    {
      title: ts('home.services.vehicleCoverage.title'),
      description: ts('home.services.vehicleCoverage.description'),
      features: [ts('services.features.fullCoverage'), ts('services.features.roadsideAssistance'), ts('services.features.customizablePlans'), ts('services.features.beyondWarranty'), ts('services.features.manufacturerProtection'), ts('services.features.financialSecurity')],
      image: "/auto/svc-vehicle-coverage.jpg",
      reverse: true
    },
    {
      title: ts('home.services.homeRefinance.title'),
      description: ts('home.services.homeRefinance.description'),
      features: [ts('services.features.lowerPayments'), ts('services.features.betterRates'), ts('services.features.equityAccess'), ts('services.features.flexibleOptions')],
      image: "/auto/svc-home-refinance.jpg",
      reverse: false
    },
    {
      title: ts('home.services.insuranceConsultation.title'),
      description: ts('home.services.insuranceConsultation.description'),
      features: [ts('services.features.expertGuidance'), ts('services.features.budgetFriendly'), ts('services.features.comprehensiveCoverage'), ts('services.features.personalizedService')],
      image: "/auto/svc-auto-insurance.jpg",
      reverse: true
    },
    {
      title: ts('home.services.lifeInsurance.title'),
      description: ts('home.services.lifeInsurance.description'),
      features: [ts('services.features.familyProtection'), ts('services.features.affordablePremiums'), ts('services.features.tailoredCoverage'), ts('services.features.longTermSecurity')],
      image: "/auto/svc-life-insurance.jpg",
      reverse: false
    },
    {
      title: ts('home.services.creditSavings.title'),
      description: ts('home.services.creditSavings.description'),
      features: [ts('services.features.creditImprovement'), ts('services.features.savingsStrategies'), ts('services.features.debtReduction'), ts('services.features.financialPlanning')],
      image: "/auto/svc-credit-consultations.jpg",
      reverse: true
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation overlay />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/auto/car.jpg"
            alt="Professional financial services"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 md:pt-0">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {ts('services.hero.title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              {ts('services.hero.subtitle')}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculator"
                className="bg-apex-navy hover:bg-apex-navy-deep text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {ts('services.hero.getQuote')}
              </Link>
              <Link
                href="/contact"
                className="bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-lg border border-white/30 hover:border-white/50 transition-all duration-200"
              >
                {ts('services.hero.contactUs')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-4 font-saira">
              {ts('services.section.title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              {ts('services.section.subtitle')}
            </motion.p>
          </motion.div>

          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerChildren}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  service.reverse ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <motion.div 
                  variants={service.reverse ? fadeInRight : fadeInLeft}
                  className={service.reverse ? 'lg:col-start-2' : ''}
                >
                  <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={service.reverse ? fadeInLeft : fadeInRight}
                  className={service.reverse ? 'lg:col-start-1 lg:row-start-1' : ''}
                >
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{service.title}</h3>
                    <p className="text-xl text-gray-600 leading-relaxed">{service.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-apex-navy rounded-full"></div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link
                      href="/contact"
                      className="inline-flex items-center w-full sm:w-auto text-center bg-apex-navy hover:bg-apex-navy-deep text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      {ts('services.learnMore')}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-apex-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white mb-6 font-saira">
              {ts('services.cta.title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-blue-100 mb-8">
              {ts('services.cta.subtitle')}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-apex-navy hover:bg-apex-navy-deep hover:text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {ts('services.cta.contactUs')}
              </Link>
              <Link
                href="/calculator"
                className="bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-lg border border-white/30 hover:border-white/50 transition-all duration-200"
              >
                {ts('services.cta.getQuote')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}