
import { useState } from 'react';
import { calculate, togglePlusMinus, toPercentage } from '@/utils/calculatorUtils';

/**
 * Custom hook that encapsulates calculator state and operations
 */
export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setExpression('');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setCalculated(false);
  };

  const inputDigit = (digit: string) => {
    if (calculated) {
      setDisplay(digit);
      setExpression('');
      setCalculated(false);
      return;
    }
    
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (calculated) {
      setDisplay('0.');
      setExpression('');
      setCalculated(false);
      return;
    }
    
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(display);
      setExpression(display + ' ' + nextOperator);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setDisplay(String(result));
      setCurrentValue(String(result));
      setExpression(expression + ' ' + display + ' ' + nextOperator);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEqual = () => {
    if (currentValue === null || operator === null || waitingForOperand) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = calculate(currentValue, inputValue, operator);
    
    setDisplay(Number.isNaN(result) ? 'Error' : String(result));
    setExpression(expression + ' ' + display + ' =');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setCalculated(true);
  };

  const handlePlusMinusToggle = () => {
    setDisplay(togglePlusMinus(display));
  };

  const handlePercentage = () => {
    setDisplay(toPercentage(display));
  };

  return {
    display,
    expression,
    currentValue,
    operator,
    waitingForOperand,
    calculated,
    setDisplay,
    setExpression,
    setCurrentValue,
    setOperator,
    setWaitingForOperand,
    setCalculated,
    clearAll,
    inputDigit,
    inputDecimal,
    performOperation,
    handleEqual,
    handlePlusMinusToggle,
    handlePercentage
  };
};
