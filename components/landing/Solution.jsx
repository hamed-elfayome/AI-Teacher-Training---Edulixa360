import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ParticleNetwork from './ParticleNetwork';
import {
  HiDocumentText,
  HiClipboardCheck,
  HiPuzzle,
  HiAdjustments,
  HiShieldCheck,
  HiSparkles
} from 'react-icons/hi';

const Solution = () => {
  const skills = [
    {
      icon: HiDocumentText,
      title: 'إنشاء خطة درس كاملة',
      description: 'تصميم خطط دراسية شاملة في دقائق معدودة',
    },
    {
      icon: HiClipboardCheck,
      title: 'تصميم الاختبارات والتقييم',
      description: 'إنشاء اختبارات وأسئلة تقييم تلقائيًا',
    },
    {
      icon: HiPuzzle,
      title: 'أنشطة تعليمية تفاعلية',
      description: 'بناء أنشطة مبتكرة بمساعدة أدوات ذكية',
    },
    {
      icon: HiAdjustments,
      title: 'تخصيص المحتوى',
      description: 'تكييف الدروس وفق مستويات الطلاب المختلفة',
    },
    {
      icon: HiShieldCheck,
      title: 'الاستخدام الآمن والأخلاقي',
      description: 'تطبيق الذكاء الاصطناعي بمعايير أخلاقية واضحة',
    },
    {
      icon: HiSparkles,
      title: 'أدوات متقدمة',
      description: 'إتقان ChatGPT وMidjourney وDALL-E والمزيد',
    },
  ];

  return (
    <section id="solution" className="relative py-16 md:py-20 bg-background overflow-hidden">
      {/* Smooth Connection */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>

      {/* Particle Network */}
      <div className="opacity-20">
        <ParticleNetwork />
      </div>

      {/* Background Gradients */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-[#14b8a6]/15 to-[#14b8a6]/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-tr from-[#f43f5e]/12 to-[#f43f5e]/3 rounded-full blur-2xl"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12 max-w-4xl mx-auto"
        >
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            الحل
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-4">
            ماذا يقدم لك هذا البرنامج؟
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 md:mb-6">
            مهارات عملية تعيد تعريف التدريس
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            خلال التدريب، ستتعلم كيف:
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <Card className="h-full bg-card/60 backdrop-blur-xl border-border/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-primary/50 group">
                  <CardHeader className="text-center pb-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                    </div>
                    <CardTitle className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                      {skill.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {skill.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Visual Representation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10 md:mt-12 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { icon: HiDocumentText, label: 'خطة درس' },
              { icon: HiClipboardCheck, label: 'اختبار' },
              { icon: HiPuzzle, label: 'نشاط تفاعلي' },
              { icon: HiSparkles, label: 'طالب سعيد' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-primary/20 rounded-2xl flex items-center justify-center hover:bg-primary transition-all duration-300 group">
                    <Icon className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-muted-foreground">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
