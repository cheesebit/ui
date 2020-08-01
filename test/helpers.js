import { render, queries } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const customRender = (ui, options) =>
  render(ui, { queries: { ...queries }, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

// ------- enzyme
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Returns node(s) with the given data-test attribute.
 *
 * @function
 * @param value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Data-test attribute to be searched for.
 * @returns {ShallowWrapper}
 */
export function findByTestAttr(wrapper, value) {
  return wrapper.find(asTestAttr(value));
}

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
