import { getIDGenerator, path } from '../../common/toolset';

const updateIDGenerator = getIDGenerator(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  5,
);

export function getUpdateID() {
  return updateIDGenerator();
}

/**
 * Returns the select value based on its `multiple` prop;
 * @param {array} selected - Selection value
 * @param {boolean} multiple - Is multiple selection
 * @return {array|object} Array with selected items, if `multiple`
 * or a single item otherwise.
 */
export function toValue(selected, multiple) {
  return multiple ? selected : path(['0'], selected);
}
