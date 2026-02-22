import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`w-full h-full ${className}`}>{children}</div>;
};

interface CardSwapProps {
  children: React.ReactNode;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  className?: string;
}

const CardSwap: React.FC<CardSwapProps> = ({
  children,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  className = '',
}) => {
  const [items, setItems] = useState(React.Children.toArray(children));
  const [isHovered, setIsHovered] = useState(false);

  const moveToEnd = useCallback(() => {
    setItems((prev) => {
      const newItems = [...prev];
      const first = newItems.shift();
      if (first) newItems.push(first);
      return newItems;
    });
  }, []);

  useEffect(() => {
    if (pauseOnHover && isHovered) return;
    const interval = setInterval(moveToEnd, delay);
    return () => clearInterval(interval);
  }, [moveToEnd, delay, pauseOnHover, isHovered]);

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {items.map((item, index) => {
        // We only show the first few cards to avoid clutter and performance issues
        if (index > 2) return null;
        
        return (
          <motion.div
            key={(item as React.ReactElement).key}
            className="absolute inset-0 w-full h-full rounded-[3rem] shadow-2xl overflow-hidden border border-[#133020]/5 bg-[#F9F7F7]"
            initial={false}
            animate={{
              top: index * verticalDistance,
              scale: 1 - index * 0.05,
              zIndex: items.length - index,
              opacity: 1
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            onClick={() => {
              if (index === 0) moveToEnd();
            }}
            style={{
                cursor: index === 0 ? 'pointer' : 'default',
                transformOrigin: 'top center'
            }}
          >
            {item}
          </motion.div>
        );
      })}
    </div>
  );
};

export default CardSwap;
