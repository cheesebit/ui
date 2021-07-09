import { DEFAULT } from '../../common/constants';
import { isEmpty, path } from '../../common/toolset';
import { Mode, Placement } from '../tooltip';

export const DEFAULT_TOOLTIP = {
	mode: Mode.dark,
	position: Placement.top,
	text: '',
};

export const DEFAULT_FEEDBACK = {
	mode: Mode.dark,
	position: Placement.top,
	text: '',
};

export default {
	getFeedback( props ) {
		const feedback = props?.feedback || DEFAULT.OBJECT;

		if ( isEmpty( feedback ) ) {
			return feedback;
		}

		return { ...DEFAULT_FEEDBACK, ...feedback };
	},
	getTooltip( props ) {
		const tooltip = props?.tooltip || DEFAULT.OBJECT;

		if ( isEmpty( tooltip ) ) {
			return tooltip;
		}

		return { ...DEFAULT_TOOLTIP, ...tooltip };
	},
	getPrompt( props ) {
		return (
			path( [ 'text' ], this.getFeedback( props ) ) ||
      path( [ 'prompt' ], props ) ||
      DEFAULT.STRING
		);
	},
};
