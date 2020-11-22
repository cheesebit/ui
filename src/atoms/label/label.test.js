import React from 'react';

import { Label, Variant } from './index';
import Selectors, {
  DEFAULT_FEEDBACK,
  DEFAULT_TOOLTIP,
} from './label.selectors';
import { screen, render, getByTestId, userEvent } from '../../../test/helpers';
import generator from '../../../test/data-generator';
import { Mode, Placement } from '../tooltip';

describe('<Label />', () => {
  it('renders correctly', () => {
    const props = { label: generator.word(), children: generator.word() };

    const { getByTestId } = render(<Label {...props} />);

    const component = getByTestId('cb-label');
    const label = getByTestId('field-label');
    const content = getByTestId('field-content');
    const prompt = getByTestId('field-prompt');

    expect(component).toBeTruthy();
    expect(label).toBeTruthy();
    expect(content).toBeTruthy();
    expect(prompt).toBeTruthy();
  });

  it('renders label correctly', () => {
    const props = { label: generator.word(), children: generator.word() };

    render(<Label {...props} />);

    const component = screen.getByTestId('cb-label');
    const label = getByTestId(component, 'field-label');

    expect(label).toHaveTextContent(props.label);
  });

  it('renders prompt correctly', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
      prompt: generator.sentence(),
    };

    const { getByTestId } = render(<Label {...props} />);

    const prompt = getByTestId('field-prompt');

    expect(prompt).toHaveTextContent(props.prompt);
  });

  it('renders content correctly', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
    };

    const { getByTestId } = render(<Label {...props} />);

    const component = getByTestId('cb-label');

    expect(component).toHaveTextContent(props.children);
  });

  it('renders tooltip correctly', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
      trailing: null,
      tooltip: {
        icon: 'help',
        text: generator.sentence(),
      },
    };

    const { getByTestId } = render(<Label {...props} />);

    const tooltip = getByTestId('cb-tooltip');
    const anchor = getByTestId('tooltip-anchor');

    userEvent.hover(anchor);

    expect(tooltip).toHaveTextContent(props.tooltip.text);
  });

  it('renders feedback correctly', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
      feedback: {
        icon: 'help',
        text: generator.sentence(),
      },
    };

    const { getByTestId, getByLabelText } = render(<Label {...props} />);

    const prompt = getByTestId('field-prompt');
    const icon = getByLabelText(props.feedback.icon);

    expect(icon).toBeInTheDocument();
    expect(prompt).toHaveTextContent(props.feedback.text);
  });

  it('renders empty prompt when no feedback text is provided', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
      feedback: {
        icon: 'help',
      },
    };

    const { getByTestId, getByLabelText } = render(<Label {...props} />);

    const prompt = getByTestId('field-prompt');
    const icon = getByLabelText(props.feedback.icon);

    expect(icon).toBeInTheDocument();
    expect(prompt).toBeEmptyDOMElement();
  });

  it('overrides tooltip when feedback prop is provided', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
      prompt: generator.sentence(),
      tooltip: {
        icon: 'help',
        text: generator.sentence(),
      },
    };

    const { getByTestId, getByLabelText, rerender } = render(
      <Label {...props} />,
    );

    const prompt = getByTestId('field-prompt');
    const tooltip = getByTestId('cb-tooltip');
    let icon = getByLabelText(props.tooltip.icon);

    expect(prompt).toHaveTextContent(props.prompt);
    expect(tooltip).toHaveTextContent(props.tooltip.text);
    expect(icon).toBeInTheDocument();

    const addedProps = {
      feedback: {
        icon: 'search',
        text: generator.sentence(),
      },
    };

    rerender(<Label {...props} {...addedProps} />);

    icon = getByLabelText(addedProps.feedback.icon);

    expect(prompt).toHaveTextContent(addedProps.feedback.text);
    expect(tooltip).toHaveTextContent(addedProps.feedback.text);
    expect(icon).toBeInTheDocument();
  });

  it('shows tooltip when feedback prop is cleaned', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
      prompt: generator.sentence(),
      tooltip: {
        icon: 'help',
        text: generator.sentence(),
      },
      feedback: {
        icon: 'search',
        text: generator.sentence(),
      },
    };

    const { getByTestId, getByLabelText, rerender } = render(
      <Label {...props} />,
    );

    const prompt = getByTestId('field-prompt');
    const tooltip = getByTestId('cb-tooltip');
    let icon = getByLabelText(props.feedback.icon);

    expect(prompt).toHaveTextContent(props.feedback.text);
    expect(tooltip).toHaveTextContent(props.feedback.text);
    expect(icon).toBeInTheDocument();

    const addedProps = {
      feedback: {},
    };

    rerender(<Label {...props} {...addedProps} />);

    icon = getByLabelText(props.tooltip.icon);

    expect(prompt).toHaveTextContent(props.prompt);
    expect(tooltip).toHaveTextContent(props.tooltip.text);
    expect(icon).toBeInTheDocument();
  });

  it('renders custom trailing correctly', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
      trailing: generator.animal(),
    };

    const { getByTestId, debug } = render(<Label {...props} />);

    const content = getByTestId('field-label');

    expect(content).toHaveTextContent(props.trailing);
  });

  describe('with variant', () => {
    it(`renders correctly with variant ${Variant.danger}`, () => {
      const props = {
        label: generator.word(),
        children: generator.word(),
        variant: Variant.danger,
      };

      const { getByTestId } = render(<Label {...props} />);

      const component = getByTestId('cb-label');
      expect(component).toHaveClass('-danger');
    });

    it(`renders correctly with variant ${Variant.info}`, () => {
      const props = {
        label: generator.word(),
        children: generator.word(),
        variant: Variant.info,
      };

      const { getByTestId } = render(<Label {...props} />);

      const component = getByTestId('cb-label');
      expect(component).toHaveClass('-info');
    });

    it(`renders correctly with variant ${Variant.success}`, () => {
      const props = {
        label: generator.word(),
        children: generator.word(),
        variant: Variant.success,
      };

      const { getByTestId } = render(<Label {...props} />);

      const component = getByTestId('cb-label');
      expect(component).toHaveClass('-success');
    });

    it(`renders correctly with variant ${Variant.warn}`, () => {
      const props = {
        label: generator.word(),
        children: generator.word(),
        variant: Variant.warn,
      };

      const { getByTestId } = render(<Label {...props} />);

      const component = getByTestId('cb-label');
      expect(component).toHaveClass('-warn');
    });
  });
});

