import { path } from '../../common/toolset';
import { DEFAULT } from '../../common/constants';

export default {
  getActive({ tabs, active }) {
    const id = active || path(['0', 'for'], tabs ?? DEFAULT.OBJECT) || null;

    return id;
  },
};
