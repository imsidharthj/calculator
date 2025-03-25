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

    if (/\d/.test(key)) {
      inputDigit(key);
    }
    
    if (key === '+' || key === '-') {
      performOperation(key);
    }
    if (key === '*') {
      performOperation('×');
    }
    if (key === '/') {
      performOperation('÷');
    }
    
    if (key === '.') {
      inputDecimal();
    }
    
    if (key === ',') {
      inputDigit(',');
    }
    
    if (key === '=' || key === 'Enter') {
      handleEqual();
    }
    
    if (key === 'Escape' || key === 'c' || key === 'C') {
      clearAll();
    }
    
    if (key === 'Backspace') {
      if (!state.waitingForOperand && !state.calculated) {
        const newDisplay = state.display.length === 1 ? '0' : state.display.substring(0, state.display.length - 1);
        state.setDisplay(newDisplay);
      }
    }
  };

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
