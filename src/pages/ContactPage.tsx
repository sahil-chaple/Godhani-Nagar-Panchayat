import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600">Get in touch with us for any inquiries, feedback, or support.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Details */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Office Info</h2>
            
            <div className="space-y-6 flex-grow">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-50 text-primary rounded-xl flex items-center justify-center shrink-0 mr-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Godhani Nagar Panchayat,<br/>
                    Tah. Nagpur Rural, Dist. Nagpur<br/>
                    Maharashtra - 441123
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-50 text-primary rounded-xl flex items-center justify-center shrink-0 mr-4">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Numbers</h3>
                  <p className="text-gray-600 text-sm mb-1">07103-XXXXXX</p>
                  <p className="text-sm font-semibold text-red-500">Emergency: 112</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-50 text-primary rounded-xl flex items-center justify-center shrink-0 mr-4">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 text-sm">np.godhani@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-50 text-primary rounded-xl flex items-center justify-center shrink-0 mr-4">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                  <p className="text-gray-600 text-sm">Mon - Sat : 10 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100 relative overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            
            <AnimatePresence>
               {isSuccess && (
                  <motion.div 
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
                  >
                     <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                     <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                     <p className="text-gray-600">Thank you for contacting us. We will get back to you shortly.</p>
                     <button onClick={() => setIsSuccess(false)} className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Send Another</button>
                  </motion.div>
               )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50/50 ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="John Doe"
                    {...register('name')}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50/50 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="john@example.com"
                    {...register('email')}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50/50"
                  placeholder="10-digit mobile"
                  {...register('phone')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea 
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50/50 resize-none ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="How can we help you?"
                  {...register('message')}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                     Send Message <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map Area */}
        <div className="bg-white rounded-3xl p-2 sm:p-3 shadow-sm border border-gray-100 h-[300px] lg:h-[400px] overflow-hidden relative">
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14878.892015091724!2d79.035418!3d21.20317515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0e62ea6b565%3A0xe5a1bdfd94d3ae14!2sGodhani%2C%20Nagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '1.25rem' }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
