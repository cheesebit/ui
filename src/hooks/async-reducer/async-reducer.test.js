import { renderHook, act } from '@testing-library/react-hooks';

import useAsyncReducer from './use-async-reducer';

describe( 'useAsyncReducer', () => {
	it( 'initializes correctly', () => {
		const { result } = renderHook( () => useAsyncReducer( () => {}, 0 ) );

		expect( result.current[ 0 ] /* state */ ).toBe( 0 );
		expect( typeof result.current[ 1 ] /* dispatcher */ ).toBe( 'function' );
	} );

	it( 'initializes correctly with initializer', () => {
		const { result } = renderHook( () =>
			useAsyncReducer(
				() => {},
				0,
				function() {
					return 1;
				},
			),
		);

		expect( result.current[ 0 ] /* state */ ).not.toBe( 0 );
		expect( result.current[ 0 ] /* state */ ).toBe( 1 );
		expect( typeof result.current[ 1 ] /* dispatcher */ ).toBe( 'function' );
	} );

	it( 'triggers sync action correctly', () => {
		function reducer( state, action ) {
			switch ( action.type ) {
				case 'sum':
					return state + action.payload;
				case 'subtract':
					return state - action.payload;
			}
		}

		const { result } = renderHook( () => useAsyncReducer( reducer, 0 ) );

		act( () => {
			const [ , dispatch ] = result.current;
			dispatch( { type: 'sum', payload: 3 } );
		} );

		expect( result.current[ 0 ] ).toBe( 3 );

		act( () => {
			const [ , dispatch ] = result.current;
			dispatch( { type: 'subtract', payload: 2 } );
		} );

		expect( result.current[ 0 ] ).toBe( 1 );
	} );

	it( 'triggers async action correctly', () => {
		function reducer( state, action ) {
			switch ( action.type ) {
				case 'sum':
					return state + action.payload;
				case 'subtract':
					return state - action.payload;
			}
		}

		const { result } = renderHook( () => useAsyncReducer( reducer, 0 ) );

		act( () => {
			const [ , dispatch ] = result.current;

			dispatch( function action( dispatch ) {
				dispatch( { type: 'sum', payload: 10 } );
				dispatch( { type: 'subtract', payload: 15 } );
			} );
		} );

		expect( result.current[ 0 ] ).toBe( -5 );
	} );
} );
