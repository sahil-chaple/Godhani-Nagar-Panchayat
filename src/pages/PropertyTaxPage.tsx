import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const searchSchema = z.object({
  propertyId: z.string().min(1, 'Property ID or Mobile Number is required').or(z.literal('')),
  ownerName: z.string().optional(),
  mobileNumber: z.string().optional(),
}).refine(data => data.propertyId || data.mobileNumber, {
  message: "Either Property ID or Mobile Number must be provided",
  path: ["propertyId"]
});

type SearchForm = z.infer<typeof searchSchema>;

export default function PropertyTaxPage() {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema)
  });

  const onSearch = () => {
    // Show loading state and then details to simulate API call
    setTimeout(() => {
      setShowDetails(true);
    }, 500);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowModal(true);
      setShowDetails(false); // reset
    }, 1500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 flex items-center text-sm text-gray-500">
           <span className="hover:text-primary cursor-pointer">Home</span>
           <span className="mx-2">/</span>
           <span className="hover:text-primary cursor-pointer">Citizen Services</span>
           <span className="mx-2">/</span>
           <span className="text-gray-900 font-medium">Property Tax</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Property Tax</h1>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-primary text-white p-4 px-6 font-medium text-lg">
            Search Property
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit(onSearch)} className="flex flex-row gap-4 items-start">
              <div className="flex-1 w-full">
                <input 
                  type="text" 
                  placeholder="Property ID" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  {...register('propertyId')}
                />
                {errors.propertyId && <p className="text-red-500 text-xs mt-1">{errors.propertyId.message}</p>}
              </div>
              <div className="flex-1 w-full">
                <input 
                  type="text" 
                  placeholder="Owner Name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  {...register('ownerName')}
                />
              </div>
              <div className="flex-1 w-full">
                <input 
                  type="text" 
                  placeholder="Mobile Number" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  {...register('mobileNumber')}
                />
              </div>
              <button 
                type="submit"
                className="w-auto px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors flex items-center justify-center shrink-0"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Property Details Sheet */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Property Details</h3>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-medium">Property ID</span>
                      <span className="text-gray-900 font-semibold">: GNP12568</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-medium">Owner Name</span>
                      <span className="text-gray-900 font-semibold">: Ramesh Waghmare</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-medium">Property Address</span>
                      <span className="text-gray-900 font-semibold">: Ward No. 7, Godhani</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-medium">Property Type</span>
                      <span className="text-gray-900 font-semibold">: Residential</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-medium text-lg">Due Amount</span>
                      <span className="text-red-600 font-bold text-lg">: ₹2,458</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center p-4 bg-gray-50 rounded-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                      alt="Property" 
                      className="rounded-lg shadow-sm max-h-48 object-cover w-full"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-start">
                  <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Pay Now (Demo)'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
              >
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-500 mb-6">Your property tax payment of ₹2,458 has been recorded.</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="font-semibold">TXN8892134</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="font-semibold">{new Date().toLocaleString()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
                >
                  Download Receipt
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
