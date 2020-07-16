const MockedComponent = `
  function() {
    return '';
  }
`;

module.exports = {
  process() {
    return `module.exports = ${MockedComponent}`;
  },
};
