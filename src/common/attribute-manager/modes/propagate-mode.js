import { isNil, until } from '../../toolset';

export default function PropagateMode( manager, attribute ) {
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
		reset() {
			manager._reset( attribute );
		},
		set( value, id ) {
			setByAttribute( value, id );

			until( isNil, ( parent ) => {
				const children = getChildrenOf( parent );
				const allChildrenAreAssigned = children.every( getAttribute );

				if ( allChildrenAreAssigned ) {
					setByAttribute( value, parent );

					return getParentOf( parent );
				}

				return null;
			} )( getParentOf( id ) );

			const children = getChildrenOf( id );
			const unassignedChildren = children.filter( ( id ) => ! getAttribute( id ) );

			for ( let i = 0; i < unassignedChildren.length; i++ ) {
				const id = unassignedChildren[ i ];
				this.set( value, id );
			}
		},
		unset( value, id ) {
			unsetByAttribute( value, id );

			until( isNil, ( parent ) => {
				unsetByAttribute( value, parent );

				return getParentOf( parent );
			} )( getParentOf( id ) );

			const children = getChildrenOf( id );
			const assignedChildren = children.filter( ( id ) => ! isNil( getAttribute( id ) ) );

			for ( let i = 0; i < assignedChildren.length; i++ ) {
				const id = assignedChildren[ i ];
				this.unset( value, id );
			}
		},
	};
}
