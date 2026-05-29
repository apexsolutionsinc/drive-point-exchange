import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Membership Checkout | Drive Point Exchange',
  description: 'Join Drive Point Exchange and get access to exclusive benefits.',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-200">
      <Navigation overlay={false} />
      
      <main className="pb-20">
        {/* Hero Section */}
        <div className="bg-slate-900 py-16 relative overflow-hidden">
          {/* Background Accents */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-600/20 to-transparent pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Secure Your Membership
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto opacity-90">
              Join Drive Point Exchange today. Choose the plan that fits your needs and unlock premium benefits instantly.
            </p>
          </div>
        </div>

        {/* Checkout Form Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <CheckoutForm />
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto mt-16 px-4 text-center">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              256-Bit SSL Secured
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              PCI Compliant
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              Secure Checkout
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
