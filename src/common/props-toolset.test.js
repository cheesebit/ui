import {
  compareProps,
  resolveProp,
  evaluateBorderless,
  evaluatePaddingless,
} from './props-toolset';
import { keys } from './toolset';
import generator from '../../test/data-generator';

const SIDES = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  horizontal: 'horizontal',
  vertical: 'vertical',
};

describe('Props toolset', () => {
  describe('compareProps', () => {
    it('evaluates primitive props correctly', () => {
      const obj1 = {
        key1: generator.word(),
        key2: generator.word(),
      };

      const obj2 = {
        key1: generator.word(),
        key2: generator.word(),
      };

      const comparator = compareProps(['key1', 'key2']);
      expect(typeof comparator).toBe('function');

      expect(typeof comparator(obj1, obj2)).toBe('boolean');
      expect(comparator(obj1, obj2)).toBe(false);

      expect(comparator(obj1, obj1)).toBe(true);
    });

    it('evaluates non-primitive props correctly', () => {
      const obj1 = {
        key1: generator.array({ template: generator.word }),
        key1: generator.array({ template: generator.natural }),
      };

      const obj2 = {
        key1: generator.array({ template: generator.word }),
        key1: generator.array({ template: generator.natural }),
      };

      const comparator = compareProps(['key1', 'key2']);
      expect(typeof comparator).toBe('function');

      expect(typeof comparator(obj1, obj2)).toBe('boolean');
      expect(comparator(obj1, obj2)).toBe(false);

      expect(comparator(obj1, obj1)).toBe(true);
    });
  });

  describe('resolveProps', () => {
    it('returns the prop itself if it is an object and not a valid React element', () => {
      const prop = { a: 1, b: 2 };

      expect(resolveProp(prop)).toEqual(prop);
    });

    it('returns an empty object when key is null/undefined', () => {
      expect(resolveProp('prop', null)).toEqual({});
      expect(resolveProp('prop', undefined)).toEqual({});
    });

    it('return the provided parameters as object', () => {
      const prop = generator.word();
      const key = generator.word();

      expect(resolveProp(prop, key)).toEqual({ [key]: prop });
    });
  });

  describe('evaluatePaddingless', () => {
    it('returns no-padding when called with `true`', () => {
      expect(evaluatePaddingless(true)).toBe('cb-no-padding');
    });

    it('returns side specific padding class', () => {
      const sides = generator.pick(keys(SIDES), {
        quantity: generator.natural({ min: 2, max: 4 }),
      });
      const result = evaluatePaddingless(sides);

      for (let side of sides) {
        expect(result).toContain(`cb-no-${side}-padding`);
      }
    });
  });

  describe('evaluateBorderless', () => {
    it('returns no-border when called with `true`', () => {
      expect(evaluateBorderless(true)).toBe('cb-no-border');
    });

    it('returns side specific border class', () => {
      const sides = generator.pick(keys(SIDES), {
        quantity: generator.natural({ min: 2, max: 4 }),
      });
      const result = evaluateBorderless(sides);

      for (let side of sides) {
        expect(result).toContain(`cb-no-${side}-border`);
      }
    });
  });
});
