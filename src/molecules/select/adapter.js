import { prop } from '../../common/toolset';

const getValue = prop( 'value' );
const getLabel = prop( 'label' );
const getChildren = prop( 'options' );

export default {
	getID: getValue,
	getLabel,
	getChildren,
};

/**
 * @typedef {Object} SelectAdapter
 * @property {Function} getID - Get item ID
 * @property {Function} getLabel - Get item label
 * @property {Function} getChildren - Get item children options
 */
