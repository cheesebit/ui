import { isNil } from '../../../../common/toolset';

export function validateRequired(value) {
  return !isNil(value);
}

/**
 * Always returns true.
 * @returns {boolean} Returns `true` always.
 */
export function validatePermissive() {
  return true;
}
