import { DEFAULT } from '../../src/utils/constants';
import getMatchMediaMock from './matchmedia.mock';

const DEFAULT_WIDTH = 1920;
const DEFAULT_HEIGHT = 978;

const updateMatchMedia = ({ ...options }) => {
  const matchMediaMock = getMatchMediaMock({
    type: 'screen',
    ...options,
  });

  window.matchMedia = matchMediaMock.matchMedia;
};

export default config => {
  const { width = DEFAULT_WIDTH } = config || DEFAULT.OBJECT;

  updateMatchMedia({ width });

  return {
    /**
     * @function
     * Simulates a window resize event, reseting the inner matchMedia mock config.
     * @param {number} width Width to which window should be resized
     * @param {number} height Height to which window should be resized
     */
    resize: (width, height) => {
      const resizeEvent = document.createEvent('Event');
      resizeEvent.initEvent('resize', true, true);

      width = width || DEFAULT_WIDTH;
      height = height || DEFAULT_HEIGHT;

      global.window.innerWidth = width;
      global.window.innerHeight = height;

      updateMatchMedia({ width, height });

      global.window.dispatchEvent(resizeEvent);
    },
  };
};
