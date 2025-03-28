import { useState, useEffect, useCallback } from 'react';
import { 
  calculate, 
  togglePlusMinus, 
  toPercentage, 
  sanitizeInput,
  CalculationHistory 
} from '@/utils/calculatorUtils';

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  const clearAll = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setCalculated(false);
    setError(false);
  }, []);

  const addToHistory = useCallback((expr: string, result: string) => {
    const newHistoryItem: CalculationHistory = {
      expression: expr,
      result: result,
      timestamp: Date.now()
    };
    setHistory(prev => [newHistoryItem, ...prev].slice(0, 10)); // Keep last 10 calculations
  }, []);

  const inputDigit = useCallback((digit: string) => {
    if (error) {
      clearAll();
    }

    if (calculated && !operator) {
      setDisplay(digit);
      setExpression('');
      setCalculated(false);
      return;
    }
    
    const currentDisplay = display === '0' && digit !== '.' ? digit : display + digit;
    const sanitizedInput = sanitizeInput(currentDisplay);
    
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(sanitizedInput);
    }
  }, [display, error, calculated, waitingForOperand, clearAll]);

  const inputDecimal = useCallback(() => {
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
  }, [display, calculated, waitingForOperand]);

  const performOperation = useCallback((nextOperator: string) => {
    const inputValue = sanitizeInput(display);

    if (display === 'Error') {
      setError(true);
      clearAll();
      return;
    }

    if (error) {
      clearAll();
      return;
    }

    if (calculated) {
      setExpression(`${display} ${nextOperator}`);
      setCurrentValue(display);
      setCalculated(false);
    }

    if (currentValue === null) {
      setCurrentValue(inputValue);
      setExpression(`${inputValue} ${nextOperator}`);
    } else if (operator) {
      const result = calculate(currentValue, Number(inputValue), operator);
      
      if (Number.isNaN(result)) {
        setDisplay('Error');
        setExpression('');
        setCurrentValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        setCalculated(true);
        return;
      }

      const resultStr = String(result);
      setDisplay(resultStr);
      setCurrentValue(resultStr);
      setExpression(`${currentValue} ${operator} ${inputValue} ${nextOperator}`);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [display, currentValue, operator, calculated, error, clearAll]);

  const handleEqual = useCallback(() => {
    if (currentValue === null || operator === null || waitingForOperand) {
      return;
    }

    if (error) {
      clearAll();
      return;
    }

    const inputValue = sanitizeInput(display);
    const result = calculate(currentValue, Number(inputValue), operator);
    
    if (Number.isNaN(result)) {
      setDisplay('Error');
      setExpression('');
      setCurrentValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      setCalculated(true);
      return;
    }
      
    const resultStr = String(result);
    const fullExpression = `${currentValue} ${operator} ${inputValue} =`;
    
    setDisplay(resultStr);
    setExpression(fullExpression);
    addToHistory(fullExpression, resultStr);
    
    setCurrentValue(resultStr);
    setOperator(null);
    setWaitingForOperand(false);
    setCalculated(true);
  }, [currentValue, operator, display, error, waitingForOperand, addToHistory, clearAll]);

  const handlePlusMinusToggle = useCallback(() => {
    setDisplay(togglePlusMinus(display));
  }, [display]);

  const handlePercentage = useCallback(() => {
    setDisplay(toPercentage(display));
  }, [display]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    display,
    expression,
    currentValue,
    operator,
    waitingForOperand,
    calculated,
    history,
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
    handlePercentage,
    clearHistory,
    addToHistory
  };
};