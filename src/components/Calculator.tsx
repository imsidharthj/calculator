
import React from 'react';
import Display from './Display';
import Button from './Button';
import { useCalculator } from '@/hooks/useCalculator';
import { useCalculatorInput } from '@/hooks/useCalculatorInput';

const Calculator = () => {
  const {
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
  } = useCalculator();

  // Prepare state object for the input hook
  const calculatorState = {
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
    setCalculated
  };

  // Prepare handlers object for the input hook
  const inputHandlers = {
    inputDigit,
    inputDecimal,
    performOperation,
    handleEqual,
    clearAll,
    handlePlusMinusToggle,
    handlePercentage
  };

  // Set up keyboard event listeners
  useCalculatorInput(calculatorState, inputHandlers);

  return (
    <div className="neu-flat p-3 max-w-[320px] min-h-[600px] mx-auto rounded-3xl bg-neugray aspect-[9/19] flex flex-col">
      <Display value={display} expression={expression} />
      
      <div className="grid grid-cols-4 gap-2 flex-grow mt-3">
        <Button onClick={clearAll} variant="special" aria-label="Clear">C</Button>
        <Button onClick={handlePlusMinusToggle} variant="special" aria-label="Plus/Minus">±</Button>
        <Button onClick={handlePercentage} variant="special" aria-label="Percentage">%</Button>
        <Button onClick={() => performOperation('÷')} variant="operator" aria-label="Divide">÷</Button>
        
        <Button onClick={() => inputDigit('7')} aria-label="Seven">7</Button>
        <Button onClick={() => inputDigit('8')} aria-label="Eight">8</Button>
        <Button onClick={() => inputDigit('9')} aria-label="Nine">9</Button>
        <Button onClick={() => performOperation('×')} variant="operator" aria-label="Multiply">×</Button>
        
        <Button onClick={() => inputDigit('4')} aria-label="Four">4</Button>
        <Button onClick={() => inputDigit('5')} aria-label="Five">5</Button>
        <Button onClick={() => inputDigit('6')} aria-label="Six">6</Button>
        <Button onClick={() => performOperation('-')} variant="operator" aria-label="Subtract">-</Button>
        
        <Button onClick={() => inputDigit('1')} aria-label="One">1</Button>
        <Button onClick={() => inputDigit('2')} aria-label="Two">2</Button>
        <Button onClick={() => inputDigit('3')} aria-label="Three">3</Button>
        <Button onClick={() => performOperation('+')} variant="operator" aria-label="Add">+</Button>
        
        <Button onClick={() => inputDigit('0')} className="col-span-1" aria-label="Zero">0</Button>
        <Button onClick={inputDecimal} aria-label="Decimal">.</Button>
        <Button onClick={() => inputDigit(',')} aria-label="Comma">,</Button>
        <Button onClick={handleEqual} variant="equal" aria-label="Equals">=</Button>
      </div>
    </div>
  );
};

export default Calculator;
