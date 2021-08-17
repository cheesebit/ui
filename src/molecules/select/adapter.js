import { prop } from 'common/toolset';

const getValue = prop( 'value' );
const getLabel = prop( 'label' );
const getChildren = prop( 'options' );
const getType = () => 'any';

/** @type {SelectAdapter} */
export default {
	getID: getValue,
	getLabel,
	getChildren,
	getType,
};

/**
 * @typedef {Object} SelectAdapter
 * @property {((o: any) => string)} getType - Get item type
 * @property {((o: any) => string)} getID - Get item ID
 * @property {((o: any) => string)} getLabel - Get item label
 * @property {((o: any) => any[])} getChildren - Get item children options
 */
