import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ParticleNetwork from './ParticleNetwork';
import {
  HiChip,
  HiTrendingUp,
  HiShieldCheck,
  HiUserGroup,
  HiLightBulb,
  HiSupport
} from 'react-icons/hi';

const Features = () => {
  const features = [
    {
      icon: HiChip,
      title: 'أدوات الذكاء الاصطناعي',
      description: 'ChatGPT, Midjourney, DALL-E وأدوات متقدمة',
    },
    {
      icon: HiTrendingUp,
      title: 'تحسين الأداء التعليمي',
      description: 'زيادة كفاءة التدريس وتوفير الوقت',
    },
    {
      icon: HiShieldCheck,
      title: 'شهادات معتمدة',
      description: 'شهادات موثقة من Edulixa360',
    },
    {
      icon: HiUserGroup,
      title: 'مجتمع احترافي',
      description: 'شبكة من المعلمين المحترفين',
    },
    {
      icon: HiLightBulb,
      title: 'محتوى مبتكر',
      description: 'تصميم دروس تفاعلية وإبداعية',
    },
    {
      icon: HiSupport,
      title: 'دعم مستمر',
      description: 'فريق دعم متاح على مدار الساعة',
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-background overflow-hidden">
      {/* Smooth Connection from Hero */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>

      {/* Enhanced Particle Network */}
      <div className="opacity-20">
        <ParticleNetwork />
      </div>

      {/* Logo Color Background Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-[#14b8a6]/15 to-[#14b8a6]/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-tr from-[#f43f5e]/12 to-[#f43f5e]/3 rounded-full blur-2xl"></div>


      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
            مميزات فريدة
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            مميزات البرنامج
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            برنامج متكامل يوفر لك كل ما تحتاجه لإتقان الذكاء الاصطناعي في التعليم
          </p>
        </motion.div>

        {/* Professional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
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
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full bg-card/60 backdrop-blur-xl border-border/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-primary/50 group">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

export default Features;
