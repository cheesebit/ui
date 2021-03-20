import { prop } from '../../common/toolset';

const getValue = prop('value');
const getLabel = prop('label');

export default {
  getID: id => id,
  getLabel: label => label,
};
