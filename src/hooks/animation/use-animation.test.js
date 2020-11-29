import { renderHook, act } from '@testing-library/react-hooks';
import useAnimation from './use-animation';
import generator from '../../../test/data-generator';

const STATES = {
  out: {
    on: {
      enter: 'in',
    },
  },
  in: {
    on: {
      exit: 'out',
    },
  },
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const CLASSES = {
  out: generator.word(),
  in: generator.word(),
};

describe('useAnimation', () => {
  it('returns successfully', () => {
    const current = 'out';
    const { result } = renderHook(() => useAnimation(STATES, CLASSES, current));

    expect(typeof result.current.transition).toBe('function');
    expect(result.current.current).toBe('out');
    expect(typeof result.current.onEnter).toBe('function');
    expect(typeof result.current.onExit).toBe('function');
    expect(result.current.className).toBe(CLASSES[current]);
  });

  it('runs oneEnter/onExit successfully', async () => {
    const { result } = renderHook(() => useAnimation(STATES, CLASSES));

    expect(result.current.className).toBe(CLASSES.out);

    act(() => {
      result.current.onEnter();
    });

    await act(() => sleep(250));

    expect(result.current.className).toBe(CLASSES.in);

    act(() => {
      result.current.onExit();
    });

    await act(() => sleep(1000));

    expect(result.current.className).toBe(CLASSES.out);
  });
});
