import generator from 'test/data-generator';

import { each, keys } from 'common/toolset';
import {
	getStatus,
	getValidator,
	getValue,
	handleArrayRule,
	handleObjectRule,
	handleStringRule,
	resolveRule,
	validate,
	validators,
} from './validator';
import {
	InvalidExceptCheckerError,
	InvalidValidatorError,
	RuleTypeError,
} from './exceptions';

describe( 'validator', () => {
	describe( 'getStatus', () => {
		// the `false` means an array with the name of the validators that failed
		it( 'returns true when previous status is true and current status is true', () => {
			expect( getStatus( true, true, 'validator-name' ) ).toBe( true );
		} );

		it( 'returns an array with the validator name when previous status is true and current status is false', () => {
			expect( getStatus( true, false, 'validator-name' ) ).toEqual( [ 'validator-name' ] );
		} );

		it( 'returns an array with the validator name when previous status is false and current status is true', () => {
			expect( getStatus( [ 'validator-name-1' ], true, 'validator-name-2' ) ).toEqual( [
				'validator-name-1',
			] );
		} );

		it( 'returns an array with the validator names when previous status is false and current status is false', () => {
			expect( getStatus( [ 'validator-name-1' ], false, 'validator-name-2' ) ).toEqual( [
				'validator-name-1',
				'validator-name-2',
			] );
		} );
	} );

	describe( 'getValue', () => {
		const values = {
			name: generator.name(),
			email: generator.email(),
			type: null,
		};

		it( 'returns empty `values` if is a falsy `values` is provided', () => {
			expect( getValue( null, 'name', true ) ).toEqual( {} );
			expect( getValue( undefined, 'name', true ) ).toEqual( {} );
		} );

		it( 'returns `values` if a custom validator (handler) is provided', () => {
			expect( getValue( values, 'name', true ) ).toEqual( values );
		} );

		it( 'returns specific field value if a predefined validator (handler) is provided', () => {
			expect( getValue( values, 'name', false ) ).toBe( values.name );
			expect( getValue( values, 'email', false ) ).toBe( values.email );
			expect( getValue( values, 'type', false ) ).toBeNull();
			expect( getValue( values, 'age', false ) ).toBeUndefined();
		} );
	} );

	describe( 'getValidator', () => {
		it( 'returns a predefined validator if the given rule name matches an existing validator', () => {
			each( ( ruleName ) => {
				expect( getValidator( ruleName ) ).toEqual( validators[ ruleName ] );
			}, keys( validators ) );
		} );

		it( 'returns a permissive validator (always returns true) if the given rule name does not match an existing validator', () => {
			const ruleName = generator.word();

			expect( getValidator( ruleName ) ).toEqual( validators.permissive );
		} );
	} );

	describe( 'handleStringRule', () => {
		it( 'returns an object with the validator name and its handler', () => {
			each( ( ruleName ) => {
				expect( handleStringRule( ruleName ) ).toEqual( {
					name: ruleName,
					validator: validators[ ruleName ],
				} );
			}, keys( validators ) );
		} );
	} );

	describe( 'handleObjectRule', () => {
		it( 'returns an object with the provided validator', () => {
			const rule = {
				name: generator.word(),
				except: jest.fn(),
				handler: jest.fn(),
			};

			expect( handleObjectRule( rule ) ).toEqual( {
				isCustomHandler: true,
				except: rule.except,
				name: rule.name,
				validator: rule.handler,
				args: [],
			} );
		} );

		it( 'returns an object with the requested predefined validator', () => {
			const rule = {
				name: generator.pick( keys( validators ) ),
				except: jest.fn(),
			};

			expect( handleObjectRule( rule ) ).toEqual( {
				isCustomHandler: false,
				except: rule.except,
				name: rule.name,
				validator: validators[ rule.name ],
				args: [],
			} );
		} );

		it( 'throws an error if the provided validator neither a Promise nor a function', () => {
			const rule = {
				name: generator.word(),
				except: jest.fn(),
				handler: generator.word(),
			};

			expect( () => handleObjectRule( rule ) ).toThrowError( InvalidValidatorError );
		} );

		it( 'throws an error if the provided except is not a Promise or a function', () => {
			const rule = {
				name: generator.word(),
				except: generator.word(),
				handler: jest.fn(),
			};

			expect( () => handleObjectRule( rule ) ).toThrowError( InvalidExceptCheckerError );
		} );
	} );

	describe( 'handleArrayRule', () => {
		it( 'returns a permissive validator if the provided predefined validator is not found', () => {
			const args = [ generator.word(), generator.natural() ];
			const ruleName = generator.pick( keys( validators ) );
			const rule = [ ruleName, ...args ];

			expect( handleArrayRule( rule ) ).toEqual( {
				name: ruleName,
				validator: validators[ ruleName ],
				args,
			} );
		} );

		it( 'returns a predefined validator if the provided predefined validator is found', () => {
			const args = [ generator.word(), generator.natural() ];
			const ruleName = generator.word();
			const rule = [ ruleName, ...args ];

			expect( handleArrayRule( rule ) ).toEqual( {
				name: ruleName,
				validator: validators.permissive,
				args,
			} );
		} );
	} );

	describe( 'resolveRule', () => {
		it( 'calls `resolveArrayRule` if an array is provided', () => {
			const resolveArrayRule = jest.fn();
			const rule = [];

			resolveRule( rule, resolveArrayRule, null, null );
			expect( resolveArrayRule ).toHaveBeenNthCalledWith( 1, rule );
		} );

		it( 'calls `resolveStringRule` if a  is provided', () => {
			const resolveStringRule = jest.fn();
			const rule = '';

			resolveRule( rule, null, null, resolveStringRule );
			expect( resolveStringRule ).toHaveBeenCalled();
		} );

		it( 'calls `resolveObjectRule` if a  is provided', () => {
			const resolveObjectRule = jest.fn();
			const rule = {};

			resolveRule( rule, null, resolveObjectRule, null );
			expect( resolveObjectRule ).toHaveBeenCalled();
		} );

		it( 'throws an error if the provided rule is not an array/object/string', () => {
			const resolveObjectRule = jest.fn();
			const rule = generator.natural();

			expect( () => {
				resolveRule( rule, null, resolveObjectRule, null );
			} ).toThrowError( RuleTypeError );
		} );
	} );

	describe( 'validate', () => {
		it( 'throws an error if schema is missing', async () => {
			await expect( validate( {} ) ).rejects.toThrowError( 'Schema is required' );
		} );

		it( 'returns status true for all fields if schema is empty', async () => {
			expect( await validate( { name: 'John Doe', email: 'john@doe.com' }, {} ) ).toEqual( {
				name: true,
				email: true,
			} );
		} );

		it( 'returns status true for fields that have an empty array of validator', async () => {
			expect(
				await validate(
					{ name: 'John Doe', email: 'john@doe.com' },
					{
						name: [],
						email: [],
					},
				),
			).toEqual( {
				name: true,
				email: true,
			} );
		} );

		it( 'returns status true for fields that have no validation schema', async () => {
			expect(
				await validate(
					{ name: 'John Doe', email: 'john@doe.com' },
					{},
				),
			).toEqual( {
				name: true,
				email: true,
			} );
		} );

		it( 'skips validation if `except` returns `true`', async () => {
			const schema = {
				name: {
					except: () => true,
					handler: jest.fn(),
				},
			};

			await validate( { name: 'John Doe' }, schema );

			expect(
				schema.name.handler,
			).not.toHaveBeenCalled();
		} );

		it( 'proceeds with validation if `except` returns `false`', async () => {
			const schema = {
				name: {
					except: () => false,
					handler: jest.fn(),
				},
			};

			await validate( { name: 'John Doe' }, schema );

			expect(
				schema.name.handler,
			).toHaveBeenCalled();
		} );

		it( 'runs validator successfully', async () => {
			const schema = {
				name: {
					handler: jest.fn(),
				},
			};

			const values = { name: 'John Doe' };

			await validate( values, schema );

			expect( schema.name.handler ).toHaveBeenCalledWith( values );
		} );

		it( 'runs validator successfully with aditional args', async () => {
			const schema = {
				name: {
					handler: jest.fn(),
					args: [ generator.natural( { min: 1, max: 5 } ) ],
				},
			};

			const values = { name: 'John Doe' };

			await validate( values, schema );

			expect( schema.name.handler ).toHaveBeenCalledWith( values, ...schema.name.args );
		} );
	} );
} );
