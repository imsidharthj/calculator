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
      return secondValue !== 0 ? first / secondValue : NaN;
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
