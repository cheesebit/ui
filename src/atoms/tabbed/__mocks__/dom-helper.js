export default {
  check: jest.fn(() => true),
  getActiveTab: attrs => ({
    ...attrs,
    style: {
      left: 0,
      width: 0,
    },
    matches() {
      return false;
    },
  }),
  getActiveIndicator: attrs => ({
    ...attrs,
    style: {
      left: 0,
      width: 0,
    },
    matches() {},
  }),
};
