import PropTypes from 'prop-types';
import { RenderablePropType } from '../../utils/props';

export const ActionPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element,
  ]),
  onClick: PropTypes.func.isRequired,
});

export const ActionsPropTypes = PropTypes.arrayOf(ActionPropTypes);

export const DropdownItemsPropTypes = {
  bordered: PropTypes.bool,
  hoverable: PropTypes.bool,
  items: ActionsPropTypes,
};

export const DropdownPropTypes = {
  items: ActionsPropTypes,
  toggle: RenderablePropType,
  header: RenderablePropType,
  footer: RenderablePropType,
  hoverable: PropTypes.bool,
};
