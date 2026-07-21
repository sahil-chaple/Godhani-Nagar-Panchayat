import React, { useState } from 'react';
import { PROPERTY_RECORDS, WATER_RECORDS } from '../data/portalData';
import { PropertyRecord, WaterRecord } from '../types';
import { Search, CreditCard, CheckCircle2, Receipt, Landmark, ShieldCheck, AlertCircle, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TaxPortals() {
  const [activeTab, setActiveTab] = useState<'property' | 'water'>('property');
  
  // Property States
  const [propSearch, setPropSearch] = useState('');
  const [foundProperty, setFoundProperty] = useState<PropertyRecord | null>(null);
  const [propSearchAttempted, setPropSearchAttempted] = useState(false);

  // Water States
  const [waterSearch, setWaterSearch] = useState('');
  const [foundWater, setFoundWater] = useState<WaterRecord | null>(null);
  const [waterSearchAttempted, setWaterSearchAttempted] = useState(false);

  // General Modal States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'property' | 'water'>('property');
  const [paymentTargetId, setPaymentTargetId] = useState('');
  const [payAmount, setPayAmount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');

  const handlePropSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPropSearchAttempted(true);
    const query = propSearch.trim().toLowerCase();
    
    const matched = PROPERTY_RECORDS.find(
      (r) => 
        r.propertyId.toLowerCase() === query || 
        r.ownerName.toLowerCase().includes(query) || 
        r.mobile === query
    );
    setFoundProperty(matched || null);
  };

  const handleWaterSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setWaterSearchAttempted(true);
    const query = waterSearch.trim().toLowerCase();

    const matched = WATER_RECORDS.find(
      (r) => 
        r.connectionNo.toLowerCase() === query || 
        r.ownerName.toLowerCase().includes(query) || 
        r.mobile === query
    );
    setFoundWater(matched || null);
  };

  const initiatePayment = (type: 'property' | 'water', id: string, amount: number) => {
    setPaymentType(type);
    setPaymentTargetId(id);
    setPayAmount(amount);
    setPaymentSuccess(false);
    setShowPaymentModal(true);
  };

  const handleMockPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate transaction delay
    setTxnId(`TXN-GNP-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`);
    setPaymentSuccess(true);

    // Update state to look like paid in current session
    if (paymentType === 'property') {
      if (foundProperty) {
        foundProperty.status = 'Paid';
        foundProperty.dueAmount = 0;
      }
    } else {
      if (foundWater) {
        foundWater.status = 'Paid';
        foundWater.dueAmount = 0;
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex bg-[#E8E5D5]/60 p-1.5 rounded-xl border border-[#E5E3D8] w-full max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('property')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'property'
              ? 'bg-[#800000] text-white shadow-sm'
              : 'text-gray-700 hover:bg-white/50'
          }`}
        >
          <Landmark className="w-4 h-4" />
          Property Tax Portal
        </button>
        <button
          onClick={() => setActiveTab('water')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'water'
              ? 'bg-[#800000] text-white shadow-sm'
              : 'text-gray-700 hover:bg-white/50'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          Water Tax Portal
        </button>
      </div>

      {activeTab === 'property' ? (
        /* PROPERTY TAX SECTION */
        <div className="bg-slate-900 border border-[#E5E3D8] rounded-2xl p-6 space-y-6" id="prop-tax-portal-ui">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#800000] dark:text-[#C25050] flex items-center gap-2">
                <Landmark className="w-5 h-5" />
                Online Property Tax Assessment & Payment
              </h3>
              <p className="text-xs text-gray-500 mt-1">Search via Property ID (e.g., GNP2026101), Owner Name (e.g., Arvind), or 10-digit Mobile.</p>
            </div>
            <div className="text-[11px] font-semibold text-[#800000] bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure 256-Bit Gateway Verified
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handlePropSearch} className="bg-white border border-[#E5E3D8] p-4 rounded-xl flex flex-col md:flex-row gap-3 shadow-2xs">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={propSearch}
                onChange={(e) => setPropSearch(e.target.value)}
                placeholder="Enter Property ID, Owner Name, or Mobile Number..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E3D8] text-sm text-gray-900 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-6 bg-[#800000] hover:bg-[#9B1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Search Property
            </button>
          </form>

          {/* Search Results Display */}
          <AnimatePresence mode="wait">
            {foundProperty ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-[#E5E3D8] rounded-xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                <div className="md:col-span-8 space-y-3.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded">
                      Property ID: {foundProperty.propertyId}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      foundProperty.status === 'Paid' ? 'bg-red-50 text-[#800000]' : 'bg-red-100 text-red-800'
                    }`}>
                      Status: {foundProperty.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700">
                    <div>
                      <strong className="text-gray-400 text-xs uppercase block">Owner Name</strong>
                      <span className="font-semibold text-gray-900">{foundProperty.ownerName}</span>
                    </div>
                    <div>
                      <strong className="text-gray-400 text-xs uppercase block">Registered Ward</strong>
                      <span className="font-semibold text-gray-900">{foundProperty.ward}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <strong className="text-gray-400 text-xs uppercase block">Premises Address</strong>
                      <span className="font-semibold text-gray-900">{foundProperty.address}</span>
                    </div>
                    <div>
                      <strong className="text-gray-400 text-xs uppercase block">Property Type</strong>
                      <span className="font-semibold text-gray-900">{foundProperty.propertyType}</span>
                    </div>
                    <div>
                      <strong className="text-gray-400 text-xs uppercase block">Due Assessment</strong>
                      <span className="font-bold text-[#DC2626]">₹{foundProperty.dueAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-gray-100 pt-5 md:pt-0 md:pl-6 text-center space-y-4">
                  <div className="text-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider block font-semibold">Total Net Due</span>
                    <span className="text-2xl font-black text-gray-900">₹{foundProperty.dueAmount}</span>
                  </div>
                  
                  {foundProperty.dueAmount > 0 ? (
                    <button
                      onClick={() => initiatePayment('property', foundProperty.propertyId, foundProperty.dueAmount)}
                      className="w-full py-2.5 bg-[#800000] hover:bg-[#9B1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      Pay Property Tax
                    </button>
                  ) : (
                    <div className="bg-red-50 border border-red-150 text-[#800000] rounded-lg p-3 text-xs font-semibold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#9B1A1A]" />
                      Assessment Cleared
                    </div>
                  )}
                </div>
              </motion.div>
            ) : propSearchAttempted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-100 text-red-800 rounded-xl p-4 flex items-start gap-2 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>No property found matching: "{propSearch}"</strong>
                  <p className="text-xs text-red-600 mt-1">Please try searching for "Arvind", "Sunil", "Rameshwar" or try "GNP2026101" to test the search flow.</p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-50 border border-gray-100 text-gray-500 rounded-xl py-12 text-center text-sm font-mono flex flex-col items-center justify-center gap-2">
                <Landmark className="w-10 h-10 text-gray-300 stroke-1" />
                <span>Search results will appear here. Try demo Property ID: GNP2026101</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* WATER TAX SECTION */
        <div className="bg-[#FAF9F5] border border-[#E5E3D8] rounded-2xl p-6 space-y-6" id="water-tax-portal-ui">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#800000] flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Online Water Connection Bills Payment
              </h3>
              <p className="text-xs text-gray-500 mt-1">Search via Connection Number (e.g., GNPW001), Owner Name, or 10-digit Mobile.</p>
            </div>
            <div className="text-[11px] font-semibold text-[#800000] bg-red-50 border border-red-150 px-3 py-1.5 rounded-lg flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Govt Water Board Certified Secure
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleWaterSearch} className="bg-white border border-[#E5E3D8] p-4 rounded-xl flex flex-col md:flex-row gap-3 shadow-2xs">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={waterSearch}
                onChange={(e) => setWaterSearch(e.target.value)}
                placeholder="Enter Connection Number (e.g., GNPW001), Owner Name, or Mobile..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E3D8] text-sm text-gray-900 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-6 bg-[#800000] hover:bg-[#9B1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Search Water Bill
            </button>
          </form>

          {/* Search Results Display */}
          <AnimatePresence mode="wait">
            {foundWater ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-[#E5E3D8] rounded-xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                <div className="md:col-span-8 space-y-3.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded">
                      Connection No: {foundWater.connectionNo}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      foundWater.status === 'Paid' ? 'bg-red-50 text-[#800000]' : 'bg-red-100 text-red-800'
                    }`}>
                      Status: {foundWater.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700">
                    <div>
                      <strong className="text-gray-400 text-xs uppercase block">Consumer Name</strong>
                      <span className="font-semibold text-gray-900">{foundWater.ownerName}</span>
                    </div>
                    <div>
                      <strong className="text-gray-400 text-xs uppercase block">Registered Ward</strong>
                      <span className="font-semibold text-gray-900">{foundWater.ward}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <strong className="text-gray-400 text-xs uppercase block">Supply Connection Address</strong>
                      <span className="font-semibold text-gray-900">{foundWater.address}</span>
                    </div>
                    <div>
                      <strong className="text-gray-400 text-xs uppercase block">Due Assessment</strong>
                      <span className="font-bold text-[#DC2626]">₹{foundWater.dueAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-gray-100 pt-5 md:pt-0 md:pl-6 text-center space-y-4">
                  <div className="text-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider block font-semibold">Total Water Due</span>
                    <span className="text-2xl font-black text-gray-900">₹{foundWater.dueAmount}</span>
                  </div>

                  {foundWater.dueAmount > 0 ? (
                    <button
                      onClick={() => initiatePayment('water', foundWater.connectionNo, foundWater.dueAmount)}
                      className="w-full py-2.5 bg-[#800000] hover:bg-[#9B1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      Pay Water Bill
                    </button>
                  ) : (
                    <div className="bg-red-50 border border-red-150 text-[#800000] rounded-lg p-3 text-xs font-semibold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#9B1A1A]" />
                      Water Bill Cleared
                    </div>
                  )}
                </div>
              </motion.div>
            ) : waterSearchAttempted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-100 text-red-800 rounded-xl p-4 flex items-start gap-2 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>No consumer found matching: "{waterSearch}"</strong>
                  <p className="text-xs text-red-600 mt-1">Please try searching for "Arvind", "Suresh" or try "GNPW001" to test the search flow.</p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-50 border border-gray-100 text-gray-500 rounded-xl py-12 text-center text-sm font-mono flex flex-col items-center justify-center gap-2">
                <CreditCard className="w-10 h-10 text-gray-300 stroke-1" />
                <span>Search results will appear here. Try demo Connection No: GNPW001</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* CHECKOUT PAYMENT GATEWAY MODAL */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!paymentSuccess) setShowPaymentModal(false); }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full border border-gray-200 shadow-xl overflow-hidden relative z-10"
            >
              {!paymentSuccess ? (
                /* Payment form */
                <form onSubmit={handleMockPaymentSubmit} className="p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h4 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
                      <CreditCard className="w-5 h-5 text-[#800000]" />
                      Tax Payment Gateway
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(false)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 space-y-1.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service:</span>
                      <strong className="text-gray-900 uppercase font-bold">{paymentType} Tax</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Account ID:</span>
                      <span className="font-mono font-bold text-gray-800">{paymentTargetId}</span>
                    </div>
                    <div className="border-t border-gray-150 pt-2 flex justify-between text-base">
                      <span className="font-bold text-gray-900">Amount Due:</span>
                      <strong className="font-extrabold text-[#800000]">₹{payAmount}</strong>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Select Payment Mode</label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="border-2 border-[#800000] bg-red-50 rounded-lg p-2.5 text-center block cursor-pointer">
                          <input type="radio" name="pay_mode" defaultChecked className="accent-[#800000] mr-1" />
                          <span className="text-xs font-bold text-gray-800">UPI (GPay / PhonePe)</span>
                        </label>
                        <label className="border border-gray-200 hover:bg-gray-50 rounded-lg p-2.5 text-center block cursor-pointer">
                          <input type="radio" name="pay_mode" className="accent-[#800000] mr-1" />
                          <span className="text-xs font-bold text-gray-500">Credit / Debit Card</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="tax-payment-vpa">UPI Virtual Payment Address (VPA)</label>
                      <input
                        id="tax-payment-vpa"
                        type="text"
                        required
                        placeholder="e.g. name@okhdfcbank"
                        defaultValue="demo@upi"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#800000] outline-none font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-[#800000] hover:bg-[#9B1A1A] text-white font-bold rounded-lg uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Authorize & Pay ₹{payAmount}
                  </button>

                  <div className="text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#9B1A1A]" />
                    Secure SSL Enforced. Transact at ease.
                  </div>
                </form>
              ) : (
                /* SUCCESS SCREEN */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 text-center space-y-6"
                >
                  <div className="mx-auto w-16 h-16 bg-red-50 border border-red-150 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-[#9B1A1A]" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-[#800000]">Payment Successful!</h4>
                    <p className="text-xs text-gray-500">Receipt generated successfully for your Nagar Panchayat records.</p>
                  </div>

                  <div className="bg-slate-50 border border-gray-100 rounded-xl p-4 text-left text-xs space-y-2 font-mono text-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account ID:</span>
                      <strong className="text-gray-800">{paymentTargetId}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Transaction ID:</span>
                      <strong className="text-gray-800">{txnId}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-[#800000] font-bold">SETTLED</span>
                    </div>
                    <div className="border-t border-gray-150 pt-2 flex justify-between text-sm">
                      <strong className="text-gray-900">Amount Paid:</strong>
                      <strong className="text-[#800000]">₹{payAmount}</strong>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => alert(`Receipt downloaded!\nTxn: ${txnId}\nAmount: ₹${payAmount}`)}
                      className="flex-1 py-2.5 border border-[#E5E3D8] text-gray-700 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-50 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Receipt className="w-4 h-4" />
                      Get Receipt
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(false)}
                      className="flex-1 py-2.5 bg-[#800000] hover:bg-[#9B1A1A] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Close Gateway
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
