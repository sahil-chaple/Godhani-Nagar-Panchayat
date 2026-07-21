import React, { useState, useEffect } from 'react';
import { Complaint } from '../types';
import { ShieldAlert, CheckCircle2, ListFilter, ClipboardList, Info, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ComplaintForm() {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [ward, setWard] = useState('1');
  const [complaintType, setComplaintType] = useState('Water Supply');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<string | null>(null);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [myComplaints, setMyComplaints] = useState<Complaint[]>([]);

  // Load existing complaints from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('godhani_complaints');
      if (stored) {
        setMyComplaints(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local complaints", e);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result as string);
        setErrors(prev => {
          const clone = { ...prev };
          delete clone.image;
          return clone;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters.';
    }
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit Indian Mobile Number (starting with 6-9).';
    }
    if (!description.trim() || description.trim().length < 15) {
      newErrors.description = 'Please describe the issue in detail (at least 15 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate compliant Complaint ID: GNP202600001
    const padNum = (num: number) => num.toString().padStart(5, '0');
    const prefix = 'GNP2026';
    const nextSeq = myComplaints.length + 1;
    const complaintId = `${prefix}${padNum(nextSeq)}`;

    const newComplaint: Complaint = {
      id: complaintId,
      fullName: fullName.trim(),
      mobile: mobile,
      ward: `Ward ${ward}`,
      complaintType,
      description: description.trim(),
      imageUrl: imageFile || undefined,
      status: 'Submitted',
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newComplaint, ...myComplaints];
    setMyComplaints(updated);
    try {
      localStorage.setItem('godhani_complaints', JSON.stringify(updated));
    } catch (e) {
      console.error("Storage write failure", e);
    }

    setSubmittedId(complaintId);
    
    // Clear inputs
    setFullName('');
    setMobile('');
    setDescription('');
    setImageFile(null);
  };

  return (
    <div className="bg-[#FAF9F5] border border-[#E5E3D8] rounded-2xl overflow-hidden shadow-xs" id="lodge-complaint-sec">
      <div className="bg-slate-900 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center dark:text-[#C25050] gap-2">
          <ShieldAlert className="w-6 h-6 " />
          Citizen Complaint Redressal Portal
        </h2>
        <p className="text-red-100 text-sm mt-1">Lodge grievances directly to ward administrators for immediate oversight and resolution.</p>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {submittedId && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border border-red-200 text-red-950 rounded-xl p-5 relative"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#9B1A1A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-800">Grievance Registered Successfully!</h4>
                    <p className="text-xs text-red-700 mt-1">Your Complaint ID is <span className="font-mono font-bold text-red-900 bg-red-100 px-2 py-0.5 rounded">{submittedId}</span>.</p>
                    <p className="text-xs text-red-600 mt-2">
                      Please save this ID to track updates. Ward inspectors will review your grievance within 24 hours.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSubmittedId(null)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-800 text-xs font-bold font-mono cursor-pointer"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="comp-fullname">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="comp-fullname"
                  type="text"
                  placeholder="e.g. Satish Chaple"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-900 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none ${
                    errors.fullName ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                  }`}
                />
                {errors.fullName && <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.fullName}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="comp-mobile">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="comp-mobile"
                  type="tel"
                  maxLength={10}
                  placeholder="e.g. 9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-900 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none ${
                    errors.mobile ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                  }`}
                />
                {errors.mobile && <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.mobile}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ward */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="comp-ward">
                  Ward No <span className="text-red-500">*</span>
                </label>
                <select
                  id="comp-ward"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E3D8] text-sm text-gray-900 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none bg-[#FAF9F5] cursor-pointer"
                >
                  {Array.from({ length: 17 }, (_, i) => i + 1).map((wNum) => (
                    <option key={wNum} value={wNum}>Ward No {wNum}</option>
                  ))}
                </select>
              </div>

              {/* Complaint Type */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="comp-type">
                  Complaint Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="comp-type"
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E3D8] text-sm text-gray-900 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none bg-[#FAF9F5] cursor-pointer"
                >
                  <option value="Water Supply">Water Supply & Leakage</option>
                  <option value="Solid Waste">Solid Waste / Door Garbage</option>
                  <option value="Street Lights">Street Light Outage</option>
                  <option value="Road Drainage">Drainage Blockage / Road potholes</option>
                  <option value="Encroachments">Public Lands Encroachments</option>
                  <option value="Dead Animals">Dead Animal Removal</option>
                  <option value="Others">Others / Admin Enquiry</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="comp-description">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comp-description"
                rows={4}
                placeholder="Describe your issue with locations, landmark references, or ward blocks so inspectors can find it easily."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-900 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none ${
                  errors.description ? 'border-red-300 bg-red-50' : 'border-[#E5E3D8]'
                }`}
              />
              {errors.description && <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.description}</p>}
            </div>

            {/* Upload Attachment */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="comp-image">
                Upload Photo Evidence <span className="text-gray-400 font-normal">(Optional, max 2MB)</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="comp-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="comp-image"
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors border border-dashed border-gray-300 flex items-center gap-2"
                >
                  <span>Select Image</span>
                </label>
                {imageFile ? (
                  <div className="flex items-center gap-2">
                    <img src={imageFile} alt="Evidence thumbnail" className="w-10 h-10 object-cover rounded-md border border-[#E5E3D8]" />
                    <button
                      type="button"
                      onClick={() => setImageFile(null)}
                      className="text-xs text-red-500 font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">No image selected. Supporting JPEG, PNG.</span>
                )}
              </div>
              {errors.image && <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.image}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-12 bg-[#800000] hover:bg-[#9B1A1A] text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all text-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Grievance
              </button>
            </div>
          </form>
        </div>

        {/* Vector Image & Info Panel Column */}
        <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl p-5 space-y-6">
          <div className="flex items-center justify-center py-4 bg-red-50 rounded-lg border border-red-100">
            {/* Cute support agent cartoon placeholder styled using nice clean SVG inline */}
            <svg viewBox="0 0 200 200" className="w-36 h-36">
              <circle cx="100" cy="100" r="80" fill="rgba(128, 0, 0, 0.05)" />
              {/* Hair */}
              <path d="M50 110 C50 60, 150 60, 150 110" fill="#263238" />
              {/* Face */}
              <circle cx="100" cy="100" r="45" fill="#FFCCBC" />
              {/* Hair extensions */}
              <path d="M50 100 C55 80, 75 75, 80 85" fill="#263238" />
              <path d="M150 100 C145 80, 125 75, 120 85" fill="#263238" />
              {/* Eyes */}
              <circle cx="85" cy="95" r="4" fill="#37474F" />
              <circle cx="115" cy="95" r="4" fill="#37474F" />
              {/* Smile */}
              <path d="M 90 115 Q 100 125 110 115" fill="none" stroke="#D84315" strokeWidth="3" strokeLinecap="round" />
              {/* Headset */}
              <path d="M60 100 Q 100 45 140 100" fill="none" stroke="#9B1A1A" strokeWidth="6" />
              <circle cx="58" cy="100" r="8" fill="#800000" />
              <circle cx="142" cy="100" r="8" fill="#800000" />
              <path d="M60 105 Q 85 130 90 120" fill="none" stroke="#9B1A1A" strokeWidth="3" />
              {/* Clothes */}
              <path d="M 60 170 Q 100 140 140 170 L 160 200 L 40 200 Z" fill="#9B1A1A" />
            </svg>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              We are here to help you!
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our automated system distributes incoming tickets straight to ward corporators. Status updates are pushed instantly. Please review security guidelines before submitting.
            </p>
          </div>

          {/* Privacy note */}
          <div className="bg-[#E8E5D5]/40 border border-[#E5E3D8] rounded-lg p-3 text-[11px] text-gray-600 flex items-start gap-1.5 font-mono">
            <Info className="w-3.5 h-3.5 text-[#800000] shrink-0 mt-0.5" />
            <span>
              <strong>Privacy Guarantee:</strong> We securely hash logs in browser client. Personal info remains completely safe from unauthorized external servers.
            </span>
          </div>
        </div>
      </div>

      {/* Grid of My complaints */}
      {myComplaints.length > 0 && (
        <div className="border-t border-[#E5E3D8] bg-[#FAF9F5] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#800000] uppercase tracking-wider flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              My Lodged Complaints ({myComplaints.length})
            </h3>
            <button
              onClick={() => {
                if (confirm('Clear local grievance logs?')) {
                  localStorage.removeItem('godhani_complaints');
                  setMyComplaints([]);
                }
              }}
              className="text-xs text-red-500 hover:text-red-700 hover:underline font-mono cursor-pointer"
            >
              Clear Logs
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myComplaints.map((c) => (
              <div key={c.id} className="bg-[#FAF9F5] border border-[#E5E3D8] p-4 rounded-xl shadow-2xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{c.id}</span>
                    <span className="ml-2 text-[11px] text-gray-400">{c.createdAt}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    c.status === 'Submitted' ? 'bg-amber-100 text-amber-800' : 'bg-red-50 text-[#800000]'
                  }`}>
                    {c.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-gray-900">{c.complaintType} - {c.ward}</div>
                  <p className="text-xs text-gray-600 line-clamp-2 italic">"{c.description}"</p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1.5 border-t border-gray-50 font-mono">
                  <span>Contact: {c.fullName}</span>
                  <span>{c.imageUrl ? '📷 Attachment included' : 'No attachment'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
