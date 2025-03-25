
/**
 * Calculator state and interface types
 */

export interface CalculatorState {
  display: string;
  expression: string;
  currentValue: string | null;
  operator: string | null;
  waitingForOperand: boolean;
  calculated: boolean;
  setDisplay: (value: string) => void;
  setExpression: (value: string) => void;
  setCurrentValue: (value: string | null) => void;
  setOperator: (value: string | null) => void;
  setWaitingForOperand: (value: boolean) => void;
  setCalculated: (value: boolean) => void;
}
