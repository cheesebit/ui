export function useAutomaton(flow, current) {
  return {
    current,
    transition: jest.fn(),
  };
}
