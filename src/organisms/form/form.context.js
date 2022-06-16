import React from 'react';

/** @type {React.Context<{ values: FormState, status: ValidationStatus, dispatch: FormDispatcher }>} */
const FormContext = React.createContext( {
	values: {},
	status: {},
	dispatch: function noop() {},
} );

export default FormContext;

/**
 * @typedef {import('hooks/form').FormState} FormState
 * @typedef {import('hooks/form').FormDispatcher} FormDispatcher
 */

/**
 * @typedef {import('hooks/validation').ValidationStatus} ValidationStatus
 */
