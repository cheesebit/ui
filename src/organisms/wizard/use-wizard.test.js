import { renderHook } from '@testing-library/react-hooks';

import generator from 'test/data-generator';
import useWizard from './use-wizard';

const FLOW = {
	'step-0': {
		on: {
			next: 'step-1',
		},
	},
	'step-1': {
		on: {
			previous: 'step-0',
			next: 'step-2',
		},
	},
	'step-2': {
		on: {
			previous: 'step-1',
			next: 'step-3',
		},
	},
};

describe( 'useWizard', () => {
	it( 'handle wizard correctly', () => {
		const props = {
			current: 'step-0',
			id: generator.id(),
			flow: FLOW,
		};
		const { result } = renderHook( () => useWizard( props ) );

		expect( result.current.current ).toBe( props.current );
		expect( result.current.states ).toEqual( FLOW[ props.current ].on );
		expect( typeof result.current.transition ).toBe( 'function' );

		expect( Object.keys( result.current.contextValue ) ).toEqual(
			expect.arrayContaining( [ 'id', 'transition' ] ),
		);
	} );
} );
