import '@testing-library/jest-dom/extend-expect';
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

import * as Enzime from 'enzyme';

// Enzime wrapper ----------------------------------------

/**
 * Converts the given value to a valid data-test attribute selector.
 *
 * @function
 * @param {string} value - Data test value.
 * @returns {EnzymeSelector}
 */
export function asTestAttr(value) {
  return `[data-testid="${value}"]`;
}

/**
 * Mounts and renders a react component into the document and provides a testing wrapper around it.
 * @param  {...any} args
 */
export function mount(...args) {
  const wrapper = Enzime.mount(...args);

  return {
    wrapper,
    instance: wrapper.instance(),
    find: wrapper.find.bind(wrapper),
    debug: wrapper.debug.bind(wrapper),
    getByTestId: testID => {
      return wrapper.find(asTestAttr(testID));
    },
  };
}
