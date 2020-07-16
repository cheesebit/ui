import PropTypes from 'prop-types';
import { IDPropType, RenderablePropType } from '../../utils/props';

export const TabbedPropTypes = {
  active: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      for: IDPropType.isRequired,
      props: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      label: RenderablePropType,
    }),
  ).isRequired,
};
