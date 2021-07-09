import { equals, isNil, until, keys } from 'toolset';

export default function PathMode( manager, attribute ) {
	const getChildrenOf = ( id ) => {
		const tree = manager.tree;

		return tree.getChildrenOf( id );
	};

	const getParentOf = ( id ) => {
		const tree = manager.tree;

		return tree.getParentOf( id );
	};

	const getAttribute = ( id ) => {
		return manager.getAttributeByNodeID( attribute, id );
	};

	const setByAttribute = ( value, id ) => {
		manager._assign( attribute, value, id );
	};

	const unsetByAttribute = ( value, id ) => {
		manager._unassign( attribute, value, id );
	};

	return {
		reset( value ) {
			const tree = manager.tree;

			const ids = keys( tree.mapping );
			for ( let i = 0; i < ids.length; i++ ) {
				const id = ids[ i ];
				setByAttribute( value || true, id );
			}
		},
		set( value, id ) {
			setByAttribute( value, id );

			until( isNil, ( parent ) => {
				setByAttribute( value, parent );

				return getParentOf( parent );
			} )( getParentOf( id ) );

			const children = getChildrenOf( id );

			for ( let i = 0; i < children.length; i++ ) {
				const id = children[ i ];
				setByAttribute( value, id );
			}
		},
		unset( value, id ) {
			if ( equals( getAttribute( id ), value ) ) {
				return;
			}

			unsetByAttribute( value, id );
		},
	};
}
