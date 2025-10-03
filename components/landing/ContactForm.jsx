"use client";

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ContactForm = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [guestData, setGuestData] = useState(null);
  const hasFetched = useRef(false);

  // Fetch guest data on component mount
  useEffect(() => {
    // Prevent duplicate fetch in Strict Mode
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchGuestData = async () => {
      try {
        const geoResponse = await fetch('https://ipapi.co/json/');
        if (geoResponse.ok) {
          const data = await geoResponse.json();
          setGuestData(data);

          // Send visitor data immediately to analytics sheet
          const visitorData = {
            type: 'visitor',
            timestamp: new Date().toISOString(),
            ip: data.ip || 'Unknown',
            city: data.city || 'Unknown',
            region: data.region || 'Unknown',
            country: data.country_name || 'Unknown',
            countryCode: data.country_code || 'Unknown',
            timezone: data.timezone || 'Unknown',
            latitude: data.latitude || null,
            longitude: data.longitude || null,
            org: data.org || 'Unknown'
          };

          // TODO: Replace with your Google Sheets Web App URL for analytics
          const ANALYTICS_SCRIPT_URL = 'YOUR_ANALYTICS_GOOGLE_SCRIPT_URL_HERE';

          await fetch(ANALYTICS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitorData)
          });

          console.log('Visitor data sent to analytics');
        }
      } catch (error) {
        console.warn('Could not fetch or send guest location data:', error);
      }
    };

    fetchGuestData();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use the guest data collected on page load
      const formData = {
        type: 'registration',
        name: data.name,
        phone: data.phone,
        timestamp: new Date().toISOString(),
        // Guest data from ipapi (collected on page load)
        ip: guestData?.ip || 'Unknown',
        city: guestData?.city || 'Unknown',
        region: guestData?.region || 'Unknown',
        country: guestData?.country_name || 'Unknown',
        countryCode: guestData?.country_code || 'Unknown',
        timezone: guestData?.timezone || 'Unknown',
        latitude: guestData?.latitude || null,
        longitude: guestData?.longitude || null,
        org: guestData?.org || 'Unknown'
      };

      // TODO: Replace with your Google Sheets Web App URL for registrations
      const REGISTRATION_SCRIPT_URL = 'YOUR_REGISTRATION_GOOGLE_SCRIPT_URL_HERE';

      const response = await fetch(REGISTRATION_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      setSubmitStatus('success');
      if (onSuccess) onSuccess();

      // Reset form
      reset();

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground font-semibold text-lg">
          الاسم الكامل
        </Label>
        <Input
          id="name"
          {...register('name', {
            required: 'الاسم مطلوب',
            minLength: { value: 3, message: 'الاسم يجب أن يكون 3 أحرف على الأقل' }
          })}
          placeholder="أدخل اسمك الكامل"
          className="bg-background/60 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg py-3 transition-all duration-300"
        />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
        )}
      </div>


      {/* Phone Input */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground font-semibold text-lg">
          رقم الهاتف
        </Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone', {
            required: 'رقم الهاتف مطلوب',
            pattern: {
              value: /^[0-9+\s()-]+$/,
              message: 'رقم هاتف غير صالح'
            },
            minLength: { value: 8, message: 'رقم الهاتف يجب أن يكون 8 أرقام على الأقل' }
          })}
          placeholder="مثال: +966 XX XXX XXXX"
          className="bg-background/60 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg py-3 transition-all duration-300"
          dir="ltr"
        />
        {errors.phone && (
          <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Submit Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center"
        >
          ✓ تم إرسال بياناتك بنجاح! سنتواصل معك قريباً
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center"
        >
          ✗ حدث خطأ، يرجى المحاولة مرة أخرى
        </motion.div>
      )}

      {/* Submit Button */}
      <Button 
        type="submit"
        disabled={isSubmitting}
        size="lg" 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 text-lg py-4 font-bold ring-2 ring-primary/20 hover:ring-primary/40 hover:scale-105"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            جاري الإرسال...
          </span>
        ) : (
          'سجل الآن'
        )}
      </Button>
    </motion.form>
  );
};

export default ContactForm;
