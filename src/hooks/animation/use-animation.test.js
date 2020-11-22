import { renderHook, act } from '@testing-library/react-hooks';
import useAnimation from './use-animation';

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

describe('useAnimation', () => {
  it('returns successfully', () => {
    const { result } = renderHook(() => useAnimation(STATES));

    expect(typeof result.current.transition).toBe('function');
    expect(result.current.current).toBe('out');
    expect(typeof result.current.onEnter).toBe('function');
    expect(typeof result.current.onExit).toBe('function');
    expect(result.current.className).toBe('out');
  });
});
