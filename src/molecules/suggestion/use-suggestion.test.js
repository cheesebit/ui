import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import generator from '../../../test/data-generator';
import useSuggestion, { QueryStatus, MIN_QUERY_LENGTH } from './use-suggestion';

const TestAdapter = {
	getID: ( item ) => item.value,
	getLabel: ( item ) => item.label,
};

const DS_1 = generator.array( () => ( {
	label: generator.animal(),
	value: generator.id(),
} ) );

function useDs1() {
	return {
		adapter: TestAdapter,
		fetch: async function ds1( { query } ) {
			return new Promise( ( resolve ) => {
				setTimeout( () => {
					resolve( [
						...DS_1,
						{
							label: query,
							value: query,
						},
					] );
				}, 50 );
			} );
		},
	};
}

const DS_2 = generator.array( () => ( {
	label: generator.company(),
	value: generator.id(),
} ) );

function useDs2() {
	return {
		adapter: TestAdapter,
		fetch: function ds2( { query } ) {
			return [
				...DS_2,
				{
					label: query,
					value: query,
				},
			];
		},
	};
}

const DS_3 = generator.array( () => ( {
	label: generator.word(),
	value: generator.id(),
} ) );

function useDs3() {
	return {
		adapter: TestAdapter,
		fetch: async function ds2( { } ) {
			return new Promise( ( _, reject ) => {
				setTimeout( () => {
					reject( DS_3 );
				}, 50 );
			} );
		},
	};
}

const DS_4 = generator.array( () => ( {
	label: generator.profession(),
	value: generator.id(),
} ) );

function useDs4() {
	return {
		adapter: TestAdapter,
		fetch: async function ds1( { query } ) {
			return new Promise( ( resolve ) => {
				setTimeout( () => {
					resolve( [
						...DS_4,
						{
							label: query,
							value: query,
						},
					] );
				}, 50 );
			} );
		},
	};
}

describe( 'useSuggestion', () => {
	const delay = 50;

	it( 'returns clear, fetch, options and status', () => {
		const { result } = renderHook( () =>
			useSuggestion( delay, useDs1, useDs2, useDs3 ),
		);

		const { clear, fetch, options, status } = result.current;

		expect( typeof clear ).toBe( 'function' );
		expect( typeof fetch ).toBe( 'function' );
		expect( Array.isArray( options ) ).toBe( true );
		expect( options ).toEqual( [] );
		expect( status ).toBe( QueryStatus.IDLE );
	} );

	it( 'performs clear with options parameter', () => {
		const { result } = renderHook( () =>
			useSuggestion( delay, useDs1, useDs2, useDs3 ),
		);

		act( () => {
			result.current.clear( {
				options: DS_3,
			} );
		} );

		expect( result.current.options ).toEqual( DS_3 );

		act( () => {
			result.current.clear();
		} );

		expect( result.current.options ).toEqual( [] );
	} );

	it( `does nothing when query has length < ${ MIN_QUERY_LENGTH }`, async () => {
		const { result } = renderHook( () => useSuggestion( delay, useDs1, useDs4 ) );
		const query = generator.word( {
			length: generator.natural( { min: 1, max: 2 } ),
		} );

		await act( async () => {
			result.current.fetch( { query } );
			await waitFor( () => expect( result.current.status ).toBe( QueryStatus.IDLE ) );
		} );

		expect( result.current.options ).toEqual( [] );
	} );

	it( 'handles single async datasource correctly', async () => {
		const { result } = renderHook( () => useSuggestion( delay, useDs1 ) );
		const query = generator.word( {
			length: generator.natural( { min: 3, max: 10 } ),
		} );

		await act( async () => {
			result.current.fetch( { query } );
			// await waitFor(() =>
			//   expect(result.current.status).toBe(QueryStatus.QUERYING),
			// );
			await waitFor( () => expect( result.current.status ).toBe( QueryStatus.DONE ) );
		} );

		expect( result.current.options ).toEqual( [
			...DS_1,
			{
				label: query,
				value: query,
			},
		] );
	} );

	it( 'handles multiple async datasources correctly', async () => {
		const { result } = renderHook( () => useSuggestion( delay, useDs1, useDs4 ) );
		const query = generator.word( {
			length: generator.natural( { min: 3, max: 10 } ),
		} );

		await act( async () => {
			result.current.fetch( { query } );
			// await waitFor(() =>
			//   expect(result.current.status).toBe(QueryStatus.QUERYING),
			// );
			await waitFor( () => expect( result.current.status ).toBe( QueryStatus.DONE ) );
		} );

		expect( result.current.options ).toEqual( [
			...DS_1,
			{
				label: query,
				value: query,
			},
			...DS_4,
			{
				label: query,
				value: query,
			},
		] );
	} );

	it( 'handles async datasources that fail correctly', async () => {
		const { result } = renderHook( () => useSuggestion( delay, useDs1, useDs3 ) );
		const query = generator.word( {
			length: generator.natural( { min: 3, max: 10 } ),
		} );

		await act( async () => {
			result.current.fetch( { query } );
			// await waitFor(() =>
			//   expect(result.current.status).toBe(QueryStatus.QUERYING),
			// );
			await waitFor( () => expect( result.current.status ).toBe( QueryStatus.DONE ) );
		} );

		expect( result.current.options ).toEqual( [
			...DS_1,
			{
				label: query,
				value: query,
			},
		] );
	} );

	it( 'handles sync datasource correctly', async () => {
		const { result } = renderHook( () => useSuggestion( delay, useDs2 ) );
		const query = generator.word( {
			length: generator.natural( { min: 3, max: 10 } ),
		} );

		await act( async () => {
			result.current.fetch( { query } );

			await waitFor( () =>
				expect( result.current.options ).toEqual( [
					...DS_2,
					{
						label: query,
						value: query,
					},
				] ),
			);
		} );
	} );

	it( 'handles mixed async/sync datasources correctly', async () => {
		const { result } = renderHook( () =>
			useSuggestion( delay, useDs1, useDs2, useDs3, useDs4 ),
		);
		const query = generator.word( {
			length: generator.natural( { min: 3, max: 10 } ),
		} );

		await act( async () => {
			result.current.fetch( { query } );
			// await waitFor(() =>
			//   expect(result.current.status).toBe(QueryStatus.QUERYING),
			// );
			await waitFor( () => expect( result.current.status ).toBe( QueryStatus.DONE ) );
		} );

		expect( result.current.options ).toEqual( [
			...DS_1,
			{
				label: query,
				value: query,
			},
			...DS_2,
			{
				label: query,
				value: query,
			},
			...DS_4,
			{
				label: query,
				value: query,
			},
		] );
	} );
} );
