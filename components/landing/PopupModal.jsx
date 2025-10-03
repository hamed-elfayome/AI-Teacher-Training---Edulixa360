"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiSparkles } from 'react-icons/hi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ContactForm from './ContactForm';

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenPopup', 'true');
  };

  const handleSuccess = () => {
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={closeModal}
        >
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#14b8a6]/10 via-transparent to-[#f43f5e]/10"></div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30, rotateX: 15 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.3 }}
            className="relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={closeModal}
              className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-card/95 backdrop-blur-xl border border-primary/30 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 shadow-lg"
              aria-label="إغلاق"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiX size={20} />
            </motion.button>

            {/* Modal Content */}
            <Card className="bg-card/95 backdrop-blur-xl border-border/30 shadow-2xl overflow-hidden relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#14b8a6]/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#f43f5e]/8 to-transparent rounded-full blur-2xl"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
                  className="mb-6"
                >
                  <img 
                    src="/Logo 414x143.png" 
                    alt="Edulixa360" 
                    className="mx-auto h-16 w-auto drop-shadow-lg"
                  />
                </motion.div>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', bounce: 0.3 }}
                  className="mb-6"
                >
                  <Badge variant="secondary" className="text-sm px-6 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors duration-300">
                    مرحباً بك!
                  </Badge>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <CardTitle className="text-3xl font-bold text-foreground mb-3 bg-gradient-to-r from-foreground to-primary bg-clip-text">
                    انضم إلى ثورة التعليم
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    بالذكاء الاصطناعي
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="relative z-10">
                {/* Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <ContactForm onSuccess={handleSuccess} />
                </motion.div>

                {/* Security Note */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10"
                >
                  <p className="text-muted-foreground text-sm text-center font-medium">
                    بياناتك في أمان تام معنا
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;
