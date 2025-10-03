import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HiMail, HiPhone, HiLocationMarker, HiUsers } from 'react-icons/hi';
import ParticleNetwork from './ParticleNetwork';
import ContactForm from './ContactForm';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: HiMail,
      title: 'البريد الإلكتروني',
      value: 'info@edulixa360.com',
      link: 'mailto:info@edulixa360.com'
    },
    {
      icon: HiLocationMarker,
      title: 'نوع التدريب',
      value: 'تدريب عن بُعد - أونلاين',
    },
  ];

  return (
    <section id="contact" className="relative py-16 md:py-20 bg-background overflow-hidden">
      {/* Smooth Connection from About */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>

      {/* Subtle Particle Network */}
      <div className="opacity-10">
        <ParticleNetwork />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Improved Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12 max-w-4xl mx-auto"
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            الدعوة للتسجيل
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 px-4">
            هل أنت مستعد لقيادة ثورة التعليم بالذكاء الاصطناعي؟
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-3 md:mb-4 px-4">
            لا تنتظر حتى يفوتك المستقبل. انضم الآن لمئات المعلمين الذين أحدثوا فرقًا حقيقيًا في صفوفهم الدراسية
          </p>
          <Badge variant="destructive" className="text-sm md:text-base px-4 md:px-6 py-2 animate-pulse">
            🔥 المقاعد محدودة
          </Badge>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <Card className="bg-card/60 backdrop-blur-xl border-border/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  تواصل معنا
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  نحن هنا لمساعدتك في كل خطوة من رحلتك التعليمية. لا تتردد في التواصل معنا للحصول على مزيد من المعلومات.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const isLink = info.link;

                  const content = (
                    <>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">{info.title}</p>
                        <p className="text-foreground font-semibold break-all">{info.value}</p>
                      </div>
                    </>
                  );

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      {isLink ? (
                        <a
                          href={info.link}
                          className="flex items-center gap-4 p-4 rounded-xl bg-card/40 hover:bg-card/60 transition-all duration-300 group cursor-pointer"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-card/40 hover:bg-card/60 transition-all duration-300 group">
                          {content}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-primary/10 backdrop-blur-xl border-primary/20 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <HiUsers className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">+500</div>
                    <div className="text-sm font-medium text-muted-foreground">معلم ومعلمة</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  انضم إلى مجتمعنا المتنامي من المعلمين الرواد
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className="bg-gradient-to-br from-primary/5 via-card/90 to-primary/5 backdrop-blur-xl border-primary/30 shadow-2xl relative overflow-hidden">
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/8 rounded-full blur-2xl"></div>
              
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-foreground mb-3">
                  🔥 سجّل اليوم – المقاعد محدودة
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  املأ البيانات التالية وسنتواصل معك قريباً للبدء في رحلتك
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ContactForm onSuccess={() => console.log('Form submitted successfully!')} />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-10 md:mt-12"
        >
          <p className="text-sm md:text-base text-muted-foreground">
            نستجيب لجميع الاستفسارات خلال 24 ساعة
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;