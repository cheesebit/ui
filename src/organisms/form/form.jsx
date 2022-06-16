import React from 'react';
import { classy } from '@cheesebit/classy';

import { Box } from 'atoms/box';
import { mergeDeepWith } from 'common/toolset';
import { useForm } from 'hooks/form';
import FormField from './form-field';
import FormContext from './form.context';

const merge = mergeDeepWith( ( l, r ) => {
	return [ l, r ];
} );

/**
 * @param {FormProps} props - Fields with the initial value to be managed by the form hook.
 */
function Form( props ) {
	const { as = 'form', className, children, initial, schema } = props;
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
		[ values, status, dispatch ]
	);

	return (
		<Box
			className={ classy( 'cb-form', className ) }
			as={ as }
			borderless
			paddingless
		>
			<div className="my-4">
				<code>{ JSON.stringify( merge( values, status ) ) }</code>
			</div>
			<FormContext.Provider value={ context }>
				<dl>{ children }</dl>
			</FormContext.Provider>
		</Box>
	);
}

Form.Field = FormField;

Form.Context = FormContext;

export default Form;

/**
 * @typedef {React.FormHTMLAttributes<HTMLFormElement>} DefaultFormProps
 */

/**
 * @typedef {Object} CustomFormProps
 * @property {keyof JSX.IntrinsicElements} [as] - Tag to render.
 * @property {Object} initial - initial values
 * @property {Object} schema - validation schema
 */

/**
 * @typedef {DefaultFormProps & CustomFormProps} FormProps
 */
