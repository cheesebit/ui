import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import { isEmpty, isObject } from 'common/toolset';

const FORBID_REGEX = { token: '', regex: /^$/, literal: false };
const REGEX_TOKENS = /^[sdw]$/i;
const META_CHARS = '^.[]$()*+';

/**
 *  s Any whitespace character
 *  S Any non-whitespace character
 *  d Any digit
 *  D Any non-digit
 *  w Any alphanumeric character, including the underscore
 *  W Any non-alphanumeric character, including the underscore
 */

function getRegexes( { mask } ) {
	if ( ! mask ) {
		return [];
	}

	function handleString( token ) {
		if ( token.length > 1 ) {
			throw new Error( `[useMask] token ${ token } has length > 1` );
		}

		if ( REGEX_TOKENS.test( token ) ) {
			return { token, regex: new RegExp( `^\\${ token }$`, 'i' ), literal: false };
		}

		return {
			token,
			literal: true,
			regex: new RegExp(
				`^${ Array.from( token )
					.map( ( char ) => {
						if ( META_CHARS.includes( char ) ) {
							return `\\${ char }`;
						}

						return char;
					} )
					.join( '' ) }$`,
				'i',
			),
		};
	}

	function handleObject( options ) {
		const { token } = options;

		return {
			literal: true,
			...handleString( token ),
			...options,
		};
	}

	return [
		...Array.from( mask ).map( ( expected ) => {
			if ( isObject( expected ) ) {
				return handleObject( expected );
			}

			return handleString( expected );
		} ),
		FORBID_REGEX,
	];
}

function useMask( props ) {
	const {
		value: valueProp,
		onChange: onChangeProp,
		onKeyUp: onKeyUpProp,
		onKeyDown: onKeyDownProp,
	} = props;
	const optionsRef = useRef( getRegexes( props ) );
	const [ value, setValue ] = useState( () =>
		appendExtraChars( String( valueProp || '' ) ),
	);
	const changeModeRef = useRef( 'deny' ); // <'allow' | 'deny' | 'bypass'>

	useEffect(
		function updateInnerValue() {
			setValue( appendExtraChars( String( valueProp || '' ) ) );
		},
		[ valueProp ],
	);

	// console.log(optionsRef.current)
	function appendExtraChars( value ) {
		let option = optionsRef.current[ value.length ];

		while ( option?.literal ) {
			value = `${ value }${ option.token }`;
			option = optionsRef.current[ value.length ];
		}

		return value;
	}

	const onKeyDown = useCallback(
		function handleKeyDown( e ) {
			if ( [ 'Delete', 'Backspace' ].includes( e.key ) ) {
				changeModeRef.current = 'bypass';
				return;
			}

			const option = optionsRef.current[ String( value ).length ];

			if ( ! option ) {
				changeModeRef.current = 'deny';
				return;
			}

			changeModeRef.current = option.regex.test( e.key ) ? 'allow' : 'deny';
			onKeyDownProp?.( e );
		},
		[ value, onKeyDownProp ],
	);

	const onChange = useCallback(
		function handleChange( e ) {
			if ( changeModeRef.current === 'deny' ) {
				return;
			}

			let {
				target: { value },
			} = e;

			if ( changeModeRef.current === 'allow' || isEmpty( value ) ) {
				value = appendExtraChars( value );
			}

			setValue( value );
			onChangeProp?.( e );
		},
		[ onChangeProp ],
	);

	const onKeyUp = useCallback(
		function handleKeyUp( e ) {
			changeModeRef.current = 'deny';
			onKeyUpProp?.( e );
		},
		[ onKeyUpProp ],
	);

	return {
		value,
		onChange,
		onKeyDown,
		onKeyUp,
		placeholder: optionsRef.current.map( ( option ) => option.token ).join( '' ),
	};
}

export default useMask;
