"use client";

import { motion } from 'framer-motion';
import { HiSparkles, HiLightningBolt, HiAcademicCap, HiArrowDown, HiChip, HiTrendingUp, HiShieldCheck } from 'react-icons/hi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ParticleNetwork from './ParticleNetwork';

const Hero = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-background">
      {/* Enhanced Particle Network Animation */}
      <div className="absolute inset-0">
        <ParticleNetwork />
      </div>

      {/* Logo Color Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#14b8a6]/10 to-[#14b8a6]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#f43f5e]/10 to-[#f43f5e]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-[#14b8a6]/10 to-[#f43f5e]/8 rounded-full blur-3xl"></div>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto text-center">

          {/* Landing Page Hero */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6"
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-6"
              >
                <img
                  src="/Logo 414x143.png"
                  alt="Edulixa360"
                  className="mx-auto h-14 md:h-16 w-auto"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Landing Page Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="mb-6"
          >
            <div className="text-center">
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-foreground mb-4 leading-tight px-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              >
                طوّر مهاراتك التدريسية مع الذكاء الاصطناعي – وكن جزءًا من مستقبل التعليم
              </motion.h1>
            </div>
          </motion.div>

          {/* Landing Page Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-10"
          >
            <div className="text-center max-w-4xl mx-auto">
              <motion.p
                className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                وفّر وقتك، اصنع محتوى مبتكر، وحوّل حصصك إلى تجربة تفاعلية باستخدام أدوات الذكاء الاصطناعي المصممة خصيصًا للمعلمين
              </motion.p>
              
              {/* Landing Page Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { icon: HiChip, text: "أدوات متقدمة", color: "primary" },
                  { icon: HiTrendingUp, text: "تحسين الأداء", color: "secondary" },
                  { icon: HiShieldCheck, text: "شهادات معتمدة", color: "outline" }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                    >
                      <Badge variant={feature.color} className="flex items-center gap-2 px-6 py-3 text-sm font-medium">
                        <Icon className="w-4 h-4" />
                        {feature.text}
                      </Badge>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Landing Page CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg font-bold"
                  asChild
                >
                  <a href="#contact" className="flex items-center gap-3">
                    <HiLightningBolt className="w-6 h-6" />
                    سجّل الآن – المقاعد محدودة
                    <HiArrowDown className="w-5 h-5" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 px-8 py-6 text-lg font-semibold"
                  asChild
                >
                  <a href="#about" className="flex items-center gap-3">
                    <HiAcademicCap className="w-6 h-6" />
                    اعرف المزيد
                  </a>
                </Button>
              </motion.div>
            </div>
            
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-muted-foreground mb-4">انضم إلى أكثر من 500+ معلم ومعلمة</p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <HiShieldCheck className="w-4 h-4 text-primary" />
                <span>شهادات معتمدة</span>
                <span className="mx-2">•</span>
                <span>دعم 24/7</span>
                <span className="mx-2">•</span>
                <span>ضمان الاسترداد</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Landing Page Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="max-w-5xl mx-auto mb-8"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: '+500', label: 'متدرب ناجح', icon: HiAcademicCap, color: 'text-primary' },
                { number: '+20', label: 'دورة تدريبية', icon: HiTrendingUp, color: 'text-primary' },
                { number: '%98', label: 'نسبة رضا', icon: HiShieldCheck, color: 'text-primary' },
                { number: '12', label: 'أسبوع', icon: HiChip, color: 'text-primary' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="text-center group"
                  >
                    <div className="mb-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Icon className={`w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300`} />
                      </div>
                      <div className={`text-3xl lg:text-4xl font-black mb-1 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        {stat.number}
                      </div>
                      <div className="text-xs md:text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Smooth Section Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/95 to-transparent"></div>

      {/* Scroll Indicator */}
      <div className="relative h-16 md:h-20 flex items-center justify-center pb-4">
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="text-xs font-medium">اكتشف المزيد</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-primary/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
