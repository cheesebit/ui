import { isEmpty } from '../toolset';
import { Tree, adapter } from './../tree';
import AttributeManager, { Mode } from './attribute-manager';
import generator from 'test/data-generator';

const items = [
	{
		label: 'label-a',
		value: 'a',
		options: [
			{
				label: 'label-aa',
				value: 'a.options[a]',
				options: [
					{
						label: 'label-aaa',
						value: 'a.options[a].options[a]',
					},
					{
						label: 'label-aab',
						value: 'a.options[a].options[b]',
					},
				],
			},
			{
				label: 'label-ab',
				value: 'a.options[b]',
				options: [
					{
						label: 'label-aba',
						value: 'a.options[b].options[a]',
					},
					{
						label: 'label-abb',
						value: 'a.options[b].options[b]',
					},
				],
			},
		],
	},
];

const itemsSubset = [
	{
		label: 'label-a',
		value: 'a',
		options: [
			{
				label: 'label-aa',
				value: 'a.options[a]',
				options: [
					{
						label: 'label-aaa',
						value: 'a.options[a].options[a]',
					},
					{
						label: 'label-aab',
						value: 'a.options[a].options[b]',
					},
				],
			},
		],
	},
];

const ids = [
	'a',
	'a.options[a]',
	'a.options[a].options[a]',
	'a.options[a].options[b]',
	'a.options[b]',
	'a.options[b].options[a]',
	'a.options[b].options[b]',
];

const idsSubset = [
	'a',
	'a.options[a]',
	'a.options[a].options[a]',
	'a.options[a].options[b]',
];

