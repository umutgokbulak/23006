import { motion } from 'framer-motion';
import './SvgLine.css';

export default function SvgLine({}) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  return (
    <motion.svg
      viewBox='0 0 100 100'
      xmlns='http://www.w3.org/2000/svg'
      className='svg-line'
      initial='hidden'
      animate='visible'
    >
      <motion.line
        className='path'
        x1='20'
        y1='50'
        x2='20'
        y2='20'
        stroke='#FD9700'
        variants={draw}
        strokeWidth={1}
      />
    </motion.svg>
  );
}
