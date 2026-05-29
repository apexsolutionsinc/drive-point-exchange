'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MembershipType = 'basic' | 'premium';

export default function CheckoutForm() {
  const [membershipType, setMembershipType] = useState<MembershipType>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    phone: '',
    vin: '',
    billing_address: {
      line1: '',
      city: '',
      state: '',
      zip: '',
    },
    shipping_address: {
      line1: '',
      city: '',
      state: '',
      zip: '',
    },
    termsAccepted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, section?: 'billing_address' | 'shipping_address') => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'termsAccepted') {
      setFormData(prev => ({ ...prev, termsAccepted: checked }));
      return;
    }

    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.termsAccepted) {
      setErrorMsg('You must accept the terms and conditions.');
      return;
    }

    setIsSubmitting(true);

    const shippingAddress = sameAsBilling ? formData.billing_address : formData.shipping_address;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: formData.user_name,
          email: formData.email,
          phone: formData.phone,
          vin: formData.vin,
          billing_address: formData.billing_address,
          shipping_address: shippingAddress,
          membership_type: membershipType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Request Received!</h2>
        <p className="text-slate-600 mb-8">
          Thank you for applying for the {membershipType === 'premium' ? 'Premium' : 'Basic'} Membership. 
          Our team will review your details and contact you shortly.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Return to Home
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {errorMsg && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md">
            {errorMsg}
          </div>
        )}

        {/* Membership Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => setMembershipType('basic')}
            className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
              membershipType === 'basic' 
                ? 'border-blue-500 bg-blue-50/50 ring-4 ring-blue-500/10' 
                : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'
            }`}
          >
            {membershipType === 'basic' && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                SELECTED
              </div>
            )}
            <h3 className="text-xl font-bold text-slate-800">Basic Membership</h3>
            <div className="mt-2 text-3xl font-extrabold text-blue-600">$49.99<span className="text-base font-normal text-slate-500">/mo</span></div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Standard Support
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Access to Member Portal
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                Priority Processing
              </li>
            </ul>
          </button>

          <button
            type="button"
            onClick={() => setMembershipType('premium')}
            className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
              membershipType === 'premium' 
                ? 'border-indigo-500 bg-indigo-50/50 ring-4 ring-indigo-500/10' 
                : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
            }`}
          >
            {membershipType === 'premium' && (
              <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                SELECTED
              </div>
            )}
            <h3 className="text-xl font-bold text-slate-800">Premium Membership</h3>
            <div className="mt-2 text-3xl font-extrabold text-indigo-600">$99.99<span className="text-base font-normal text-slate-500">/mo</span></div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                24/7 Priority Support
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Access to Member Portal
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Priority Processing & Extras
              </li>
            </ul>
          </button>
        </div>

        {/* Personal Details */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <span className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <input
                required
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Phone Number</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Vehicle VIN (Optional)</label>
              <input
                type="text"
                name="vin"
                value={formData.vin}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all uppercase"
                placeholder="1HGCM82633AXXXXXX"
                maxLength={17}
              />
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <span className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            Billing Address
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Street Address</label>
              <input
                required
                type="text"
                name="line1"
                value={formData.billing_address.line1}
                onChange={(e) => handleInputChange(e, 'billing_address')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="123 Main St"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">City</label>
              <input
                required
                type="text"
                name="city"
                value={formData.billing_address.city}
                onChange={(e) => handleInputChange(e, 'billing_address')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="New York"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">State</label>
                <input
                  required
                  type="text"
                  name="state"
                  value={formData.billing_address.state}
                  onChange={(e) => handleInputChange(e, 'billing_address')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all uppercase"
                  placeholder="NY"
                  maxLength={2}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">ZIP Code</label>
                <input
                  required
                  type="text"
                  name="zip"
                  value={formData.billing_address.zip}
                  onChange={(e) => handleInputChange(e, 'billing_address')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <span className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Shipping Address
            </h3>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={sameAsBilling}
                  onChange={(e) => setSameAsBilling(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
              </div>
              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Same as billing</span>
            </label>
          </div>

          <AnimatePresence>
            {!sameAsBilling && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-6 pt-2 pb-2">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-slate-700">Street Address</label>
                    <input
                      required={!sameAsBilling}
                      type="text"
                      name="line1"
                      value={formData.shipping_address.line1}
                      onChange={(e) => handleInputChange(e, 'shipping_address')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">City</label>
                    <input
                      required={!sameAsBilling}
                      type="text"
                      name="city"
                      value={formData.shipping_address.city}
                      onChange={(e) => handleInputChange(e, 'shipping_address')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="New York"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">State</label>
                      <input
                        required={!sameAsBilling}
                        type="text"
                        name="state"
                        value={formData.shipping_address.state}
                        onChange={(e) => handleInputChange(e, 'shipping_address')}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all uppercase"
                        placeholder="NY"
                        maxLength={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">ZIP Code</label>
                      <input
                        required={!sameAsBilling}
                        type="text"
                        name="zip"
                        value={formData.shipping_address.zip}
                        onChange={(e) => handleInputChange(e, 'shipping_address')}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Payment Preview / T&C */}
        <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Order Summary</h4>
              <p className="text-slate-500 text-sm capitalize">{membershipType} Membership</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-slate-900">
                ${membershipType === 'premium' ? '99.99' : '49.99'}
              </div>
              <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">Total today</p>
            </div>
          </div>

          {/* Dummy Credit Card Logos using pure SVG as requested */}
          <div className="flex gap-3 opacity-60">
            <svg viewBox="0 0 38 24" className="w-10 h-6"><path fill="#1A1F71" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.3 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"/><path fill="#F79E1B" d="M23.1 12c0-2.8 1.3-5.3 3.3-6.8-2-1.5-4.5-2.4-7.2-2.4-6.6 0-12 5.4-12 12s5.4 12 12 12c2.7 0 5.2-.9 7.2-2.4-2-1.5-3.3-4-3.3-6.8z"/><path fill="#EB001B" d="M19.2 12c0 2.8 1.3 5.3 3.3 6.8 2 1.5 4.5 2.4 7.2 2.4 6.6 0 12-5.4 12-12s-5.4-12-12-12c-2.7 0-5.2.9-7.2 2.4-2 1.5-3.3 4-3.3 6.8z"/><path fill="#FF5F00" d="M26.4 12c0-2.1-.9-4-2.3-5.3-1.4 1.3-2.3 3.2-2.3 5.3s.9 4 2.3 5.3c1.4-1.3 2.3-3.2 2.3-5.3z"/></svg>
            <svg viewBox="0 0 38 24" className="w-10 h-6"><path fill="#00579F" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.3 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"/><path fill="#FFF" d="M18.8 17.5h2l.7-4.6h-2l-.7 4.6zm6.3-4.5c-.1-1.3-1.8-1.4-1.8-1.9 0-.2.2-.4.6-.4.2 0 1 .1 1.4.3l.3-1.4c-.3-.1-1-.3-1.7-.3-1.9 0-3.3 1-3.3 2.5 0 1.1 1 1.7 1.7 2 .8.4 1 .6 1 .9 0 .4-.5.6-1 .6-.6 0-1.3-.2-1.8-.4l-.3 1.5c.5.2 1.3.4 2 .4 2 0 3.4-1 3.4-2.5-.1-.5-.4-.9-1-1.2-.6-.3-1.3-.6-1.3-1 .1-.2.4-.4.8-.4s1 .2 1.1.3l.2-1.4zM32.8 9.3c-.4 0-.7.3-.9.7l-2.6 6.3h2.1l.4-1.1h2.5l.2 1.1h2L34.6 9.3h-1.8zm-1.2 4.4l1-2.7 1.1 2.7h-2.1zM14.6 9.3l-2.2 6.3h-2.1l1.4-6.3h2.9z"/></svg>
            <svg viewBox="0 0 38 24" className="w-10 h-6"><path fill="#006FCF" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.3 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"/><path fill="#FFF" d="M12.4 15.3l-.9-4.8c-.1-.4-.2-.5-.5-.6l-2.6-.5.1-.6h4.3c.4 0 .7.3.8.7l1.1 5.8h-2.3z"/><path fill="#FFF" d="M17.4 9.4l-1.5 6.5h2.2l1.5-6.5h-2.2zm10.5 4c0-1.6-2.2-1.7-2.2-2.4 0-.3.3-.6.9-.7.3 0 1.1-.1 2 .4l.4-1.8c-.5-.2-1.2-.4-2-.4-2.2 0-3.8 1.2-3.8 2.8 0 1.3 1.2 1.9 2 2.3.9.4 1.2.7 1.2 1.1 0 .6-.7.9-1.3.9-1 0-1.6-.2-2.1-.5l-.4 2c.6.3 1.6.5 2.5.5 2.4 0 4-1.2 4-2.9zm5.3-4h-1.7c-.4 0-.8.2-1 .6l-2.9 6.6h2.3l.5-1.3h2.8l.3 1.3h2.2l-2.5-7.2zm-1.7 4l.7-2.1 1 2.1h-1.7z"/></svg>
          </div>

          <label className="flex items-start gap-3 mt-4 cursor-pointer group">
            <div className="relative flex items-center mt-0.5">
              <input
                required
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="w-5 h-5 border-2 border-slate-300 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-0 bg-white transition-all cursor-pointer"
              />
            </div>
            <span className="text-sm text-slate-600 leading-relaxed">
              I authorize Drive Point Exchange to charge my payment method for the selected membership. 
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-slate-900 text-white font-bold text-lg py-4 px-6 rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              `Complete Checkout • $${membershipType === 'premium' ? '99.99' : '49.99'}`
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
