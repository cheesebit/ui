import React from 'react';

import { getID } from 'common/toolset';

/**
 *
 * @param {Object} props
 * @param {string | number} [props.id]
 * @return {string} Provided or generated ID, converted to a string.
 */
function useID( props ) {
	const { id: propId } = props;
	const [ id, setID ] = React.useState( getID( propId ) );

	React.useEffect(
		function updateID() {
			setID( getID( propId ) );
		},
		[ propId ]
	);

	return String( id );
}

export default useID;
