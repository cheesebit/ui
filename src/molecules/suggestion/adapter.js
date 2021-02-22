import { prop } from '../../common/toolset';

const getValue = prop('value');
const getLabel = prop('label');
const getChildren = prop('options');

export default {
  getID: id => id,
  getLabel: label => label,
};
