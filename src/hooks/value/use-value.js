import { useState } from 'react';

/**
 * Custom hook that provides, for state, a way to set/get
 * similar to {@link https://api.jquery.com/val/ | `.val()` from `jQuery`}.
 *
 * @template T
 * @param {T | (() => T)} initialValue - initial value or a function that lazyly returns the initial value.
 * @return {() => T | ((value: React.SetStateAction<T>) => void)}
 */
function useValue( initialValue ) {
	const [ state, setState ] = useState( initialValue );

	/**
	 *
	 * @param  {...any} args - If setting a new value, accepts same parameters as `React.SetStateAction<T>`
	 * @return {T|void} returns `T` if called with no arguments, `void` otherwise.
	 */
	function value( ...args ) {
		if ( args.length === 0 ) {
			return state;
		}

		return setState( ...args );
	}

	return value;
}

export default useValue;
