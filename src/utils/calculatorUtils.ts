
// Calculator utility functions for math operations

/**
 * Performs calculation based on the provided values and operator
 */
export const calculate = (firstValue: string, secondValue: number, op: string): number => {
  // Convert any commas to dots for calculation
  const sanitizedFirstValue = firstValue.replace(/,/g, '.');
  const first = parseFloat(sanitizedFirstValue);
  
  switch (op) {
    case '+':
      return first + secondValue;
    case '-':
      return first - secondValue;
    case '×':
      return first * secondValue;
    case '÷':
      return secondValue !== 0 ? first / secondValue : NaN;
    default:
      return secondValue;
  }
};

/**
 * Toggles positive/negative value
 */
export const togglePlusMinus = (value: string): string => {
  if (value !== '0') {
    return value.charAt(0) === '-' ? value.substring(1) : '-' + value;
  }
  return value;
};

/**
 * Converts value to percentage
 */
export const toPercentage = (value: string): string => {
  // Convert any commas to dots for calculation
  const sanitizedValue = value.replace(/,/g, '.');
  const numValue = parseFloat(sanitizedValue) / 100;
  return String(numValue);
};
