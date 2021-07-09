import defaultAdapter from './adapter';
import { toArray } from '../../common/toolset';
import { DEFAULT } from '../../common/constants';

export default {
	getAdapter( { adapter } ) {
		return { ...defaultAdapter, ...adapter };
	},
	getValue( { adapter, value } ) {
		return toArray( value || DEFAULT.ARRAY ).reduce( ( array, item ) => {
			return array.concat( [ adapter.getID( item ) ] );
		}, [] );
	},
};
