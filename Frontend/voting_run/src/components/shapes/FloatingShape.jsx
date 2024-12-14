import React from 'react';
import { motion } from 'framer-motion';

const FloatingShape = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Circle 1: Top Left */}
      <motion.div
        className="absolute bg-lime-500 border-2 border-gold-500 rounded-full"
        style={{
          width: '80px', // Increased size for a more spread effect
          height: '80px',
          left: '10vw',
          top: '30vh',
          opacity: 0.3, // Reduced opacity for a more subtle appearance
        }}
        animate={{
          x: [0, 30, 0], // Move left and right
          transition: {
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
          },
        }}
      />
      
      {/* Circle 2: Bottom Right */}
      <motion.div
        className="absolute bg-lime-500 border-2 border-gold-500 rounded-full"
        style={{
          width: '80px', // Increased size for a more spread effect
          height: '80px',
          right: '10vw',
          bottom: '10vh',
          opacity: 0.3, // Reduced opacity for a more subtle appearance
        }}
        animate={{
          rotate: [0, 360], // Rotate continuously
          transition: {
            duration: 5,
            ease: 'linear',
            repeat: Infinity,
          },
        }}
      />
    </div>
  );
};

export default FloatingShape;