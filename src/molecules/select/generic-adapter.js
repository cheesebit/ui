import { get } from 'common/toolset';

/** @type {SelectDatasourceAdapter} */
const GenericAdapter = {
	getID(o) {
		return get(o, 'value');
	},
	getLabel(o) {
		return get(o, 'label');
	},
};

export default GenericAdapter;

/**
 * @typedef {import('./select.types').SelectDatasourceAdapter} SelectDatasourceAdapter
 */
