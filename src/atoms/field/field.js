import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Box } from '../box';
import { DEFAULT } from '../../common/constants';
import { Icon } from '../icon';
import { isEmpty, omit, equals, isNil } from '../../common/toolset';
import { resolveProp } from '../../common/props-toolset';
import { Tooltip } from '../tooltip';
import Anchor from './field-anchor';
import Selectors from './field.selectors';

import './field.scss';

const OMITTED_PROPS = ['tooltip', 'feedback', 'prompt', 'trailing'];

export const Variant = {
  danger: 'danger',
  info: 'info',
  success: 'success',
  warn: 'warn',
};

// Based on https://uxdesign.cc/ui-cheat-sheet-text-fields-2152112615f8
class Field extends React.PureComponent {
  get classes() {
    const { className, variant } = this.props;

    return classNames(
      'cb-field',
      {
        '-danger': equals(variant, Variant.danger),
        '-info': equals(variant, Variant.info),
        '-success': equals(variant, Variant.success),
        '-warn': equals(variant, Variant.warn),
      },
      className,
    );
  }
  get feedback() {
    return Selectors.getFeedback(this.props);
  }

  get tooltip() {
    return Selectors.getTooltip(this.props);
  }

  get prompt() {
    return Selectors.getPrompt(this.props);
  }

  renderTrailing() {
    const { trailing } = this.props;

    if (!isNil(trailing)) {
      return trailing;
    }

    const feedback = this.feedback;
    const tooltip = this.tooltip;

    if (isEmpty(feedback) && isEmpty(tooltip)) {
      return null;
    }

    const { mode, position, text, icon } = (() => {
      if (!isEmpty(feedback)) {
        return feedback;
      }

      return tooltip;
    })();

    return (
      <Tooltip
        className="tooltip"
        mode={mode}
        position={position}
        text={text}
        data-test="field-tooltip"
      >
        <Anchor data-test="tooltip-anchor">
          <Icon size={12} {...resolveProp(icon, 'name')} />
        </Anchor>
      </Tooltip>
    );
  }

  renderPrompt = () => {
    const feedback = this.feedback;

    if (!isEmpty(feedback)) {
      return feedback.text || DEFAULT.STRING;
    }

    return this.prompt;
  };

  render() {
    const { label, children, className, ...others } = this.props;

    return (
      <div
        {...omit(OMITTED_PROPS, others)}
        className={this.classes}
        data-test="cb-field"
      >
        <span className="label" data-test="field-label">
          {label}
        </span>
        <Box
          className="content"
          as="div"
          borderless
          paddingless
          stretched
          trailing={this.renderTrailing()}
          data-test="field-content"
        >
          {children}
        </Box>
        <span className="prompt" data-test="field-prompt">
          {this.renderPrompt()}
        </span>
      </div>
    );
  }
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  prompt: PropTypes.string,
  feedback: PropTypes.shape({
    text: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
        size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
    ]),
  }),
  tooltip: PropTypes.shape({
    text: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
        size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
    ]).isRequired,
  }),
  variant: PropTypes.oneOf([
    Variant.danger,
    Variant.info,
    Variant.success,
    Variant.warn,
  ]),
};

export default Field;
