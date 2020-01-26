import ChanceJS from 'chance';

import { DEFAULT } from '../src/common/constants';

export const chance = new ChanceJS();

/**
 * @function
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
const generateArray = ({ template, amount }) => {
  amount = amount || chance.integer({ min: 2, max: 10 });

  const data = [];
  for (let i = 0; i < amount; i++) {
    const item = template({ index: i });
    data.push(item);
  }

  return data;
};

const asGenerator = func => (...args) => func.apply(chance, args);

const generateAnimal = asGenerator(chance.animal);
const generateGuid = asGenerator(chance.guid);
const generateName = asGenerator(chance.name);
const generateNatural = asGenerator(chance.natural);
const generateParagraph = asGenerator(chance.paragraph);
const generateSentence = asGenerator(chance.sentence);
const generateUrl = asGenerator(chance.url);
const generateWord = asGenerator(chance.word);

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

export default {
  animal: generateAnimal,
  array: generateArray,
  guid: generateGuid,
  name: generateName,
  natural: generateNatural,
  paragraph: generateParagraph,
  pick: generatePick,
  sentence: generateSentence,
  url: generateUrl,
  word: generateWord
};
