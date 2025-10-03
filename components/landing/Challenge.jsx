"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HiClock, HiUserGroup, HiLightBulb, HiCheckCircle } from 'react-icons/hi';
import ParticleNetwork from './ParticleNetwork';

const Challenge = () => {
  const painPoints = [
    {
      icon: HiClock,
      text: 'استنزاف الوقت في إعداد الخطط والتصحيح',
    },
    {
      icon: HiUserGroup,
      text: 'صعوبة جذب الطلاب في عصر التقنية',
    },
    {
      icon: HiLightBulb,
      text: 'غياب التدريب العملي على أدوات الذكاء الاصطناعي',
    },
  ];

  return (
    <section id="challenge" className="relative py-16 md:py-20 bg-background overflow-hidden">
      {/* Smooth Connection */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>

      {/* Particle Network */}
      <div className="opacity-15">
        <ParticleNetwork />
      </div>

      {/* Background Gradients */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-[#f43f5e]/15 to-[#f43f5e]/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-tr from-[#14b8a6]/12 to-[#14b8a6]/3 rounded-full blur-2xl"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 max-w-4xl mx-auto"
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            التحدي
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-4">
            لماذا تحتاج كمعلم إلى الذكاء الاصطناعي اليوم؟
          </h2>
        </motion.div>

        {/* Challenge Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <Card className="bg-card/60 backdrop-blur-xl border-border/30 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
                المعلمون اليوم يقضون ساعات طويلة في إعداد الدروس وتصميم الاختبارات والبحث عن طرق مبتكرة لجذب انتباه الطلاب.
                ومع ذلك، تبقى الأدوات التقليدية محدودة أمام احتياجات الجيل الرقمي الجديد.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-10">
          {painPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <Card className="h-full bg-gradient-to-br from-rose-500/10 to-rose-500/5 backdrop-blur-xl border-rose-500/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-rose-500/40 group">
                  <CardContent className="p-5 md:p-6 text-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-rose-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-rose-500 group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-rose-500 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <p className="text-sm md:text-base text-foreground font-semibold leading-relaxed group-hover:text-rose-600 transition-colors duration-500">
                      {point.text}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bridge to Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 backdrop-blur-xl border-primary/40 shadow-xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>

            <CardContent className="relative z-10 p-6 md:p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg"></div>
                  <div className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                    <HiCheckCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-lg md:text-xl lg:text-2xl font-black text-foreground leading-tight">
                  لهذا ابتكرنا برنامج الذكاء الاصطناعي للمعلمين
                </p>
                <div className="inline-block px-3 py-1.5 bg-primary/10 rounded-lg">
                  <p className="text-sm md:text-base font-bold text-primary">
                    من Edulixa360
                  </p>
                </div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  لنمنحك الأدوات العملية التي تغيّر واقعك التدريسي
                </p>
              </div>

              {/* Arrow Indicator */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-4"
              >
                <div className="w-6 h-6 mx-auto border-2 border-primary rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Challenge;
