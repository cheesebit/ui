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

/**
 *
 * @param {Object} params
 * @param {number} [params.x] - x coordinate for the generated element
 * @param {number} [params.y] - y coordinate for the generated element
 * @param {number} [params.width] - width for the generated element
 * @param {number} [params.height] - height for the generated
 * @param {number} [params.offsetHeight] - offset height for the generated element
 * @param {number} [params.offsetWidth] - offset width for the generated
 * @return {HTMLElement} Fake HTMLElement.
 */
function generateElement( params = {} ) {
	const {
		x,
		y,
		width, height,
		offsetHeight,
		offsetWidth,
	} = params;

	// ignoring error because we don't use the whole object in our tests
	// @ts-ignore
	return {
		getBoundingClientRect() {
			// based on https://developer.mozilla.org/en-US/docs/Web/API/DOMRect/DOMRect

			return new DOMRect(
				x ?? chance.natural( { min: 0, max: 100 } ),
				y ?? chance.natural( { min: 0, max: 100 } ),
				width ?? chance.natural( { min: 100, max: 500 } ),
				height ?? chance.natural( { min: 100, max: 500 } ),
			);
		},
		offsetHeight: offsetHeight || chance.natural( { min: 100, max: 500 } ),
		offsetWidth: offsetWidth || chance.natural( { min: 100, max: 500 } ),
		style: {},
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
	url: asGenerator( chance.url ),
	word: asGenerator( chance.word ),
};
