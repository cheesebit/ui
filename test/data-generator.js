import ChanceJS from 'chance';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet(
	'ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-',
	15,
);

import { DEFAULT } from '../src/common/constants';

export const chance = new ChanceJS();

/**
 * Generates an array of `amount` (or  random) length, based on the given
 * template function.
 * The template function receives as named parameter the current `index`.
 *
 * @param {Function} template Template function to generate one item
 * @param {number} amount Amount of items to be generated. If none is provide,
 * then a random amount is generated.
 * @return {Array} Returns an array of lenght `amount`, with items
 * generated based on the provided `template`.
 */
function generateArray( template, amount ) {
	amount = amount || chance.integer( { min: 2, max: 10 } );

	const data = [];
	for ( let i = 0; i < amount; i++ ) {
		const item = template( { index: i } );
		data.push( item );
	}

	return data;
}

const generatePick = ( array, options ) => {
	const { quantity = 1, allowRepeat = true } = options || DEFAULT.OBJECT;

	if ( quantity === 1 ) {
		return chance.pickone( array );
	}

	let picked = chance.pickset( array, quantity );

	if ( ! allowRepeat ) {
		picked = Array.from( new Set( picked ) );
	}

	return picked;
};

function generateElement( {
	top,
	right,
	bottom,
	left,
	offsetHeight,
	offsetWidth,
} = {} ) {
	return {
		getBoundingClientRect() {
			return {
				top: top || chance.natural( { min: 100, max: 500 } ),
				right: right || chance.natural( { min: 100, max: 500 } ),
				bottom: bottom || chance.natural( { min: 100, max: 500 } ),
				left: left || chance.natural( { min: 100, max: 500 } ),
			};
		},
		offsetHeight: offsetHeight || chance.natural( { min: 100, max: 500 } ),
		offsetWidth: offsetWidth || chance.natural( { min: 100, max: 500 } ),
		style: {},
	};
}

function generateTarget( { offsetHeight, offsetWidth } = {} ) {
	return {
		offsetHeight: offsetHeight || chance.natural( { min: 100, max: 500 } ),
		offsetWidth: offsetWidth || chance.natural( { min: 100, max: 500 } ),
	};
}

const asGenerator = ( func ) => ( ...args ) => func.apply( chance, args );

export default {
	animal: asGenerator( chance.animal ),
	array: generateArray,
	bool: asGenerator( chance.bool ),
	company: asGenerator( chance.company ),
	element: generateElement,
	email: asGenerator( chance.email ),
	float: asGenerator( chance.floating ),
	guid: asGenerator( nanoid ),
	id: asGenerator( nanoid ),
	name: asGenerator( chance.name ),
	natural: asGenerator( chance.natural ),
	paragraph: asGenerator( chance.paragraph ),
	pick: generatePick,
	profession: asGenerator( chance.profession ),
	sentence: asGenerator( chance.sentence ),
	shuffle: asGenerator( chance.shuffle ),
	syllable: asGenerator( chance.syllable ),
	target: generateTarget,
	url: asGenerator( chance.url ),
	word: asGenerator( chance.word ),
};
