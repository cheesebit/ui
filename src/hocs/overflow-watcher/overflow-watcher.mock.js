export default jest.mock('./overflow-watcher', ({ children, from = 0, to }) => {
  return children({ from, to });
});
