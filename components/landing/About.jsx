import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { HiCheckCircle, HiAcademicCap, HiCode, HiStar } from 'react-icons/hi';
import ParticleNetwork from './ParticleNetwork';

const About = () => {
  const programHighlights = [
    'دورات تفاعلية عبر الإنترنت',
    'ورش عمل عملية تطبيقية',
    'مشاريع حقيقية وتطبيقات عملية',
    'متابعة فردية مع المدربين',
    'محتوى محدث باستمرار',
    'مجتمع تعليمي نشط',
  ];

  const learningPath = [
    {
      icon: HiAcademicCap,
      title: 'المستوى التأسيسي',
      description: 'أساسيات الذكاء الاصطناعي وتطبيقاته في التعليم',
      duration: '4 أسابيع'
    },
    {
      icon: HiCode,
      title: 'المستوى المتقدم',
      description: 'تطبيقات متقدمة وأدوات احترافية لتطوير المحتوى',
      duration: '6 أسابيع'
    },
    {
      icon: HiStar,
      title: 'مشروع التخرج',
      description: 'تنفيذ مشروع تعليمي كامل باستخدام الذكاء الاصطناعي',
      duration: '2 أسابيع'
    },
  ];

  const stats = [
    { number: '+500', label: 'متدرب ناجح' },
    { number: '+20', label: 'دورة تدريبية' },
    { number: '+15', label: 'مدرب معتمد' },
    { number: '%98', label: 'نسبة الرضا' },
  ];

  return (
    <section id="about" className="relative py-24 bg-background overflow-hidden">
      {/* Smooth Connection from Features */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>

      {/* Enhanced Particle Network */}
      <div className="opacity-15">
        <ParticleNetwork />
      </div>

      {/* Logo Color Background Elements */}
      <div className="absolute top-20 right-10 w-36 h-36 bg-gradient-to-br from-[#14b8a6]/12 to-[#14b8a6]/4 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-10 w-28 h-28 bg-gradient-to-tr from-[#f43f5e]/10 to-[#f43f5e]/3 rounded-full blur-2xl"></div>



      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Improved Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 text-sm px-4 py-2">
              خطة منظمة
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              مسار التعلم
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              رحلة تعليمية متكاملة من الأساسيات إلى الاحتراف في <span className="text-primary font-bold">12 أسبوع</span> من التدريب المكثف
            </p>
          </div>
        </motion.div>

        {/* Clean Learning Path */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPath.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative"
                >
                  <Card className="h-full bg-card/60 backdrop-blur-xl border-border/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-primary/50 group">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                        <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-primary">0{index + 1}</span>
                        <Badge variant="secondary" className="text-xs">
                          {step.duration}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-center text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Program Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              مزايا إضافية
            </Badge>
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              ما يميز برنامجنا
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ x: 8, scale: 1.03 }}
                className="group"
              >
                <Card className="bg-card/40 backdrop-blur-xl border-border/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                        <HiCheckCircle className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                      </div>
                      <span className="text-foreground font-medium group-hover:text-primary transition-colors duration-500">
                        {highlight}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default About;
