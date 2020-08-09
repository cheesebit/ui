import '@testing-library/jest-dom/extend-expect';

const customRender = (ui, options) =>
  render(ui, { queries: { ...queries }, ...options });

// re-export everything
export * from '@testing-library/react';
// export { fireEvent } from '@testing-library/dom';
export { default as userEvent } from '@testing-library/user-event';

// override render method
// export { customRender as render };
