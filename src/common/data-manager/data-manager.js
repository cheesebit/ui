import { AttributeManager } from '../attribute-manager';
import { dissoc, isNil, mandatory, toArray } from '../toolset';
import { Tree, adapter as defaultAdapter } from '../tree';

class DataManager {
	constructor( { adapter, attributes, data = mandatory( 'data is required' ) } ) {
		this._adapter = { ...defaultAdapter, ...adapter };
		this._attributes = attributes;

		this.data = data;
	}

	set data( data ) {
		this._tree = new Tree( this._adapter, data );

		if ( isNil( this._attributeManager ) ) {
			this._attributeManager = new AttributeManager(
				this._attributes,
				this._tree,
			);
		} else {
			this._attributeManager.tree = this._tree;
		}
	}

	get data() {
		return this._tree.mapping;
	}

	getNode( id ) {
		return this._tree.getNode( id );
	}

	getRoot() {
		return this._tree.getRoot();
	}

	getChildrenOf( id ) {
		return this._tree.getChildrenOf( id );
	}

	getParentOf( id ) {
		return this._tree.getParentOf( id );
	}

	/**
	 * Assigns the given attribute with `value` to all `ids`.
	 *
	 * @param {string} attribute - Attribute to be assigned.
	 * @param {string|Array<string>} ids - IDs to which value should be assigned.
	 * @param {*} value - Value to be assigned.
	 */
	set( attribute, ids, value ) {
		const safeIDs = toArray( ids );
		for ( let i = 0; i < safeIDs.length; i++ ) {
			this._attributeManager.set( attribute, safeIDs[ i ], value );
		}
	}

	/**
	 * Unassigns the given `attribute` to all `ids`, resetting them to the
	 * given `value`, if provided.
	 *
	 * @param {string} attribute - Attribute to be unassigned.
	 * @param {string|Array<string>} ids - IDs to be unassigned.
	 * @param {*} value - Value to which `attribute` should be reset to.
	 */
	unset( attribute, ids, value ) {
		const safeIDs = toArray( ids );
		for ( let i = 0; i < safeIDs.length; i++ ) {
			this._attributeManager.unset( attribute, safeIDs[ i ], value );
		}
	}

	/**
	 * Resets `attribute` with the optionally provided `value`. This will unassign all
	 * previously set ids.
	 * Internally, it calls the `reset` function for each attribute Mode.
	 *
	 * @param {string} attribute - Attribute to be reset.
	 * @param {*} value
	 */
	reset( attribute, value ) {
		this._attributeManager.reset( attribute, value );
	}

	getAttribute( attribute, ignoreRoot = true ) {
		const allNodes = this._attributeManager.getAttribute( attribute );

		if ( ! ignoreRoot ) {
			return allNodes;
		}

		const allNodesExceptRoot = dissoc( Tree.ROOT, allNodes );

		return allNodesExceptRoot;
	}

	getAttributeByNodeID( attribute, id ) {
		return this._attributeManager.getAttributeByNodeID( attribute, id );
	}
}

export default DataManager;
