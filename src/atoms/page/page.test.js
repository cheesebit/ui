import React from 'react';
import { shallow } from 'enzyme';

import { Page } from './index';

import { findByTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Page', () => {
  it('renders correctly', () => {
    const props = {
      children: generator.word(),
    };

    const wrapper = shallow(<Page {...props} />);
    const component = findByTestAttr(wrapper, 'cb-page');

    expect(component).toHaveLength(1);
    expect(component.text()).toContain(props.children);
  });

  it('renders header correctly', () => {
    const headerProps = {
      children: generator.sentence(),
    };

    const props = {
      children: (
        <React.Fragment>
          <Page.Header {...headerProps} />
        </React.Fragment>
      ),
    };

    const wrapper = shallow(<Page {...props} />);
    const component = findByTestAttr(wrapper, 'cb-page');

    expect(component).toHaveLength(1);
    expect(wrapper.find(Page.Header)).toHaveLength(1);
  });

  it('renders body correctly', () => {
    const bodyProps = {
      children: generator.sentence(),
    };

    const props = {
      children: (
        <React.Fragment>
          <Page.Body {...bodyProps} />
        </React.Fragment>
      ),
    };

    const wrapper = shallow(<Page {...props} />);
    const component = findByTestAttr(wrapper, 'cb-page');

    expect(component).toHaveLength(1);
    expect(wrapper.find(Page.Body)).toHaveLength(1);
  });

  it('renders header content correctly', () => {
    const props = {
      children: generator.sentence(),
    };

    const wrapper = shallow(<Page.Header {...props} />);
    const component = findByTestAttr(wrapper, 'page-header');

    expect(component).toHaveLength(1);
    expect(component.text()).toContain(props.children);
  });

  it('renders body content correctly', () => {
    const props = {
      children: generator.sentence(),
    };

    const wrapper = shallow(<Page.Body {...props} />);
    const component = findByTestAttr(wrapper, 'page-body');

    expect(component).toHaveLength(1);
    expect(component.text()).toContain(props.children);
  });
});
