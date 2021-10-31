/** @type {TreeAdapter} */
const DEFAULT_ADAPTER = {
	getID(item) {
		return item.value;
	},
	getLabel(item) {
		return item.label;
	},
	getChildren(item) {
		return item.options;
	},
};

export default DEFAULT_ADAPTER;

/**
 * @typedef {Object} Item
 * @property {string} label - item label
 * @property {string} value - item value
 * @property {Item[]} [options] - item children options
 */

/**
 * @typedef {Object} TreeAdapter
 * @property {((item: any) => string)} getID - get item ID
 * @property {((item: any) => string)} getLabel - get item label
 * @property {((item: any) => T[])} getChildren - get item children (subitems)
 */
