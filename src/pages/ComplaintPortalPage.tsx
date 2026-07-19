import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const complaintSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, 'Must be a valid 10-digit number'),
  wardNo: z.string().min(1, 'Ward No is required'),
  complaintType: z.string().min(1, 'Complaint Type is required'),
  description: z.string().min(10, 'Please provide more details (min 10 chars)'),
  photo: z.any().optional()
});

type ComplaintForm = z.infer<typeof complaintSchema>;

export default function ComplaintPortalPage() {
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ComplaintForm>({
    resolver: zodResolver(complaintSchema)
  });

  const onSubmit = (data: ComplaintForm) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // Generate ID
      const newId = `GNP${new Date().getFullYear()}${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Store in localStorage (demo)
      const existing = JSON.parse(localStorage.getItem('gnp_complaints') || '[]');
      localStorage.setItem('gnp_complaints', JSON.stringify([...existing, { id: newId, ...data, date: new Date().toISOString() }]));
      
      setSubmittedId(newId);
      setIsSubmitting(false);
      reset();
    }, 1500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 flex items-center text-sm text-gray-500">
           <Link to="/" className="hover:text-primary">Home</Link>
           <span className="mx-2">/</span>
           <Link to="/services" className="hover:text-primary">Citizen Services</Link>
           <span className="mx-2">/</span>
           <span className="text-gray-900 font-medium">Complaint Portal</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
          
          <div className="flex-1 lg:max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lodge a Complaint</h1>
            <p className="text-gray-500 mb-8">We are here to help. Register your civic grievances and we will address them promptly.</p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your name"
                    {...register('fullName')}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input 
                    type="tel" 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="10-digit mobile number"
                    {...register('mobileNumber')}
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ward No.</label>
                  <select 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white ${errors.wardNo ? 'border-red-500' : 'border-gray-300'}`}
                    {...register('wardNo')}
                  >
                    <option value="">Select Ward</option>
                    {[...Array(17)].map((_, i) => (
                      <option key={i} value={i + 1}>Ward {i + 1}</option>
                    ))}
                  </select>
                  {errors.wardNo && <p className="text-red-500 text-xs mt-1">{errors.wardNo.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Type</label>
                  <select 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white ${errors.complaintType ? 'border-red-500' : 'border-gray-300'}`}
                    {...register('complaintType')}
                  >
                    <option value="">Select Type</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Street Light">Street Light</option>
                    <option value="Road Maintenance">Road Maintenance</option>
                    <option value="Garbage Collection">Garbage Collection</option>
                    <option value="Drainage">Drainage/Sewage</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.complaintType && <p className="text-red-500 text-xs mt-1">{errors.complaintType.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Write your complaint here..."
                  {...register('description')}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-primary hover:file:bg-green-100 transition-all cursor-pointer border border-gray-300 rounded-lg p-2"
                  {...register('photo')}
                />
              </div>
              
              <div className="bg-yellow-50 text-yellow-800 text-sm p-4 rounded-lg flex items-start">
                 <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                 <p><strong>Privacy Notice:</strong> Your personal information is collected solely for the purpose of resolving this complaint and will not be shared publicly. By submitting, you consent to our data policy.</p>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? 'Submitting...' : 'SUBMIT COMPLAINT'}
              </button>
            </form>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center bg-gray-50 rounded-2xl p-8 relative overflow-hidden">
             {/* Illustration Placeholder - Using Unsplash image resembling illustration or concept */}
             <div className="text-center z-10 relative">
               <h3 className="text-2xl font-bold text-gray-900 mb-4">We are here<br/>help you</h3>
               <img 
                 src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Help support" 
                 className="rounded-xl shadow-md mx-auto relative z-10 max-w-sm w-full mix-blend-multiply border-4 border-white"
               />
               <p className="mt-8 text-gray-500 text-sm max-w-xs mx-auto">Our teams are constantly monitoring complaints to provide fast resolution.</p>
             </div>
             
             {/* Decorative blobs */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {submittedId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl relative"
              >
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Complaint Submitted Successfully!</h2>
                <p className="text-gray-500 mb-8">Your complaint has been registered. Our team will review it shortly.</p>
                
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-8 text-center shadow-inner">
                  <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Your Complaint ID</p>
                  <p className="text-2xl font-black text-primary tracking-wider">{submittedId}</p>
                </div>
                
                <Link 
                  to="/"
                  onClick={() => setSubmittedId(null)}
                  className="block w-full py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition-colors"
                >
                  Go to Home
                </Link>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
