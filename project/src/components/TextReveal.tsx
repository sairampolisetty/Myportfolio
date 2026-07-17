import { motion } from 'framer-motion';

export const TextReveal = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  // Split string into words and preserve spaces by using gap in flex container
  const words = text.split(' ');
  
  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', columnGap: '0.25em' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: "50px" }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: delay + i * 0.04
          }}
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};
