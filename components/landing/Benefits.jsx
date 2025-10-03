import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ParticleNetwork from './ParticleNetwork';
import {
  HiClock,
  HiUserGroup,
  HiTrendingUp,
  HiShieldCheck,
  HiAcademicCap,
  HiStar
} from 'react-icons/hi';

const Benefits = () => {
  const benefits = [
    {
      icon: HiClock,
      title: 'توفير الوقت',
      description: 'وفّر ساعات أسبوعيًا من وقت التخطيط والتصحيح',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      hoverBg: 'group-hover:bg-blue-500'
    },
    {
      icon: HiUserGroup,
      title: 'جذب الطلاب',
      description: 'اجذب انتباه الطلاب بمحتوى عصري مبتكر',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      hoverBg: 'group-hover:bg-purple-500'
    },
    {
      icon: HiTrendingUp,
      title: 'تعزيز المكانة المهنية',
      description: 'عزز مكانتك كمعلم مواكب للثورة التكنولوجية',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      hoverBg: 'group-hover:bg-green-500'
    },
    {
      icon: HiShieldCheck,
      title: 'الثقة في الاستخدام',
      description: 'استخدم أدوات الذكاء الاصطناعي بشكل ذكي وآمن',
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10',
      hoverBg: 'group-hover:bg-teal-500'
    },
    {
      icon: HiAcademicCap,
      title: 'شهادة معتمدة',
      description: 'احصل على شهادة تدريب دولية معتمدة من Edulixa360',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      hoverBg: 'group-hover:bg-primary'
    },
  ];

  return (
    <section id="benefits" className="relative py-16 md:py-20 bg-background overflow-hidden">
      {/* Smooth Connection */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>

      {/* Particle Network */}
      <div className="opacity-15">
        <ParticleNetwork />
      </div>

      {/* Background Gradients */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-[#14b8a6]/15 to-[#14b8a6]/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-tr from-[#f43f5e]/12 to-[#f43f5e]/3 rounded-full blur-2xl"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12 max-w-4xl mx-auto"
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            الفوائد
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-4">
            لماذا هذا التدريب نقطة تحوّل في مسيرتك؟
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            ماذا ستكسب بعد الدورة؟
          </p>
        </motion.div>

        {/* Benefits Grid - 3 columns for 5 items (3 + 2 centered) */}
        <div className="max-w-6xl mx-auto mb-10 md:mb-12">
          {/* First Row - 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            {benefits.slice(0, 3).map((benefit, index) => {
              const Icon = benefit.icon;

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
                      <div className={`w-12 h-12 md:w-14 md:h-14 ${benefit.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3 ${benefit.hoverBg} group-hover:scale-110 transition-all duration-500`}>
                        <Icon className={`w-6 h-6 md:w-7 md:h-7 ${benefit.color} group-hover:text-white transition-colors duration-500`} />
                      </div>
                      <CardTitle className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-center text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Second Row - 2 items centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
            {benefits.slice(3, 5).map((benefit, index) => {
              const Icon = benefit.icon;
              const actualIndex = index + 3;

              return (
                <motion.div
                  key={actualIndex}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: actualIndex * 0.1,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <Card className="h-full bg-card/60 backdrop-blur-xl border-border/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-primary/50 group">
                    <CardHeader className="text-center pb-3">
                      <div className={`w-12 h-12 md:w-14 md:h-14 ${benefit.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3 ${benefit.hoverBg} group-hover:scale-110 transition-all duration-500`}>
                        <Icon className={`w-6 h-6 md:w-7 md:h-7 ${benefit.color} group-hover:text-white transition-colors duration-500`} />
                      </div>
                      <CardTitle className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-center text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-6 md:mb-8">
            <Badge variant="secondary" className="mb-3 md:mb-4 text-sm px-4 py-2">
              شهادات المتدربين
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              ماذا يقول المعلمون؟
            </h3>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 via-card/80 to-primary/5 backdrop-blur-xl border-primary/30 shadow-2xl">
            <CardContent className="p-6 md:p-10">
              <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                <Avatar className="w-12 h-12 md:w-14 md:h-14">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg md:text-xl font-bold">
                    م
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <h4 className="text-base md:text-lg font-bold text-foreground">معلمة متدربة</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">معلمة لغة عربية</p>
                </div>
              </div>

              <blockquote className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed font-medium mb-4 md:mb-6 relative">
                <span className="text-4xl md:text-5xl text-primary/30 absolute -top-3 md:-top-4 -right-1 md:-right-2">"</span>
                <p className="relative z-10 pr-6 md:pr-8">
                  هذه الدورة غيرت حياتي المهنية! أصبحت أعد الدروس في دقائق والطلاب أكثر تفاعلًا من أي وقت مضى.
                </p>
                <span className="text-4xl md:text-5xl text-primary/30 absolute -bottom-6 md:-bottom-8 left-0">"</span>
              </blockquote>

              <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <HiShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <span className="text-xs md:text-sm text-muted-foreground">متدربة معتمدة</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  دفعة 2024
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
