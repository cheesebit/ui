export default ({ children, from = 0, to }) => {
  return children({ from, to });
};
