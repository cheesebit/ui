import clsx from 'clsx';
import React from 'react';

import { Label } from '../../atoms/label';

import './form.scss';

function FormField( { className, children, ...others } ) {
	return (
		<Label className={ clsx( 'cb-field', className ) } { ...others }>
			{ children }
		</Label>
	);
}

export default FormField;
