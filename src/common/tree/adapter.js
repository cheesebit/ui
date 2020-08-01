import { prop } from '../toolset';

const getValue = prop('value');
const getLabel = prop('label');
const getChildren = prop('options');

export default {
  getID: getValue,
  getLabel: getLabel,
  getChildren: getChildren,
};
