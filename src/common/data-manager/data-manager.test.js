import { adapter as defaultAdapter } from '../tree';
import { Mode } from '../attribute-manager/attribute-manager';
import DataManager from './data-manager';

const data = [
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

const mapping = {
	a: {
		id: 'a',
		node: {
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
		parent: '*$+#_ROOT_#+$*',
		children: [ 'a.options[a]' ],
	},
	'a.options[a]': {
		id: 'a.options[a]',
		node: {
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
		parent: 'a',
		children: [ 'a.options[a].options[a]', 'a.options[a].options[b]' ],
	},
	'a.options[a].options[a]': {
		id: 'a.options[a].options[a]',
		node: { label: 'label-aaa', value: 'a.options[a].options[a]' },
		parent: 'a.options[a]',
		children: [],
	},
	'a.options[a].options[b]': {
		id: 'a.options[a].options[b]',
		node: { label: 'label-aab', value: 'a.options[a].options[b]' },
		parent: 'a.options[a]',
		children: [],
	},
	'*$+#_ROOT_#+$*': {
		id: '*$+#_ROOT_#+$*',
		node: null,
		parent: null,
		children: [ 'a' ],
	},
};

const ids = [
	'a',
	'a.options[a]',
	'a.options[a].options[a]',
	'a.options[a].options[b]',
];

describe( 'DataManager', () => {
	const attributes = {
		'attr-toggle': Mode.toggle,
	};

	const dm = new DataManager( {
		attributes,
		data,
	} );

	it( 'initializes correctly', () => {
		expect( dm._adapter ).toEqual( defaultAdapter );
		expect( dm._attributes ).toEqual( attributes );
		expect( dm.data ).toEqual( mapping );
	} );

	it( 'retrieves internal tree root correctly', () => {
		expect( dm.getRoot() ).toEqual( {
			children: [ 'a' ],
			id: '*$+#_ROOT_#+$*',
			node: null,
			parent: null,
		} );
	} );

	it( 'retrieves children of given node correctly', () => {
		ids.forEach( ( id ) => {
			dm.getChildrenOf( id ).forEach( ( childID ) => {
				expect( dm.getParentOf( childID ) ).toBe( id );
			} );
		} );
	} );
} );