describe( 'AttributeManager', () => {
	const tree = new Tree( adapter, items );
	const attributeManager = new AttributeManager(
		{
			'attr-unique': Mode.unique,
			'attr-path': Mode.path,
			'attr-propagate': Mode.propagate,
			'attr-toggle': Mode.toggle,
		},
		tree
	);

	it( 'has the exact tree instance provided as parameter', () => {
		expect( attributeManager.tree ).toBe( tree );
	} );

	it( 'sets the provided value to the given nodeID, regardless of the attribute mode', () => {
		ids.forEach( ( nodeID ) => {
			const value = generator.word();

			attributeManager.set( 'attr-unique', nodeID, value );
			expect(
				attributeManager._assigned[ 'attr-unique' ][ nodeID ]
			).toEqual( value );

			attributeManager.set( 'attr-path', nodeID, value );
			expect(
				attributeManager._assigned[ 'attr-path' ][ nodeID ]
			).toEqual( value );

			attributeManager.set( 'attr-propagate', nodeID, value );
			expect(
				attributeManager._assigned[ 'attr-propagate' ][ nodeID ]
			).toEqual( value );

			attributeManager.set( 'attr-toggle', nodeID, value );
			expect(
				attributeManager._assigned[ 'attr-toggle' ][ nodeID ]
			).toEqual( value );
		} );
	} );

	it( 'gets the provided value to the given nodeID, regardless of the attribute mode', () => {
		ids.forEach( ( nodeID ) => {
			const value = generator.word();

			attributeManager.set( 'attr-unique', nodeID, value );
			expect(
				attributeManager.getAttributeByNodeID( 'attr-unique', nodeID )
			).toEqual( value );

			attributeManager.set( 'attr-path', nodeID, value );
			expect(
				attributeManager.getAttributeByNodeID( 'attr-path', nodeID )
			).toEqual( value );

			attributeManager.set( 'attr-propagate', nodeID, value );
			expect(
				attributeManager.getAttributeByNodeID(
					'attr-propagate',
					nodeID
				)
			).toEqual( value );

			attributeManager.set( 'attr-toggle', nodeID, value );
			expect(
				attributeManager.getAttributeByNodeID( 'attr-toggle', nodeID )
			).toEqual( value );
		} );
	} );

	it( 'unsets the provided value to the given nodeID, regardless of the attribute mode', () => {
		ids.forEach( ( nodeID ) => {
			const value = generator.word();

			attributeManager.set( 'attr-unique', nodeID, value );
			attributeManager.getAttributeByNodeID( 'attr-unique', nodeID );
			attributeManager.unset( 'attr-unique', nodeID );
			expect(
				attributeManager.getAttributeByNodeID( 'attr-unique', nodeID )
			).toBeUndefined();

			attributeManager.set( 'attr-path', nodeID, value );
			attributeManager.getAttributeByNodeID( 'attr-path', nodeID );
			attributeManager.unset( 'attr-path', nodeID );
			expect(
				attributeManager.getAttributeByNodeID( 'attr-path', nodeID )
			).toBeUndefined();

			attributeManager.set( 'attr-propagate', nodeID, value );
			attributeManager.getAttributeByNodeID( 'attr-propagate', nodeID );
			attributeManager.unset( 'attr-propagate', nodeID );
			expect(
				attributeManager.getAttributeByNodeID(
					'attr-propagate',
					nodeID
				)
			).toBeUndefined();

			attributeManager.set( 'attr-toggle', nodeID, value );
			attributeManager.getAttributeByNodeID( 'attr-toggle', nodeID );
			attributeManager.unset( 'attr-toggle', nodeID );
			expect(
				attributeManager.getAttributeByNodeID( 'attr-toggle', nodeID )
			).toBeUndefined();
		} );
	} );

	it( 'resets attribute correctly', () => {
		const tree = new Tree( adapter, items );
		const attributeManager = new AttributeManager(
			{
				'attr-unique': Mode.unique,
				'attr-path': Mode.path,
				'attr-propagate': Mode.propagate,
				'attr-toggle': Mode.toggle,
			},
			tree
		);

		ids.forEach( ( nodeID ) => {
			const value = generator.word();

			attributeManager.set( 'attr-unique', nodeID, value );
			attributeManager.set( 'attr-path', nodeID, value );
			attributeManager.set( 'attr-propagate', nodeID, value );
			attributeManager.set( 'attr-toggle', nodeID, value );
		} );

		const value = generator.word();
		attributeManager.reset( 'attr-unique', value );
		expect( attributeManager.getAttribute( 'attr-unique' ) ).toEqual( {} );

		attributeManager.reset( 'attr-path', value );
		expect( { ...attributeManager.getAttribute( 'attr-path' ) } ).toEqual(
			ids.reduce(
				( map, id ) => ( {
					...map,
					[ id ]: value,
				} ),
				{
					[ Tree.ROOT ]: value,
				}
			)
		);

		attributeManager.reset( 'attr-propagate', value );
		expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
			{}
		);

		attributeManager.reset( 'attr-toggle', value );
		expect( attributeManager.getAttribute( 'attr-toggle' ) ).toEqual( {} );
	} );

	it( 'overwrites the current tree correctly', () => {
		const tree = new Tree( adapter, items );
		const attributeManager = new AttributeManager(
			{
				'attr-toggle': Mode.toggle,
			},
			tree
		);

		const value = generator.word();
		ids.forEach( ( nodeID ) => {
			attributeManager.set( 'attr-toggle', nodeID, value );
		} );

		const otherTree = new Tree( adapter, itemsSubset );
		attributeManager.tree = otherTree;

		ids.forEach( ( nodeID ) => {
			if ( idsSubset.includes( nodeID ) ) {
				// eslint-disable-next-line jest/no-conditional-expect
				expect(
					attributeManager.getAttributeByNodeID(
						'attr-toggle',
						nodeID
					)
				).toBe( value );
			} else {
				// eslint-disable-next-line jest/no-conditional-expect
				expect(
					attributeManager.getAttributeByNodeID(
						'attr-toggle',
						nodeID
					)
				).toBeUndefined();
			}
		} );
	} );

	describe( 'Unique mode', () => {
		it( 'ensures that only one node is assigned at a time', () => {
			attributeManager.reset( 'attr-unique' );
			expect(
				isEmpty( attributeManager.getAttribute( 'attr-propagate' ) )
			).toBe( true );

			ids.forEach( ( nodeID ) => {
				const value = generator.word();
				attributeManager.set( 'attr-unique', nodeID, value );
				expect(
					attributeManager.getAttribute( 'attr-unique' )
				).toEqual( {
					[ nodeID ]: value,
				} );
			} );
		} );
	} );

	describe( 'Path mode', () => {
		it( 'ensures that the path from the assigned node to root and its immediate children are assigned', () => {
			attributeManager.reset( 'attr-path' );

			expect( {
				...attributeManager.getAttribute( 'attr-path' ),
			} ).toEqual( {
				[ Tree.ROOT ]: true,
				a: true,
				'a.options[a]': true,
				'a.options[a].options[a]': true,
				'a.options[a].options[b]': true,
				'a.options[b]': true,
				'a.options[b].options[a]': true,
				'a.options[b].options[b]': true,
			} );

			let value = generator.word();
			attributeManager.set( 'attr-path', 'a', value );
			expect( {
				...attributeManager.getAttribute( 'attr-path' ),
			} ).toEqual( {
				[ Tree.ROOT ]: value,
				a: value,
				'a.options[a]': value,
				'a.options[a].options[a]': true,
				'a.options[a].options[b]': true,
				'a.options[b]': value,
				'a.options[b].options[a]': true,
				'a.options[b].options[b]': true,
			} );

			attributeManager.reset( 'attr-path' );
			value = generator.word();
			attributeManager.set( 'attr-path', 'a.options[a]', value );
			expect( {
				...attributeManager.getAttribute( 'attr-path' ),
			} ).toEqual( {
				[ Tree.ROOT ]: value,
				a: value,
				'a.options[a]': value,
				'a.options[a].options[a]': value,
				'a.options[a].options[b]': value,
				'a.options[b]': true,
				'a.options[b].options[a]': true,
				'a.options[b].options[b]': true,
			} );

			attributeManager.reset( 'attr-path' );
			value = generator.word();
			attributeManager.set(
				'attr-path',
				'a.options[a].options[a]',
				value
			);
			expect( {
				...attributeManager.getAttribute( 'attr-path' ),
			} ).toEqual( {
				[ Tree.ROOT ]: value,
				a: value,
				'a.options[a]': value,
				'a.options[a].options[a]': value,
				'a.options[a].options[b]': true,
				'a.options[b]': true,
				'a.options[b].options[a]': true,
				'a.options[b].options[b]': true,
			} );

			attributeManager.reset( 'attr-path' );
			value = generator.word();
			attributeManager.set(
				'attr-path',
				'a.options[a].options[b]',
				value
			);
			expect( {
				...attributeManager.getAttribute( 'attr-path' ),
			} ).toEqual( {
				[ Tree.ROOT ]: value,
				a: value,
				'a.options[a]': value,
				'a.options[a].options[a]': true,
				'a.options[a].options[b]': value,
				'a.options[b]': true,
				'a.options[b].options[a]': true,
				'a.options[b].options[b]': true,
			} );

			attributeManager.reset( 'attr-path' );
			value = generator.word();
			attributeManager.set( 'attr-path', 'a.options[b]', value );
			expect( {
				...attributeManager.getAttribute( 'attr-path' ),
			} ).toEqual( {
				[ Tree.ROOT ]: value,
				a: value,
				'a.options[a]': true,
				'a.options[a].options[a]': true,
				'a.options[a].options[b]': true,
				'a.options[b]': value,
				'a.options[b].options[a]': value,
				'a.options[b].options[b]': value,
			} );

			attributeManager.reset( 'attr-path' );
			value = generator.word();
			attributeManager.set(
				'attr-path',
				'a.options[b].options[a]',
				value
			);
			expect( {
				...attributeManager.getAttribute( 'attr-path' ),
			} ).toEqual( {
				[ Tree.ROOT ]: value,
				a: value,
				'a.options[a]': true,
				'a.options[a].options[a]': true,
				'a.options[a].options[b]': true,
				'a.options[b]': value,
				'a.options[b].options[a]': value,
				'a.options[b].options[b]': true,
			} );

			attributeManager.reset( 'attr-path' );
			value = generator.word();
			attributeManager.set(
				'attr-path',
				'a.options[b].options[b]',
				value
			);
			expect( {
				...attributeManager.getAttribute( 'attr-path' ),
			} ).toEqual( {
				[ Tree.ROOT ]: value,
				a: value,
				'a.options[a]': true,
				'a.options[a].options[a]': true,
				'a.options[a].options[b]': true,
				'a.options[b]': value,
				'a.options[b].options[a]': true,
				'a.options[b].options[b]': value,
			} );
		} );
	} );

	describe( 'Propagate mode', () => {
		it( 'ensures that the provided value is to propagated', () => {
			attributeManager.reset( 'attr-propagate' );
			expect(
				isEmpty( attributeManager.getAttribute( 'attr-propagate' ) )
			).toBe( true );

			let value = generator.word();
			attributeManager.set( 'attr-propagate', Tree.ROOT, value );
			expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
				{
					[ Tree.ROOT ]: value,
					a: value,
					'a.options[a]': value,
					'a.options[a].options[a]': value,
					'a.options[a].options[b]': value,
					'a.options[b]': value,
					'a.options[b].options[a]': value,
					'a.options[b].options[b]': value,
				}
			);

			attributeManager.reset( 'attr-propagate' );
			value = generator.word();
			attributeManager.set( 'attr-propagate', 'a', value );
			expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
				{
					[ Tree.ROOT ]: value,
					a: value,
					'a.options[a]': value,
					'a.options[a].options[a]': value,
					'a.options[a].options[b]': value,
					'a.options[b]': value,
					'a.options[b].options[a]': value,
					'a.options[b].options[b]': value,
				}
			);

			attributeManager.reset( 'attr-propagate' );
			value = generator.word();
			attributeManager.set( 'attr-propagate', 'a.options[a]', value );
			expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
				{
					'a.options[a]': value,
					'a.options[a].options[a]': value,
					'a.options[a].options[b]': value,
				}
			);

			attributeManager.reset( 'attr-propagate' );
			value = generator.word();
			attributeManager.set(
				'attr-propagate',
				'a.options[a].options[a]',
				value
			);
			expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
				{
					'a.options[a].options[a]': value,
				}
			);

			attributeManager.reset( 'attr-propagate' );
			value = generator.word();
			attributeManager.set(
				'attr-propagate',
				'a.options[a].options[b]',
				value
			);
			expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
				{
					'a.options[a].options[b]': value,
				}
			);

			attributeManager.reset( 'attr-propagate' );
			value = generator.word();
			attributeManager.set( 'attr-propagate', 'a.options[b]', value );
			expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
				{
					'a.options[b]': value,
					'a.options[b].options[a]': value,
					'a.options[b].options[b]': value,
				}
			);

			attributeManager.reset( 'attr-propagate' );
			value = generator.word();
			attributeManager.set(
				'attr-propagate',
				'a.options[b].options[a]',
				value
			);
			expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
				{
					'a.options[b].options[a]': value,
				}
			);

			attributeManager.reset( 'attr-propagate' );
			value = generator.word();
			attributeManager.set(
				'attr-propagate',
				'a.options[b].options[b]',
				value
			);
			expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
				{
					'a.options[b].options[b]': value,
				}
			);
		} );

		it( 'ensures that, if all children of a given node are assigned, then it also becomes assigned', () => {
			attributeManager.reset( 'attr-propagate' );
			expect(
				isEmpty( attributeManager.getAttribute( 'attr-propagate' ) )
			).toBe( true );

			const value = generator.word();
			attributeManager.set(
				'attr-propagate',
				'a.options[a].options[a]',
				value
			);
			expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
				{
					'a.options[a].options[a]': value,
				}
			);

			attributeManager.set(
				'attr-propagate',
				'a.options[a].options[b]',
				value
			);
			expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
				{
					'a.options[a]': value,
					'a.options[a].options[a]': value,
					'a.options[a].options[b]': value,
				}
			);
		} );

		it( 'ensures that, if the root node is assigned, then all nodes will be assigned', () => {
			attributeManager.reset( 'attr-propagate' );
			expect(
				isEmpty( attributeManager.getAttribute( 'attr-propagate' ) )
			).toBe( true );

			const value = generator.word();
			attributeManager.set( 'attr-propagate', Tree.ROOT, value );
			expect( attributeManager.getAttribute( 'attr-propagate' ) ).toEqual(
				{
					[ Tree.ROOT ]: value,
					a: value,
					'a.options[a]': value,
					'a.options[a].options[a]': value,
					'a.options[a].options[b]': value,
					'a.options[b]': value,
					'a.options[b].options[a]': value,
					'a.options[b].options[b]': value,
				}
			);
		} );
	} );

	describe( 'Toggle mode', () => {
		it( 'ensures nodes are freely assigned, one at a time', () => {
			attributeManager.reset( 'attr-toggle' );
			expect(
				isEmpty( attributeManager.getAttribute( 'attr-toggle' ) )
			).toBe( true );

			let assigned = {};
			ids.forEach( ( nodeID ) => {
				const value = generator.word();
				assigned = { ...assigned, [ nodeID ]: value };

				attributeManager.set( 'attr-toggle', nodeID, value );
				expect(
					attributeManager.getAttribute( 'attr-toggle' )
				).toEqual( assigned );
			} );
		} );
	} );
} );
