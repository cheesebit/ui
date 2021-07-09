import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Box } from '../../atoms/box';
import { Button, Emphasis } from '../../atoms/button';
import { Input } from '../../atoms/input';
import { useID } from '../../hooks/id';

import './copy.scss';

function Copy( { className, value, editable = false, onCopy, ...others } ) {
	const id = useID( others );

	const handleClick = useCallback( function handleClick() {
		// based on https://www.w3schools.com/howto/howto_js_copy_clipboard.asp

		/* Get the text field */
		const copyText = document.getElementById( id );

		/* Select the text field */
		copyText.select();
		copyText.setSelectionRange( 0, 99999 ); /* For mobile devices */

		/* Copy the text inside the text field */
		document.execCommand( 'copy' );

		navigator?.clipboard?.readText?.().then( ( text ) => {
			onCopy?.( text );
		} );
	} );

	return (
		<Box
			borderless
			paddingless
			className={ clsx( 'cb-copy', className ) }
			trailing={
				<Button
					emphasis={ Emphasis.ghost }
					icon="content-copy"
					onClick={ handleClick }
					data-testid="cb-copy-button"
				/>
			}
		>
			<Input
				id={ id }
				{ ...( editable ? { value } : { defaultValue: value } ) }
				readOnly={ ! editable }
			/>
		</Box>
	);
}

Copy.propTypes = {
	editable: PropTypes.bool,
	onCopy: PropTypes.func,
};

export default Copy;
