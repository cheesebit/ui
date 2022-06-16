import React from 'react';

/** @type {DropdownContextValue} */
const INITIAL_CONTEXT_VALUE = {
	disabled: false,
	expanded: false,
	toggle() {
		// nothing
	},
};

const DropdownContext = React.createContext( INITIAL_CONTEXT_VALUE );

export default DropdownContext;

/**
 * @typedef {Object} DropdownContextValue
 * @property {boolean} disabled - is dropdown disabled?
 * @property {boolean} expanded - is dropdown expanded?
 * @property {() => void} toggle - expands dropdown, if collapsed, collapses it otherwise.
 */
