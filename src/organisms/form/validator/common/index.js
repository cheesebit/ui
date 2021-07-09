import { isNil } from '../../../../common/toolset';

export function validateRequired( value ) {
	return ! isNil( value );
}

/**
 * Always returns true.
 *
 * @return {boolean} Returns `true` always.
 */
export function validatePermissive() {
	return true;
}
