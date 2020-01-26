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
  return `[data-test="${value}"]`;
}
