export interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: number;
}

export const calculate = (firstValue: string, secondValue: number, op: string): number => {
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
      const result = secondValue !== 0 ? first / secondValue : NaN;
      // debugger
      return result
    default:
      return secondValue;
  }
};

export const togglePlusMinus = (value: string): string => {
  if (value !== '0') {
    return value.charAt(0) === '-' ? value.substring(1) : '-' + value;
  }
  return value;
};

export const toPercentage = (value: string): string => {
  const sanitizedValue = value.replace(/,/g, '.');
  const numValue = parseFloat(sanitizedValue) / 100;
  return String(numValue);
};

export const sanitizeInput = (input: string): string => {
  let sanitized = input.replace(/^0+(?!$)/, '');
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    sanitized = `${parts[0]}.${parts.slice(1).join('')}`;
  }
  return sanitized || '0';
}