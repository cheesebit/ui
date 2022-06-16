import { DEFAULT } from '../constants';
import { entries, get, isNil, keys, mandatory, set, unset } from '../toolset';
import { PathMode, PropagateMode, ToggleMode, UniqueMode } from './modes';

export const Mode = {
	path: 'path',
	propagate: 'propagate',
	toggle: 'toggle',
	unique: 'unique',
};

const ATTRIBUTE_MODES = {
	[ Mode.unique ]: UniqueMode,
	[ Mode.path ]: PathMode,
	[ Mode.propagate ]: PropagateMode,
	[ Mode.toggle ]: ToggleMode,
};

const getModeHandler = ( mode ) => {
	const handler = ATTRIBUTE_MODES[ mode ] || ToggleMode;

	return handler;
};

class AttributeManager {
	constructor( attributes, tree = mandatory( 'tree is required' ) ) {
		this._assigned = {};
		this._tree = tree;

		this._attributes = attributes || DEFAULT.OBJECT;
		this._modeByAttribute = entries( attributes ).reduce(
			( acc, [ attribute, mode ] ) => {
				const ModeHandler = getModeHandler( mode );
				const handler = new ModeHandler( this, attribute );

				handler.reset();

				return {
					...acc,
					[ attribute ]: handler,
				};
			},
			{}
		);
	}

	set tree( tree ) {
		this._tree = tree;

		const mapping = this._tree.mapping;

		const attributes = keys( this._attributes );
		for ( let i = 0; i < attributes.length; i++ ) {
			const attribute = attributes[ i ];

			const ids = keys( this.getAttribute( attribute ) );
			for ( let j = 0; j < ids.length; j++ ) {
				const id = ids[ j ];

				if ( ! ( id in mapping ) ) {
					this._unassign( attribute, null, id );
				}
			}
		}
	}

	get tree() {
		return this._tree;
	}

	// modes will use this method to set attribute
	_assign( attribute, value, id ) {
		set( this._assigned, [ attribute, id ], value );
	}

	// modes will use this method to unset attribute
	_unassign( attribute, _, id ) {
		unset( this._assigned, [ attribute, id ] );
	}

	// modes will use this method to totally reset the attribute
	_reset( attribute, value ) {
		set( this._assigned, attribute, value || {} );
	}

	reset( attribute, value ) {
		const mode = this._modeByAttribute[ attribute ];

		! isNil( mode ) && mode.reset( value );
	}

	set(
		attribute = mandatory( 'Attribute is required' ),
		id = mandatory( 'ID is required' ),
		value
	) {
		const mode = this._modeByAttribute[ attribute ];

		! isNil( mode ) && mode.set( value, id );
	}

	unset(
		attribute = mandatory( 'Attribute is required' ),
		id = mandatory( 'ID is required' ),
		value
	) {
		const mode = this._modeByAttribute[ attribute ];

		! isNil( mode ) && mode.unset( value, id );
	}

	getAttributeByNodeID( attribute, id ) {
		return get( this._assigned, [ attribute, id ] );
	}

	getAttribute( attribute ) {
		return get( this._assigned, [ attribute ], {} );
	}
}

export default AttributeManager;
