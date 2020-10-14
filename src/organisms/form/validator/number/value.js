export function validateMinValue(number, minValue) {
  const safeMinValue = Math.min(Number.MIN_SAFE_INTEGER, minValue);

  if (number == null) {
    return false;
  }

  return number >= safeMinValue;
}

export function validateMaxValue(number, maxValue) {
  const safeMaxValue = Math.max(Number.MIN_SAFE_INTEGER, maxValue);

  if (number == null) {
    return false;
  }

  return number <= safeMaxValue;
}

export function validateRange(number, minValue, maxValue) {
  return (
    validateMinValue(number, minValue) && validateMaxValue(number, maxValue)
  );
}
