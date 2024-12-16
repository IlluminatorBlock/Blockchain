// src/components/shapes/Spinner.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Spinner = () => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <motion.div
                className="absolute bg-blue-500 rounded-full"
                style={{
                    width: '60px',
                    height: '60px',
                    top: '30vh',
                    left: '10vw',
                    opacity: 0.7,
                }}
                animate={{
                    rotate: [0, 360], // Rotate continuously
                }}
                transition={{
                    duration: 1,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            />
        </div>
    );
};

export default Spinner;