describe('Label Selectors', () => {
  it('retrieves empty feedback prop correctly', () => {
    const props = {
      feedback: {},
    };

    expect(Selectors.getFeedback(props)).toEqual({});
  });

  it('retrieves default feedback merged with prop correctly', () => {
    const props = {
      feedback: {
        text: generator.sentence(),
      },
    };

    expect(Selectors.getFeedback(props)).toEqual({
      ...DEFAULT_FEEDBACK,
      ...props.feedback,
    });
  });

  it('retrieves feedback prop correctly', () => {
    const props = {
      feedback: {
        mode: Mode.light,
        position: Placement.right,
        text: generator.sentence(),
      },
    };

    expect(Selectors.getFeedback(props)).toEqual(props.feedback);
  });

  it('retrieves empty tooltip prop correctly', () => {
    const props = {
      tooltip: {},
    };

    expect(Selectors.getTooltip(props)).toEqual({});
  });

  it('retrieves default tooltip merged with prop correctly', () => {
    const props = {
      tooltip: {
        text: generator.sentence(),
      },
    };

    expect(Selectors.getTooltip(props)).toEqual({
      ...DEFAULT_TOOLTIP,
      ...props.tooltip,
    });
  });

  it('retrieves tooltip prop correctly', () => {
    const props = {
      tooltip: {
        mode: Mode.light,
        position: Placement.right,
        text: generator.sentence(),
      },
    };

    expect(Selectors.getTooltip(props)).toEqual(props.tooltip);
  });

  it('retrieves prompt prop correctly', () => {});
});
