import defaultAdapter from './adapter';
import { toArray } from 'common/toolset';
import { DEFAULT } from 'common/constants';
import { Mode } from 'common/attribute-manager';

export default {
	getAdapter( { adapter } ) {
		return { ...defaultAdapter, ...adapter };
	},
	getMode( { multiple } ) {
		return multiple ? Mode.propagate : Mode.unique;
	},
	getValue( { adapter, value } ) {
		return toArray( value || DEFAULT.ARRAY ).reduce( ( array, item ) => {
			return array.concat( [ adapter.getID( item ) ] );
		}, [] );
	},
};
