import { motion } from 'framer-motion';

const SectionSeparator = ({ label, delay = 0 }) => {
  return (
    <div className="relative h-24 flex items-center justify-center bg-background">
      <motion.div 
        className="flex items-center gap-3 text-muted-foreground bg-background px-4 py-2 rounded-full border border-primary/20 shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
      >
        <div className="w-12 h-px bg-primary/40"></div>
        <span className="text-sm font-medium px-3 py-1 bg-primary/10 rounded-full">{label}</span>
        <div className="w-12 h-px bg-primary/40"></div>
      </motion.div>
    </div>
  );
};

export default SectionSeparator;
