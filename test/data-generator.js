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
 * @param {object} args
 * @param {Function} args.template Template function to generate one item
 * @param {number} args.amount Amount of items to be generated. If none is provide,
 * then a random amount is generated.
 * @returns {Array} Returns an array of lenght `amount`, with items
 * generated based on the provided `template`.
 */
function generateArray({ template, amount }) {
  amount = amount || chance.integer({ min: 2, max: 10 });

  const data = [];
  for (let i = 0; i < amount; i++) {
    const item = template({ index: i });
    data.push(item);
  }

  return data;
}

const generatePick = (array, options) => {
  const { quantity = 1, allowRepeat = true } = options || DEFAULT.OBJECT;

  if (quantity === 1) {
    return chance.pickone(array, quantity);
  }

  let picked = chance.pickset(array, quantity);

  if (!allowRepeat) {
    picked = Array.from(new Set(picked));
  }

  return picked;
};

const asGenerator = func => (...args) => func.apply(chance, args);

export default {
  animal: asGenerator(chance.animal),
  array: generateArray,
  bool: asGenerator(chance.bool),
  company: asGenerator(chance.company),
  email: asGenerator(chance.email),
  float: asGenerator(chance.floating),
  guid: asGenerator(nanoid),
  id: asGenerator(nanoid),
  name: asGenerator(chance.name),
  natural: asGenerator(chance.natural),
  paragraph: asGenerator(chance.paragraph),
  pick: generatePick,
  profession: asGenerator(chance.profession),
  sentence: asGenerator(chance.sentence),
  syllable: asGenerator(chance.syllable),
  url: asGenerator(chance.url),
  word: asGenerator(chance.word),
};
