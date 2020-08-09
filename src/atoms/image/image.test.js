import React from 'react';
import { shallow } from 'enzyme';

import { Status } from './image';
import { Image } from './index';
import { screen, render, getByTestId, userEvent } from '../../../test/helpers';

import { findByTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';

const observe = jest.fn();
const disconnect = jest.fn();

const generateEntries = (amount, intersectingAt) => {
  return generator.array({
    template: ({ index }) => ({
      target: { index },
      isIntersecting: intersectingAt === index,
    }),
    amount,
  });
};

const generateSrc = () =>
  `https://via.placeholder.com/${generator.natural({
    min: 100,
    max: 150,
  })}`;

const generateSrcSet = () =>
  `https://via.placeholder.com/${generator.natural({
    min: 100,
    max: 150,
  })} ${generator.natural({
    min: 400,
    max: 800,
  })}w`;

describe('Image', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      disconnect,
    }));

    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const props = {
      src: generateSrc(),
    };

    const { getByTestId } = render(<Image {...props} />);
    const component = getByTestId('cb-image');

    expect(component).toBeTruthy();
    expect(component).not.toHaveAttribute('src');
  });

  it('ensures that intersection observer is initialized on component mount', () => {
    const props = {
      src: generateSrc(),
    };

    const { getByTestId } = render(<Image {...props} />);
    const component = getByTestId('cb-image');

    expect(component).toBeTruthy();
    expect(observe).toHaveBeenCalled();
  });

  describe('when component is unmounted', () => {
    it('ensures that observer disconnect is called if observer is truthy', () => {
      const props = {
        src: generateSrc(),
      };

      const { unmount } = render(<Image {...props} />);

      unmount();

      expect(disconnect).toHaveBeenCalled();
    });
  });

  // describe('intersection observer callback', () => {
  //   it('skips when current image element is not found amoung the entries', () => {
  //     const props = {
  //       src: generateSrc(),
  //       srcSet: generateSrcSet(),
  //     };

  //     const entries = generateEntries(10);

  //     const wrapper = shallow(<Image {...props} />);
  //     const instance = wrapper.instance();

  //     expect(instance.image.current).toBeNull();

  //     instance.handleIntersection(entries);

  //     expect(instance.image.current).toBeNull();
  //     expect(disconnect).not.toHaveBeenCalled();
  //   });

  //   it('skips when image component has been unmounted', () => {
  //     const props = {
  //       src: generateSrc(),
  //       srcSet: generateSrcSet(),
  //     };

  //     const entries = generateEntries(10, 1);

  //     const wrapper = shallow(<Image {...props} />);
  //     const instance = wrapper.instance();
  //     instance.unmounted = true;

  //     instance.handleIntersection(entries);

  //     expect(instance.image.current).toBeNull();
  //     expect(disconnect).not.toHaveBeenCalled();
  //   });

  //   it('skips when target found is not intersecting', () => {
  //     const props = {
  //       src: generateSrc(),
  //       srcSet: generateSrcSet(),
  //     };

  //     const entries = generateEntries(10);

  //     const wrapper = shallow(<Image {...props} />);
  //     const instance = wrapper.instance();

  //     const random = generator.natural({ min: 5, max: 9 });
  //     instance.image.current = random;

  //     instance.handleIntersection(entries);

  //     expect(disconnect).not.toHaveBeenCalled();
  //   });

  //   it('triggers state change when intersecting change is found', () => {
  //     const props = {
  //       src: generateSrc(),
  //       srcSet: generateSrcSet(),
  //     };

  //     const random = generator.natural({ min: 0, max: 9 });
  //     const entries = generateEntries(10, random);

  //     const wrapper = shallow(<Image {...props} />);
  //     const instance = wrapper.instance();

  //     instance.image.current = entries[random].target;

  //     instance.handleIntersection(entries);

  //     expect(instance.image.current.src).toEqual(props.src);
  //     expect(instance.image.current.srcSet).toEqual(props.srcSet);
  //     expect(disconnect).toHaveBeenCalled();
  //   });
  // });

  // describe('with aspect ratio', () => {
  //   it(`renders correctly with aspect ratio ${AspectRatio['16x9']}`, () => {
  //     const props = {
  //       src: generateSrc(),
  //       options: {
  //         aspectRatio: AspectRatio['16x9'],
  //       },
  //     };

  //     const wrapper = shallow(<Image {...props} />);
  //     const component = findByTestAttr(wrapper, 'cb-image');

  //     expect(component).toHaveLength(1);
  //     expect(component.hasClass(`-ar-${AspectRatio['16x9']}`)).toBe(true);
  //   });

  //   it(`renders correctly with aspect ratio ${AspectRatio['1x1']}`, () => {
  //     const props = {
  //       src: generateSrc(),
  //       options: {
  //         aspectRatio: AspectRatio['1x1'],
  //       },
  //     };

  //     const wrapper = shallow(<Image {...props} />);
  //     const component = findByTestAttr(wrapper, 'cb-image');

  //     expect(component).toHaveLength(1);
  //     expect(component.hasClass(`-ar-${AspectRatio['1x1']}`)).toBe(true);
  //   });

  //   it(`renders correctly with aspect ratio ${AspectRatio['3x2']}`, () => {
  //     const props = {
  //       src: generateSrc(),
  //       options: {
  //         aspectRatio: AspectRatio['3x2'],
  //       },
  //     };

  //     const wrapper = shallow(<Image {...props} />);
  //     const component = findByTestAttr(wrapper, 'cb-image');

  //     expect(component).toHaveLength(1);
  //     expect(component.hasClass(`-ar-${AspectRatio['3x2']}`)).toBe(true);
  //   });

  //   it(`renders correctly with aspect ratio ${AspectRatio['4x3']}`, () => {
  //     const props = {
  //       src: generateSrc(),
  //       options: {
  //         aspectRatio: AspectRatio['4x3'],
  //       },
  //     };

  //     const wrapper = shallow(<Image {...props} />);
  //     const component = findByTestAttr(wrapper, 'cb-image');

  //     expect(component).toHaveLength(1);
  //     expect(component.hasClass(`-ar-${AspectRatio['4x3']}`)).toBe(true);
  //   });

  //   it(`renders correctly with aspect ratio ${AspectRatio['8x5']}`, () => {
  //     const props = {
  //       src: generateSrc(),
  //       options: {
  //         aspectRatio: AspectRatio['8x5'],
  //       },
  //     };

  //     const wrapper = shallow(<Image {...props} />);
  //     const component = findByTestAttr(wrapper, 'cb-image');

  //     expect(component).toHaveLength(1);
  //     expect(component.hasClass(`-ar-${AspectRatio['8x5']}`)).toBe(true);
  //   });

  //   describe('when native onLoad is triggered', () => {
  //     it('skips `handleLoad` if component has been unmounted', () => {
  //       const props = {
  //         src: generateSrc(),
  //         onLoad: jest.fn(),
  //       };

  //       const wrapper = shallow(<Image {...props} />);
  //       const instance = wrapper.instance();

  //       instance.unmounted = true;

  //       instance.handleLoad();

  //       expect(props.onLoad).not.toHaveBeenCalled();
  //       expect(wrapper.state('status')).toBe(Status.idle);
  //     });

  //     it('triggers `handleLoad` if component has not been unmounted', () => {
  //       const props = {
  //         src: generateSrc(),
  //         onLoad: jest.fn(),
  //       };

  //       const wrapper = shallow(<Image {...props} />);
  //       const instance = wrapper.instance();

  //       instance.handleLoad();

  //       expect(props.onLoad).toHaveBeenCalled();
  //       expect(wrapper.state('status')).toBe(Status.loaded);
  //     });
  //   });

  //   describe('when native onError is triggered', () => {
  //     it('skips `handleError` if component has been unmounted', () => {
  //       const props = {
  //         src: generateSrc(),
  //         onError: jest.fn(),
  //       };

  //       const wrapper = shallow(<Image {...props} />);
  //       const instance = wrapper.instance();

  //       instance.unmounted = true;

  //       instance.handleError();

  //       expect(props.onError).not.toHaveBeenCalled();
  //       expect(wrapper.state('status')).toBe(Status.idle);
  //     });

  //     it('triggers `handleError` if component has not been unmounted', () => {
  //       const props = {
  //         src: generateSrc(),
  //         onError: jest.fn(),
  //       };

  //       const wrapper = shallow(<Image {...props} />);
  //       const instance = wrapper.instance();

  //       instance.handleError();

  //       expect(props.onError).toHaveBeenCalled();
  //       expect(wrapper.state('status')).toBe(Status.failed);
  //     });

  //     it('renders error correctly', () => {
  //       const props = {
  //         src: generateSrc(),
  //       };

  //       const wrapper = shallow(<Image {...props} />);
  //       const instance = wrapper.instance();

  //       expect(findByTestAttr(wrapper, 'image-error')).toHaveLength(0);

  //       instance.handleError();

  //       expect(findByTestAttr(wrapper, 'image-error')).toHaveLength(1);
  //     });
  //   });
  // });
});
