import React from 'react';

import { Label, Variant } from './index';
import { screen, render, getByTestId, userEvent } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Label', () => {
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

    const component = getByTestId('cb-label');

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

  it.only('renders custom trailing correctly', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
      trailing: generator.animal(),
    };

    const { getByTestId, debug } = render(<Label {...props} />);
    debug();
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
