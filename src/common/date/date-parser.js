import { toArray } from '../toolset';

function merge(m1, m2) {
  let merged = {};

  for (let key in { ...m1, ...m2 }) {
    merged[key] = m1[key] || [];

    if (key in m2) {
      if (Array.isArray(m2[key])) {
        merged[key].concat(m2[key]);
      } else {
        merged[key].push(m2[key]);
      }

      merged[key] = merged[key].sort(function comparator(a, b) {
        return b - a;
      });
    }
  }

  return merged;
}

function serialize(expression) {
  if (expression == null) {
    return [];
  }

  expression = String(expression).trim();

  if (expression.length === 0) {
    return [];
  }

  let token;
  let counter;
  let batata = [];

  for (let index = 0; index < expression.length; index++) {
    if (token == null) {
      token = expression[index];
      counter = 1;
    } else if (token !== expression[index]) {
      batata.push([token, counter]);
      token = expression[index];
      counter = 1;
    } else {
      counter++;
    }

    if (index === expression.length - 1) {
      batata.push([token, counter]);
    }
  }

  return batata;
}

/**
 * Create a parser function.
 * @param {Array<string>} expressions - Accepted expressions
 * @param {string|Array<string>} delimiters - Expected delimiters
 */
function parser(expressions, delimiters = [' ']) {
  let map = {};

  for (let expression of expressions) {
    map = serialize(expression).reduce(function (acc, [token, counter]) {
      return merge(acc, { [token]: counter });
    }, map);
  }

  const regex = new RegExp('(' + toArray(delimiters).join('|') + ')', 'g');

  return function parse(pattern) {
    let buffer = [];
    const split = String(pattern || '')
      .split(regex)
      .filter(a => Boolean(a));

    for (let pieces of split) {
      if (delimiters.includes(pieces)) {
        buffer.push(pieces);
        continue;
      } else {
      }

      const serialized = serialize(pieces);
      for (let pair of serialized) {
        const [token, counter] = pair;
        const counters = map[token];

        // unknown token
        if (counters == null) {
          buffer.push(String(token).repeat(counter));
          continue;
        }

        let remaining = counter;
        let j = 0;
        while (remaining > 0 && j < counters.length) {
          while (remaining >= counters[j]) {
            buffer.push(String(token).repeat(counters[j]));
            remaining -= counters[j];
          }
          j++;
        }

        if (remaining > 0) {
          buffer.push(String(token).repeat(remaining));
        }
      }
    }

    return buffer;
  };
}

export default parser;
