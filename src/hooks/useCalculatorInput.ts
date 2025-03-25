
import { useEffect } from 'react';
import { CalculatorState } from '@/types/calculator';

type InputHandlers = {
  inputDigit: (digit: string) => void;
  inputDecimal: () => void;
  performOperation: (nextOperator: string) => void;
  handleEqual: () => void;
  clearAll: () => void;
  handlePlusMinusToggle: () => void;
  handlePercentage: () => void;
};

/**
 * Custom hook for handling calculator inputs, including keyboard events
 */
export const useCalculatorInput = (
  state: CalculatorState,
  handlers: InputHandlers
) => {
  const { 
    inputDigit, 
    inputDecimal, 
    performOperation, 
    handleEqual, 
    clearAll,
    handlePlusMinusToggle,
    handlePercentage
  } = handlers;

  const handleKeyboardInput = (e: KeyboardEvent) => {
    e.preventDefault();
    
    const key = e.key;

    // Handle numbers
    if (/\d/.test(key)) {
      inputDigit(key);
    }
    
    // Handle operators
    if (key === '+' || key === '-') {
      performOperation(key);
    }
    if (key === '*') {
      performOperation('×');
    }
    if (key === '/') {
      performOperation('÷');
    }
    
    // Handle decimal
    if (key === '.') {
      inputDecimal();
    }
    
    // Handle comma (alternate decimal separator)
    if (key === ',') {
      inputDigit(',');
    }
    
    // Handle equals
    if (key === '=' || key === 'Enter') {
      handleEqual();
    }
    
    // Handle clear
    if (key === 'Escape' || key === 'c' || key === 'C') {
      clearAll();
    }
    
    // Handle backspace
    if (key === 'Backspace') {
      if (!state.waitingForOperand && !state.calculated) {
        const newDisplay = state.display.length === 1 ? '0' : state.display.substring(0, state.display.length - 1);
        state.setDisplay(newDisplay);
      }
    }
  };

  // Set up keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardInput);
    return () => {
      document.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [state.display, state.currentValue, state.operator, state.waitingForOperand, state.calculated]);

  return {
    handleKeyboardInput
  };
};
