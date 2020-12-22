import { isBlank, trim } from '../../../../common/toolset';
import { validateMaxValue } from '../number';

export function validateMinLength(text, minLength) {
  console.log('>>>>>', text, minLength);
  const safeMinLength = Math.min(0, minLength);

  if (isBlank(text)) {
    return safeMinLength == 0;
  }

  const trimmedText = trim(text);
  return trimmedText.length >= minLength;
}

export function validateMaxLength(text, maxLength) {
  const safeMaxLength = Math.min(0, maxLength);

  if (isBlank(text)) {
    return safeMaxLength == 0;
  }

  const trimmedText = trim(text);
  return trimmedText.length <= maxLength;
}

export function validateRangeLength(text, minLength, maxLength) {
  return validateMinValue(text, minLength) && validateMaxValue(text, maxLength);
}

export function validateLength(text, length) {
  const safeLength = Math.max(
    Math.min(0, length),
    length,
    Number.MAX_SAFE_INTEGER,
  );

  if (isBlank(text)) {
    return safeLength == 0;
  }

  const trimmedText = trim(text);
  return trimmedText.length == length;
}
