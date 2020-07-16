import React from 'react';
import { shallow, mount } from 'enzyme';

import { Tooltip } from './index';
import { findByTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';
import { prop } from 'ramda';

describe('Tooltip', () => {
  it('renders untouched children if no text/title is provided', () => {
    const props = {
      children: <span>{generator.word()}</span>,
    };

    const wrapper = shallow(<Tooltip {...props} />);
    const component = findByTestAttr(wrapper, 'cb-tooltip');

    expect(component).toHaveLength(0);
    expect(wrapper.contains(props.children)).toBe(true);
  });

  it('renders correctly with text prop', () => {
    const props = {
      text: generator.sentence(),
      children: <span>{generator.word()}</span>,
    };

    const wrapper = shallow(<Tooltip {...props} />);
    const component = wrapper.find('.cb-tooltip');

    expect(component).toHaveLength(1);
    expect(component.prop('aria-label')).toEqual(props.text);
    expect(component.prop('data-title')).toEqual(props.text);
  });

  it("renders correctly with child's title prop", () => {
    const title = generator.sentence();
    const props = {
      children: <span title={title}>{generator.word()}</span>,
    };

    const wrapper = shallow(<Tooltip {...props} />);
    const component = wrapper.find('.cb-tooltip');

    expect(component).toHaveLength(1);
    expect(component.prop('aria-label')).toEqual(title);
    expect(component.prop('data-title')).toEqual(title);
  });

  it("renders prop text as tooltip instead child's title prop", () => {
    const title = generator.sentence();
    const props = {
      text: generator.sentence(),
      children: <span title={title}>{generator.word()}</span>,
    };

    const wrapper = shallow(<Tooltip {...props} />);
    const component = wrapper.find('.cb-tooltip');

    expect(component).toHaveLength(1);
    expect(component.prop('aria-label')).toEqual(props.text);
    expect(component.prop('data-title')).toEqual(props.text);
  });
});
