import { DEFAULT } from '../../common/constants';
import { isEmpty, merge, path } from '../../common/toolset';
import { Mode, Placement } from '../tooltip';

const DEFAULT_TOOLTIP = {
  mode: Mode.dark,
  position: Placement.top,
  text: '',
};

const DEFAULT_FEEDBACK = {
  mode: Mode.dark,
  position: Placement.top,
  text: '',
};

export default {
  getFeedback(props) {
    const feedback = props?.feedback || DEFAULT.OBJECT;

    if (isEmpty(feedback)) {
      return feedback;
    }

    return merge(DEFAULT_FEEDBACK, feedback);
  },
  getTooltip(props) {
    const tooltip = props?.tooltip || DEFAULT.OBJECT;

    if (isEmpty(tooltip)) {
      return tooltip;
    }

    return merge(DEFAULT_TOOLTIP, tooltip);
  },
  getPrompt(props) {
    return (
      path(['text'], this.getFeedback(props)) ||
      path(['prompt'], props) ||
      DEFAULT.STRING
    );
  },
};
