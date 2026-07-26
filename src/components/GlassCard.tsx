'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = false,
  hoverEffect = true,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={cn(
        'rounded-2xl p-6 transition-all duration-300 relative overflow-hidden',
        glow ? 'glass-panel-glow' : 'glass-panel',
        hoverEffect && 'hover:border-cyan-500/40 hover:shadow-cyan-500/10 hover:shadow-2xl',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Top subtle highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      {children}
    </motion.div>
  );
};
