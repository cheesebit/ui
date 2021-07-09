import 'regenerator-runtime/runtime';

import { getWidth, getMeasurements, setElementStyle } from './ui-toolset';
import generator from '../../test/data-generator';

describe( 'UI Toolset', () => {
	const style = {
		marginLeft: generator.natural( { min: 10, max: 50 } ),
		marginRight: generator.natural( { min: 10, max: 50 } ),
		paddingLeft: generator.natural( { min: 10, max: 50 } ),
		paddingRight: generator.natural( { min: 10, max: 50 } ),
		paddingTop: generator.natural( { min: 10, max: 50 } ),
		paddingBottom: generator.natural( { min: 10, max: 50 } ),
	};

	describe( 'getMeasurements', () => {
		beforeEach( () => {
			window.getComputedStyle = jest.fn( () => style );
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		it( 'returns empty object for null/undefined', () => {
			expect( getMeasurements( null, {} ) ).toEqual( {} );
			expect( getMeasurements( undefined, {} ) ).toEqual( {} );
		} );

		it( 'returns measurements including margin', () => {
			const element = generator.element();

			expect( getMeasurements( element, { margin: true } ) ).toEqual( {
				left: element.offsetLeft,
				top: element.offsetTop,
				width:
          element.offsetWidth +
          parseInt( style.marginLeft ) +
          parseInt( style.marginRight ),
				padding: {
					top: parseInt( style.paddingTop, 10 ),
					right: parseInt( style.paddingRight, 10 ),
					bottom: parseInt( style.paddingBottom, 10 ),
					left: parseInt( style.paddingLeft, 10 ),
				},
				margin: {
					top: parseInt( style.marginTop, 10 ),
					right: parseInt( style.marginRight, 10 ),
					bottom: parseInt( style.marginBottom, 10 ),
					left: parseInt( style.marginLeft, 10 ),
				},
			} );
		} );

		it( 'returns measurements running custom add function', () => {
			const element = generator.element();
			const increment = generator.natural( { min: 5, max: 15 } );

			const options = {
				add() {
					return increment;
				},
			};

			expect( getMeasurements( element, options ) ).toEqual( {
				left: element.offsetLeft,
				top: element.offsetTop,
				width: element.offsetWidth + increment,
				padding: {
					top: parseInt( style.paddingTop, 10 ),
					right: parseInt( style.paddingRight, 10 ),
					bottom: parseInt( style.paddingBottom, 10 ),
					left: parseInt( style.paddingLeft, 10 ),
				},
				margin: {
					top: parseInt( style.marginTop, 10 ),
					right: parseInt( style.marginRight, 10 ),
					bottom: parseInt( style.marginBottom, 10 ),
					left: parseInt( style.marginLeft, 10 ),
				},
			} );
		} );

		it( 'returns width correctly', () => {
			const element = generator.element();

			expect( getWidth( element ) ).toBe( element.offsetWidth );
		} );

		it( 'returns width=0 if element is null/undefined', () => {
			expect( getWidth( null ) ).toBe( 0 );
			expect( getWidth( undefined ) ).toBe( 0 );
		} );
	} );

	describe( 'setElementStyle', () => {
		it( 'returun false when element is falsy', () => {
			expect( setElementStyle( null ) ).toBe( false );
			expect( setElementStyle( undefined ) ).toBe( false );
		} );

		it( 'sets attribute succesfully', () => {
			const attribute = generator.word();
			const value = generator.natural();

			const element = generator.element();

			expect( setElementStyle( element, attribute, value ) ).toBe( true );

			expect( element.style ).toEqual( {
				[ attribute ]: value,
			} );
		} );
	} );
} );
