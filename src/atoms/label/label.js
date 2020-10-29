import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import { Box } from '../box';
import { DEFAULT } from '../../common/constants';
import { Icon } from '../icon';
import { isEmpty, omit, equals, isNil } from '../../common/toolset';
import { resolveProp } from '../../common/props-toolset';
import { Tooltip } from '../tooltip';
import Anchor from './label-anchor';
import Selectors from './label.selectors';

import './label.scss';

const OMITTED_PROPS = ['tooltip', 'feedback', 'prompt', 'trailing'];

export const Variant = {
  danger: 'danger',
  info: 'info',
  success: 'success',
  warn: 'warn',
};

// Based on https://uxdesign.cc/ui-cheat-sheet-text-fields-2152112615f8
class Label extends React.PureComponent {
  get classes() {
    const { className, variant } = this.props;

    return clsx(
      'cb-label',
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
    const { trailing, variant } = this.props;

    if (!isNil(trailing)) {
      return trailing;
    }

    const feedback = this.feedback;
    const tooltip = this.tooltip;

    if (isEmpty(feedback) && isEmpty(tooltip)) {
      return null;
    }

    const { mode, placement, text, icon } = (() => {
      if (!isEmpty(feedback)) {
        return feedback;
      }

      return tooltip;
    })();

    return (
      <Tooltip
        className="tooltip"
        mode={mode}
        placement={placement}
        title={text}
        variant={variant}
        data-testid="field-tooltip"
      >
        <Anchor data-testid="tooltip-anchor">
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

    // TODO get additional props to label, content and prompt
    return (
      <div
        {...omit(OMITTED_PROPS, others)}
        className={this.classes}
        data-testid="cb-label"
      >
        <Box
          as="span"
          data-testid="field-label"
          {...resolveProp(label, 'children')}
          borderless
          paddingless
          trailing={this.renderTrailing()}
          className="label"
        />
        <Box
          className="content"
          as="div"
          borderless
          paddingless
          block
          data-testid="field-content"
        >
          {children}
        </Box>
        <span className="prompt" data-testid="field-prompt">
          {this.renderPrompt()}
        </span>
      </div>
    );
  }
}

Label.propTypes = {
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
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

export default Label;
