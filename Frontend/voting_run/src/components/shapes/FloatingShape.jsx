import React from 'react';
import { motion } from 'framer-motion';

const FloatingShape = () => {
  const circles = [
    { left: '5vw', top: '10vh', size: 80, animation: { x: [0, 40, -40, 0], y: [0, 20, -20, 0] }, duration: 5 },
    { right: '5vw', top: '15vh', size: 70, animation: { scale: [1, 1.2, 1], rotate: [0, 360] }, duration: 6 },
    { left: '10vw', bottom: '10vh', size: 90, animation: { x: [0, -30, 30, 0] }, duration: 4 },
    { right: '10vw', bottom: '5vh', size: 60, animation: { y: [0, 50, -50, 0] }, duration: 7 },
    { left: '15vw', top: '20vh', size: 75, animation: { x: [0, 30, -30, 0], y: [0, -10, 10, 0] }, duration: 6 },
    { right: '15vw', top: '25vh', size: 85, animation: { rotate: [0, 180, 360] }, duration: 8 },
    { left: '20vw', bottom: '15vh', size: 65, animation: { scale: [1, 0.9, 1.1, 1] }, duration: 5 },
    { right: '20vw', bottom: '20vh', size: 70, animation: { y: [0, -40, 40, 0] }, duration: 7 },
    { left: '25vw', top: '5vh', size: 60, animation: { x: [0, 20, -20, 0], y: [0, 15, -15, 0] }, duration: 4 },
    { right: '25vw', bottom: '25vh', size: 80, animation: { rotate: [0, 90, 270, 360] }, duration: 9 },
    { left: '30vw', top: '30vh', size: 70, animation: { x: [0, 50, -50, 0] }, duration: 6 },
    { right: '30vw', bottom: '30vh', size: 75, animation: { scale: [1, 1.1, 0.9, 1] }, duration: 5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className="absolute bg-lime-500 border-2 border-gold-500 rounded-full"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: circle.left,
            right: circle.right,
            top: circle.top,
            bottom: circle.bottom,
            opacity: 0.2,
          }}
          animate={circle.animation}
          transition={{
            duration: circle.duration,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShape;
