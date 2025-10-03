import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { HiMail, HiLocationMarker, HiGlobeAlt } from 'react-icons/hi';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaLinkedin, url: '#', label: 'LinkedIn' },
    { icon: FaYoutube, url: '#', label: 'YouTube' },
  ];

  const quickLinks = [
    { title: 'الرئيسية', url: '#' },
    { title: 'التحدي', url: '#challenge' },
    { title: 'الحلول', url: '#solution' },
    { title: 'الفوائد', url: '#benefits' },
    { title: 'تواصل معنا', url: '#contact' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/20 border-t border-border/30">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/3 rounded-full blur-2xl"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-3"
          >
            <div className="flex items-center gap-3">
              <img
                src="/Logo 414x143.png"
                alt="Edulixa360"
                className="h-8 md:h-10 w-auto"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              نمكن المعلمين من استخدام أحدث تقنيات الذكاء الاصطناعي لتطوير التعليم
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs">
                منصة تدريب معتمدة
              </Badge>
              <div className="flex flex-wrap gap-1.5">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 bg-muted/50 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center text-muted-foreground transition-all duration-300"
                    >
                      <Icon className="text-sm" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <h4 className="text-foreground font-bold text-base mb-3">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.url}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h4 className="text-foreground font-bold text-base mb-3">تواصل معنا</h4>
            <div className="space-y-2.5">
              <a
                href="mailto:info@edulixa360.com"
                className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <HiMail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="break-all">info@edulixa360.com</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <HiGlobeAlt className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>تدريب عن بُعد - أونلاين</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 py-4 md:py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-2 text-center md:text-right"
            >
              <p className="text-muted-foreground">
                © {new Date().getFullYear()} Edulixa360. جميع الحقوق محفوظة.
              </p>
              <span className="hidden md:inline text-border">|</span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span>منصة نشطة</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1.5 text-muted-foreground"
            >
              <span>صُنع بـ</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-primary"
              >
                ❤️
              </motion.span>
              <span>في العالم العربي</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
