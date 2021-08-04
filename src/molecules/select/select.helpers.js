import { getIDGenerator, toArray, join } from '../../common/toolset';
import { DEFAULT } from '../../common/constants';

const updateIDGenerator = getIDGenerator(
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	5,
);

export function getUpdateID() {
	return updateIDGenerator();
}

/**
 * Returns the select value based on its `multiple` prop;
 *
 * @param {Array} selected - Selection value.
 * @param {SelectAdapter} adapter - Adapter to handle options.
 * @return {string} - String representation of the selected value.
 */
export function toValue( selected, adapter ) {
	return join( toArray( selected || DEFAULT.ARRAY ).reduce( ( array, item ) => {
		return array.concat( [ adapter.getLabel( item ) ] );
	}, [] ) );
}

/**
 * @typedef {import('./adapter').SelectAdapter} SelectAdapter
 */
