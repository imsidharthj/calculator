
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'equal' | 'special';
  className?: string;
  'aria-label'?: string;
};

const Button = ({
  children,
  onClick,
  variant = 'default',
  className,
  'aria-label': ariaLabel,
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  
  let variantClass = 'calculator-key-number'; // Default is now number style
  
  switch (variant) {
    case 'operator':
      variantClass = 'calculator-key-operator';
      break;
    case 'equal':
      variantClass = 'calculator-key-equal';
      break;
    case 'special':
      variantClass = 'calculator-key-special';
      break;
    default:
      variantClass = 'calculator-key-number';
  }

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    setIsPressed(true);
    
    // Add a small delay to show the pressed state
    setTimeout(() => {
      setIsPressed(false);
      onClick();
    }, 100);
  };

  return (
    <button
      className={cn(
        'calculator-key', 
        variantClass,
        isPressed ? 'neu-pressed' : 'neu-flat',
        className
      )}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsPressed(false)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
