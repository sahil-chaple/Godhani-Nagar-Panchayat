import React, { useState } from 'react';
import { FileText, CheckCircle2, User, Phone, MapPin, Calendar, Briefcase, FileSignature, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ServiceType = 'birth' | 'death' | 'trade' | 'building';

export default function CertificateForms() {
  const [activeService, setActiveService] = useState<ServiceType>('birth');
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Form States
  const [formData, setFormData] = useState({
    childName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    placeOfBirth: 'Hospital',
    deceasedName: '',
    dod: '',
    placeOfDeath: 'Home',
    applicantName: '',
    applicantPhone: '',
    applicantRelation: 'Self',
    businessName: '',
    businessType: 'Retail',
    businessAddress: '',
    plotArea: '',
    floorCount: '1',
    architectReg: '',
  });

  const resetForm = () => {
    setFormData({
      childName: '',
      fatherName: '',
      motherName: '',
      dob: '',
      placeOfBirth: 'Hospital',
      deceasedName: '',
      dod: '',
      placeOfDeath: 'Home',
      applicantName: '',
      applicantPhone: '',
      applicantRelation: 'Self',
      businessName: '',
      businessType: 'Retail',
      businessAddress: '',
      plotArea: '',
      floorCount: '1',
      architectReg: '',
    });
    setErrors({});
    setTrackingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const mobileRegex = /^[6-9]\d{9}$/;

    if (activeService === 'birth') {
      if (!formData.childName.trim()) newErrors.childName = 'Child name is required.';
      if (!formData.fatherName.trim()) newErrors.fatherName = 'Father name is required.';
      if (!formData.dob) newErrors.dob = 'Date of Birth is required.';
      if (!formData.applicantPhone || !mobileRegex.test(formData.applicantPhone)) {
        newErrors.applicantPhone = 'Enter a valid 10-digit phone number.';
      }
    } else if (activeService === 'death') {
      if (!formData.deceasedName.trim()) newErrors.deceasedName = 'Deceased person name is required.';
      if (!formData.dod) newErrors.dod = 'Date of Death is required.';
      if (!formData.applicantName.trim()) newErrors.applicantName = 'Applicant name is required.';
      if (!formData.applicantPhone || !mobileRegex.test(formData.applicantPhone)) {
        newErrors.applicantPhone = 'Enter a valid 10-digit phone number.';
      }
    } else if (activeService === 'trade') {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business/Trade name is required.';
      if (!formData.businessAddress.trim()) newErrors.businessAddress = 'Business premises address is required.';
      if (!formData.applicantPhone || !mobileRegex.test(formData.applicantPhone)) {
        newErrors.applicantPhone = 'Enter a valid 10-digit phone number.';
      }
    } else if (activeService === 'building') {
      if (!formData.applicantName.trim()) newErrors.applicantName = 'Plot Owner/Applicant name is required.';
      if (!formData.plotArea || parseFloat(formData.plotArea) <= 0) {
        newErrors.plotArea = 'Enter valid plot area in square feet.';
      }
      if (!formData.architectReg.trim()) newErrors.architectReg = 'Architect/Engineer license registration is required.';
      if (!formData.applicantPhone || !mobileRegex.test(formData.applicantPhone)) {
        newErrors.applicantPhone = 'Enter a valid 10-digit phone number.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate simulated Tracking Application ID: GNP-APP-2026-80412
    const randomSeq = Math.floor(Math.random() * 89999 + 10000);
    setTrackingId(`GNP-APP-2026-${randomSeq}`);
  };

  const services = [
    { key: 'birth', label: 'Birth Certificate', icon: <User className="w-4 h-4" />, desc: 'Register newborn or apply for official birth registration extract.' },
    { key: 'death', label: 'Death Certificate', icon: <FileText className="w-4 h-4" />, desc: 'Apply for record extract of deceased family member.' },
    { key: 'trade', label: 'Trade License', icon: <Briefcase className="w-4 h-4" />, desc: 'Procure commercial trade permission for shop registration.' },
    { key: 'building', label: 'Building Permission', icon: <FileSignature className="w-4 h-4" />, desc: 'Apply for residential/commercial plot development approvals.' },
  ];

  return (
    <div className="bg-slate-900 border border-[#E5E3D8] rounded-2xl p-6" id="citizen-serv-form-sec">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Hand Navigation for Forms */}
        <div className="md:w-1/3 space-y-3">
          <div className="bg-red-50 border border-red-150 rounded-xl p-4">
            <h4 className="text-xs font-bold text-[#800000] uppercase tracking-wider mb-1">Interactive Portal</h4>
            <p className="text-[11px] text-[#9B1A1A]">Choose a service below to load its dedicated Zod-validated digital application form.</p>
          </div>

          <div className="flex flex-col gap-2">
            {services.map((serv) => (
              <button
                key={serv.key}
                onClick={() => {
                  setActiveService(serv.key as ServiceType);
                  setTrackingId(null);
                  setErrors({});
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all bg-[#FFFFFF]/40 border-[#E5E3D8] hover:bg-[#864950] duration-200 flex items-start gap-3 cursor-pointer ${
                  activeService === serv.key
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeService === serv.key 
                }`}>
                  {serv.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{serv.label}</h4>
                  <p className="text-[10px] text-amber-50 line-clamp-1 mt-0.5">{serv.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Hand Form Content */}
        <div className="flex-1 bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl p-5 md:p-6 shadow-2xs relative">
          <AnimatePresence mode="wait">
            {trackingId ? (
              /* Success screen */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-16 h-16 bg-red-50 border border-red-150 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-[#9B1A1A] animate-bounce" />
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-[#800000]">Application Submitted Successfully!</h3>
                  <p className="text-xs text-gray-500">Your municipal request has been registered in our central server.</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 max-w-sm mx-auto border border-gray-100 text-left text-xs font-mono space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Service requested:</span>
                    <strong className="text-gray-800 uppercase font-bold">{activeService}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tracking App ID:</span>
                    <strong className="text-[#800000] font-bold bg-red-50 px-1.5 py-0.5 rounded">{trackingId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-amber-700 font-bold">UNDER REVIEW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Est. Processing:</span>
                    <span>7 Working Days</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-center max-w-xs mx-auto">
                  <button
                    onClick={() => alert(`Registration ticket printed!\nApplication ID: ${trackingId}`)}
                    className="flex-1 py-2 border border-[#E5E3D8] text-gray-700 rounded-lg text-xs font-bold uppercase hover:bg-slate-50 cursor-pointer"
                  >
                    Print Abstract
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex-1 py-2 bg-[#800000] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#9B1A1A] cursor-pointer"
                  >
                    New Request
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Interactive Form Form */
              <motion.form
                key={activeService}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-base font-bold text-[#800000] capitalize">
                    {activeService} Application Form
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Please provide actual details. Fields marked with <span className="text-red-500">*</span> are mandatory.</p>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-4">
                  {/* BIRTH FORM FIELDS */}
                  {activeService === 'birth' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="birth-childName">Child Name <span className="text-red-500">*</span></label>
                        <input
                          id="birth-childName"
                          type="text"
                          name="childName"
                          placeholder="Full child name"
                          value={formData.childName}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                            errors.childName ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                          }`}
                        />
                        {errors.childName && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.childName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="birth-dob">Date of Birth <span className="text-red-500">*</span></label>
                        <input
                          id="birth-dob"
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                            errors.dob ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                          }`}
                        />
                        {errors.dob && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.dob}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="birth-fatherName">Father Name <span className="text-red-500">*</span></label>
                        <input
                          id="birth-fatherName"
                          type="text"
                          name="fatherName"
                          placeholder="Father full name"
                          value={formData.fatherName}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                            errors.fatherName ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                          }`}
                        />
                        {errors.fatherName && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.fatherName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="birth-motherName">Mother Name</label>
                        <input
                          id="birth-motherName"
                          type="text"
                          name="motherName"
                          placeholder="Mother full name"
                          value={formData.motherName}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#E5E3D8] text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="birth-placeOfBirth">Place of Birth</label>
                        <select
                          id="birth-placeOfBirth"
                          name="placeOfBirth"
                          value={formData.placeOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#E5E3D8] text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none bg-[#FAF9F5] cursor-pointer"
                        >
                          <option value="Hospital">Godhani Primary Health Center</option>
                          <option value="Home">Home (Within Godhani Limits)</option>
                          <option value="PrivateClinic">Private Nursing Home</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* DEATH FORM FIELDS */}
                  {activeService === 'death' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="death-deceasedName">Name of Deceased <span className="text-red-500">*</span></label>
                        <input
                          id="death-deceasedName"
                          type="text"
                          name="deceasedName"
                          placeholder="Deceased full name"
                          value={formData.deceasedName}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                            errors.deceasedName ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                          }`}
                        />
                        {errors.deceasedName && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.deceasedName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="death-dod">Date of Death <span className="text-red-500">*</span></label>
                        <input
                          id="death-dod"
                          type="date"
                          name="dod"
                          value={formData.dod}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                            errors.dod ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                          }`}
                        />
                        {errors.dod && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.dod}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="death-applicantName">Applicant Name <span className="text-red-500">*</span></label>
                        <input
                          id="death-applicantName"
                          type="text"
                          name="applicantName"
                          placeholder="Applicant full name"
                          value={formData.applicantName}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                            errors.applicantName ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                          }`}
                        />
                        {errors.applicantName && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.applicantName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="death-applicantRelation">Relation with Deceased</label>
                        <select
                          id="death-applicantRelation"
                          name="applicantRelation"
                          value={formData.applicantRelation}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#E5E3D8] text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none bg-[#FAF9F5] cursor-pointer"
                        >
                          <option value="Self">Spouse</option>
                          <option value="Son">Son / Daughter</option>
                          <option value="Brother">Brother / Sister</option>
                          <option value="Other">Grandchild / Relative</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* TRADE LICENSE FORM FIELDS */}
                  {activeService === 'trade' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="trade-businessName">Business / Shop Name <span className="text-red-500">*</span></label>
                        <input
                          id="trade-businessName"
                          type="text"
                          name="businessName"
                          placeholder="e.g. Nagpur Traders"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                            errors.businessName ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                          }`}
                        />
                        {errors.businessName && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.businessName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="trade-businessType">Category of Trade</label>
                        <select
                          id="trade-businessType"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#E5E3D8] text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none bg-[#FAF9F5] cursor-pointer"
                        >
                          <option value="Retail">Retail Store / Kirana</option>
                          <option value="Wholesale">Wholesale Depot</option>
                          <option value="Manufacturing">Micro Industrial Mill</option>
                          <option value="Hotel">Restaurant / Tea Stall</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="trade-businessAddress">Business Premises Address <span className="text-red-500">*</span></label>
                        <input
                          id="trade-businessAddress"
                          type="text"
                          name="businessAddress"
                          placeholder="e.g. Ward 2, Main Market Road, Godhani"
                          value={formData.businessAddress}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                            errors.businessAddress ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                          }`}
                        />
                        {errors.businessAddress && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.businessAddress}</p>}
                      </div>
                    </div>
                  )}

                  {/* BUILDING PERMISSION FORM FIELDS */}
                  {activeService === 'building' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="build-applicantName">Plot Owner / Applicant <span className="text-red-500">*</span></label>
                        <input
                          id="build-applicantName"
                          type="text"
                          name="applicantName"
                          placeholder="Plot owner full name"
                          value={formData.applicantName}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                            errors.applicantName ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                          }`}
                        />
                        {errors.applicantName && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.applicantName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="build-plotArea">Plot Area (Sq Ft) <span className="text-red-500">*</span></label>
                        <input
                          id="build-plotArea"
                          type="number"
                          name="plotArea"
                          placeholder="e.g. 1500"
                          value={formData.plotArea}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                            errors.plotArea ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                          }`}
                        />
                        {errors.plotArea && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.plotArea}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="build-floorCount">Proposed Floors</label>
                        <select
                          id="build-floorCount"
                          name="floorCount"
                          value={formData.floorCount}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#E5E3D8] text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none bg-[#FAF9F5] cursor-pointer"
                        >
                          <option value="1">Ground Floor Only (G)</option>
                          <option value="2">Ground + 1 Floor (G+1)</option>
                          <option value="3">Ground + 2 Floors (G+2)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="build-architectReg">Registered Architect ID <span className="text-red-500">*</span></label>
                        <input
                          id="build-architectReg"
                          type="text"
                          name="architectReg"
                          placeholder="e.g. COA/2025/REG-493"
                          value={formData.architectReg}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                            errors.architectReg ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                          }`}
                        />
                        {errors.architectReg && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.architectReg}</p>}
                      </div>
                    </div>
                  )}

                  {/* SHARED DEMO FIELDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-dashed border-gray-100 pt-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1" htmlFor="applicant-phone">Applicant Phone Number <span className="text-red-500">*</span></label>
                      <input
                        id="applicant-phone"
                        type="tel"
                        name="applicantPhone"
                        maxLength={10}
                        placeholder="10-digit mobile"
                        value={formData.applicantPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, applicantPhone: e.target.value.replace(/\D/g, '') }))}
                        className={`w-full px-3.5 py-2 rounded-lg border text-xs text-gray-900 focus:ring-1 focus:ring-[#800000] outline-none ${
                          errors.applicantPhone ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                        }`}
                      />
                      {errors.applicantPhone && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.applicantPhone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Supporting Attachments</label>
                      <input
                        type="file"
                        disabled
                        className="w-full text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200 cursor-not-allowed"
                      />
                      <span className="text-[10px] text-gray-400 mt-1 block">Aadhaar and Address proofs required during in-office validation.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-[#E5E3D8] text-gray-700 rounded-lg text-xs font-bold uppercase hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Reset Fields
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#800000] hover:bg-[#9B1A1A] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>

                <div className="bg-[#FAF9F5] border border-[#E5E3D8] p-3 rounded-lg text-[10px] text-gray-500 flex items-start gap-1.5 leading-normal">
                  <HelpCircle className="w-3.5 h-3.5 text-[#800000] shrink-0" />
                  <span>
                    <strong>Processing Protocol:</strong> Submissions generate a persistent receipt index locally. No real-world money transactions take place. Approved certificates will be dispatched physically to verified plot boundaries.
                  </span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
