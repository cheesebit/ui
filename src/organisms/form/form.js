import React, { ReactNode } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { FormHTMLAttributes } from 'common/props-dom';
import { Label } from 'atoms/label';
import { mergeDeepWith } from 'common/toolset';
import { useForm } from 'hooks/form/use-form';
import FormContext from './form-context';

const merge = mergeDeepWith( ( l, r ) => {
	return [ l, r ];
} );

/**
 * @param {Object} props - Fields with the initial value to be managed by the form hook.
 * @param {string} props.className
 * @param {ReactNode} props.children
 * @param {Object} props.initial - Validation schema for the given fields.
 * @param {Object} props.schema - Validation schema for the given fields.
 */
function Form( props ) {
	const { className, children, initial, schema } = props;
	const { values, status, dispatch } = useForm( initial, schema );
	const [ context, setContext ] = React.useState( {
		values,
		status,
		dispatch,
	} );

	React.useEffect(
		function updateContext() {
			setContext( { values, status, dispatch } );
		},
		[ values, status, dispatch ],
	);

	return (
		<div className={ clsx( 'cb-form', className ) }>
			<div className="my-4">
				<code>{ JSON.stringify( merge( values, status ) ) }</code>
			</div>
			<FormContext.Provider value={ context }>
				{ children }
			</FormContext.Provider>
		</div>
	);
}

Form.Field = function FormField( { className, children, ...others } ) {
	return (
		<Label className={ clsx( 'cb-field', className ) } { ...others }>
			{ children }
		</Label>
	);
};

Form.Context = FormContext;

Form.propTypes = {
	...FormHTMLAttributes,
	initial: PropTypes.object,
	schema: PropTypes.object,
};

export default Form;
