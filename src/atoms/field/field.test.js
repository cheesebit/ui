import React from 'react';
import { mount, shallow } from 'enzyme';

import { Field, Variant } from './index';
import { findByTestAttr, asTestAttr } from '../../../test/helpers';
import { Icon } from '../icon';
import generator from '../../../test/data-generator';

describe('Field', () => {
  it('renders correctly', () => {
    const props = { label: generator.word(), children: generator.word() };

    const wrapper = shallow(<Field {...props} />);
    const component = findByTestAttr(wrapper, 'cb-field');

    expect(component).toHaveLength(1);
    expect(component.contains(props.children)).toBe(true);
    expect(component.find('.label')).toHaveLength(1);
    expect(component.find('.content')).toHaveLength(1);
    expect(component.find('.prompt')).toHaveLength(1);
  });

  it('renders label correctly', () => {
    const props = { label: generator.word(), children: generator.word() };

    const wrapper = shallow(<Field {...props} />);
    const component = findByTestAttr(wrapper, 'cb-field');
    const label = component.find('.label');

    expect(label.text()).toEqual(props.label);
  });

  it('renders prompt correctly', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
      prompt: generator.sentence(),
    };

    const wrapper = shallow(<Field {...props} />);
    const component = findByTestAttr(wrapper, 'cb-field');
    const label = component.find('.label');

    expect(label.text()).toEqual(props.label);
  });

  it('renders content correctly', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
    };

    const wrapper = shallow(<Field {...props} />);
    const component = findByTestAttr(wrapper, 'cb-field');
    const content = findByTestAttr(component, 'field-content').dive();

    expect(content.contains(props.children)).toBe(true);
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

    const wrapper = shallow(<Field {...props} />);
    const component = findByTestAttr(wrapper, 'cb-field');
    const content = findByTestAttr(component, 'field-content').dive();
    const tooltip = findByTestAttr(content, 'field-tooltip');

    expect(tooltip.prop('text')).toEqual(props.tooltip.text);
    expect(tooltip.contains(<Icon size={12} name={props.tooltip.icon} />)).toBe(
      true,
    );
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

    const wrapper = shallow(<Field {...props} />);
    const component = findByTestAttr(wrapper, 'cb-field');
    const content = findByTestAttr(component, 'field-content').dive();
    const tooltip = findByTestAttr(content, 'field-tooltip');

    const prompt = findByTestAttr(component, 'field-prompt');

    expect(
      tooltip.contains(<Icon size={12} name={props.feedback.icon} />),
    ).toBe(true);
    expect(prompt.text()).toEqual(props.feedback.text);
  });

  it('renders empty prompt when no feedback text is provided', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
      feedback: {
        icon: 'help',
      },
    };

    const wrapper = shallow(<Field {...props} />);
    const component = findByTestAttr(wrapper, 'cb-field');
    const content = findByTestAttr(component, 'field-content').dive();
    const tooltip = findByTestAttr(content, 'field-tooltip');

    const prompt = findByTestAttr(component, 'field-prompt');

    expect(
      tooltip.contains(<Icon size={12} name={props.feedback.icon} />),
    ).toBe(true);
    expect(prompt.text()).toEqual('');
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

    const wrapper = mount(<Field {...props} />);

    expect(findByTestAttr(wrapper, 'field-prompt').text()).toEqual(
      props.prompt,
    );
    expect(findByTestAttr(wrapper, 'field-tooltip').prop('text')).toEqual(
      props.tooltip.text,
    );
    expect(
      wrapper
        .find(`span${asTestAttr('tooltip-anchor')}`)
        .contains(<Icon size={12} name={props.tooltip.icon} />),
    ).toBe(true);

    const addedProps = {
      feedback: {
        icon: 'search',
        text: generator.sentence(),
      },
    };

    wrapper.setProps(addedProps);

    expect(findByTestAttr(wrapper, 'field-prompt').text()).toEqual(
      addedProps.feedback.text,
    );
    expect(findByTestAttr(wrapper, 'field-tooltip').prop('text')).toEqual(
      addedProps.feedback.text,
    );
    expect(
      wrapper
        .find(`span${asTestAttr('tooltip-anchor')}`)
        .contains(<Icon size={12} name={addedProps.feedback.icon} />),
    ).toBe(true);
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

    const wrapper = mount(<Field {...props} />);

    expect(findByTestAttr(wrapper, 'field-prompt').text()).toEqual(
      props.feedback.text,
    );
    expect(findByTestAttr(wrapper, 'field-tooltip').prop('text')).toEqual(
      props.feedback.text,
    );
    expect(
      wrapper
        .find(`span${asTestAttr('tooltip-anchor')}`)
        .contains(<Icon size={12} name={props.feedback.icon} />),
    ).toBe(true);

    const addedProps = {
      feedback: {},
    };

    wrapper.setProps(addedProps);

    expect(findByTestAttr(wrapper, 'field-prompt').text()).toEqual(
      props.prompt,
    );
    expect(findByTestAttr(wrapper, 'field-tooltip').prop('text')).toEqual(
      props.tooltip.text,
    );
    expect(
      wrapper
        .find(`span${asTestAttr('tooltip-anchor')}`)
        .contains(<Icon size={12} name={props.tooltip.icon} />),
    ).toBe(true);
  });

  it('renders custom trailing correctly', () => {
    const props = {
      label: generator.word(),
      children: generator.word(),
      trailing: generator.animal(),
    };

    const wrapper = shallow(<Field {...props} />);
    const component = findByTestAttr(wrapper, 'cb-field');
    const content = findByTestAttr(component, 'field-content').dive();

    expect(content.find('.trailing').text()).toEqual(props.trailing);
  });

  describe('with variant', () => {
    it(`renders correctly with variant ${Variant.danger}`, () => {
      const props = {
        label: generator.word(),
        children: generator.word(),
        variant: Variant.danger,
      };

      const wrapper = shallow(<Field {...props} />);
      const component = findByTestAttr(wrapper, 'cb-field');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-danger')).toBe(true);
    });

    it(`renders correctly with variant ${Variant.info}`, () => {
      const props = {
        label: generator.word(),
        children: generator.word(),
        variant: Variant.info,
      };

      const wrapper = shallow(<Field {...props} />);
      const component = findByTestAttr(wrapper, 'cb-field');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-info')).toBe(true);
    });

    it(`renders correctly with variant ${Variant.success}`, () => {
      const props = {
        label: generator.word(),
        children: generator.word(),
        variant: Variant.success,
      };

      const wrapper = shallow(<Field {...props} />);
      const component = findByTestAttr(wrapper, 'cb-field');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-success')).toBe(true);
    });

    it(`renders correctly with variant ${Variant.warn}`, () => {
      const props = {
        label: generator.word(),
        children: generator.word(),
        variant: Variant.warn,
      };

      const wrapper = shallow(<Field {...props} />);
      const component = findByTestAttr(wrapper, 'cb-field');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-warn')).toBe(true);
    });
  });
});
