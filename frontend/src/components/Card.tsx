import React from 'react';
import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div className={cn(
    "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md",
    className
  )}>
    {children}
  </div>
);