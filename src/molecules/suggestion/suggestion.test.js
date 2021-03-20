import React from 'react';
import Suggestion from './suggestion';
import generator from '../../../test/data-generator';
import {
  render,
  fireEvent,
  userEvent,
  waitFor,
  within,
} from '../../../test/helpers';
import { MIN_QUERY_LENGTH } from './use-suggestion';

const TestAdapter = {
  getID: item => item.value,
  getLabel: item => item.label,
};

const DS_1 = generator.array(() => ({
  label: generator.animal(),
  value: generator.id(),
}));

function useDs1() {
  return {
    adapter: TestAdapter,
    fetch: async function ds1({ query }) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            ...DS_1,
            {
              label: query,
              value: query,
            },
          ]);
        }, 50);
      });
    },
  };
}

const DS_2 = generator.array(() => ({
  label: generator.company(),
  value: generator.id(),
}));

function useDs2() {
  return {
    adapter: TestAdapter,
    fetch: function ds2({ query }) {
      return [
        ...DS_2,
        {
          label: query,
          value: query,
        },
      ];
    },
  };
}

const DS_3 = generator.array(() => ({
  label: generator.word(),
  value: generator.id(),
}));

function useDs3() {
  return {
    adapter: TestAdapter,
    fetch: async function ds2({ query }) {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(DS_3);
        }, 50);
      });
    },
  };
}

const DS_4 = generator.array(() => ({
  label: generator.profession(),
  value: generator.id(),
}));

function useDs4() {
  return {
    adapter: TestAdapter,
    fetch: async function ds1({ query }) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            ...DS_4,
            {
              label: query,
              value: query,
            },
          ]);
        }, 50);
      });
    },
  };
}

const setup = ({ ...overrides }) =>
  render(<Suggestion name="test-suggestion" {...overrides} />);

const props = {
  datasources: [useDs1, useDs2, useDs3, useDs4],
};

describe('<Suggestion />', () => {
  it('renders correctly', () => {
    const { getByTestId, queryByTestId } = setup(props);

    getByTestId('cb-input');
    expect(queryByTestId('suggestions-menu')).not.toBeInTheDocument();
  });

  // it('shows loading indicator when user types a query', async () => {
  //   const { getByTestId } = setup(props);
  //   const query = generator.word({
  //     length: generator.natural({ min: MIN_QUERY_LENGTH, max: 10 }),
  //   });

  //   fireEvent.change(getByTestId('cb-input'), { target: { value: query } });
  //   expect(getByTestId('cb-input').value).toBe(String(query));

  //   // await waitFor(() => expect(getByTestId('loading')).toBeInTheDocument());
  // });

  // it('shows options returned by the datasources', async () => {
  //   const { getByTestId, queryByTestId, getAllByTestId } = setup(props);
  //   const query = generator.word({
  //     length: generator.natural({ min: MIN_QUERY_LENGTH, max: 10 }),
  //   });

  //   fireEvent.change(getByTestId('cb-input'), { target: { value: query } });
  //   expect(getByTestId('cb-input').value).toBe(String(query));

  //   // await waitFor(() => expect(getByTestId('loading')).toBeInTheDocument());

  //   await waitFor(() =>
  //     expect(queryByTestId('loading')).not.toBeInTheDocument(),
  //   );

  //   const optionElements = getAllByTestId('suggestion-option');
  //   const DATA = [...DS_1, ...DS_2, ...DS_4];

  //   for (let i = 0; i < DATA.length; i++) {
  //     expect(optionElements[i]).toHaveTextContent(DATA[i].label);
  //   }
  // });

  // it('allows user to navigate through options using key up and key down', async () => {
  //   const { getByTestId, queryByTestId, getAllByTestId } = setup(props);
  //   const query = generator.word({
  //     length: generator.natural({ min: MIN_QUERY_LENGTH, max: 10 }),
  //   });

  //   fireEvent.change(getByTestId('cb-input'), { target: { value: query } });
  //   // await waitFor(() => expect(getByTestId('loading')).toBeInTheDocument());
  //   await waitFor(() =>
  //     expect(queryByTestId('loading')).not.toBeInTheDocument(),
  //   );

  //   const optionElements = getAllByTestId('suggestion-option');
  //   const DATA = [...DS_1, ...DS_2, ...DS_4];

  //   let initialIndex = 0;
  //   let targetIndex = generator.natural({
  //     min: initialIndex + 1,
  //     max: DATA.length - 1,
  //   });

  //   getByTestId('cb-input').focus();

  //   userEvent.tab(); // moves focus to suggestion option

  //   expect(
  //     within(optionElements[initialIndex]).getByRole('radio'),
  //   ).toHaveFocus();

  //   // Navigating using Arrow Down (it could be arrowRight too)
  //   for (let i = initialIndex; i <= targetIndex; i++) {
  //     userEvent.type(
  //       within(optionElements[i]).getByRole('radio'),
  //       '{arrowdown}',
  //     );
  //   }

  //   expect(
  //     within(optionElements[targetIndex]).getByRole('radio'),
  //   ).toHaveFocus();

  //   initialIndex = targetIndex;
  //   targetIndex = generator.natural({ min: 0, max: initialIndex - 1 });

  //   // Navigating using Arrow Up (it could be arrowLeft too)
  //   for (let i = initialIndex; i >= targetIndex; i--) {
  //     userEvent.type(within(optionElements[i]).getByRole('radio'), '{arrowup}');
  //   }

  //   expect(
  //     within(optionElements[targetIndex]).getByRole('radio'),
  //   ).toHaveFocus();
  // });

  // it('show the correct value when user clicks a suggestion option', async () => {
  //   const { getByTestId, getByText, queryByTestId } = setup(props);
  //   const query = generator.word({
  //     length: generator.natural({ min: MIN_QUERY_LENGTH, max: 10 }),
  //   });

  //   fireEvent.change(getByTestId('cb-input'), { target: { value: query } });
  //   expect(getByTestId('cb-input').value).toBe(query);

  //   // await waitFor(() => expect(getByTestId('loading')).toBeInTheDocument());
  //   await waitFor(() =>
  //     expect(queryByTestId('loading')).not.toBeInTheDocument(),
  //   );

  //   const DATA = [...DS_1, ...DS_2, ...DS_4];
  //   const targetIndex = generator.natural({ min: 0, max: DATA.length - 1 });

  //   userEvent.click(getByText(DATA[targetIndex].label));

  //   expect(getByTestId('cb-input').value).toBe(DATA[targetIndex].label);
  // });

  // it('allows user to select an option by hiting key enter', async () => {
  //   const { getByTestId, getAllByTestId, queryByTestId } = setup(props);
  //   const query = generator.word({
  //     length: generator.natural({ min: MIN_QUERY_LENGTH, max: 10 }),
  //   });

  //   fireEvent.change(getByTestId('cb-input'), { target: { value: query } });
  //   expect(getByTestId('cb-input').value).toBe(query);

  //   // await waitFor(() => expect(getByTestId('loading')).toBeInTheDocument());
  //   await waitFor(() =>
  //     expect(queryByTestId('loading')).not.toBeInTheDocument(),
  //   );

  //   const optionElements = getAllByTestId('suggestion-option');

  //   const DATA = [...DS_1, ...DS_2, ...DS_4];
  //   const targetIndex = generator.natural({ min: 1, max: DATA.length - 1 });

  //   userEvent.type(
  //     within(optionElements[targetIndex]).getByRole('radio'),
  //     '{enter}',
  //   );

  //   expect(getByTestId('cb-input').value).toBe(DATA[targetIndex].label);
  // });

  it('keeps the same value as before when use does not select a new suggest option and clicks outside', async () => {
    /**
     * TODO: Write this test.
     * Attemps with React Testing Library failed due to clicking outside or tabbing away from the component did not triggered
     * the click outside hook, which trigger what would be needed for this test.
     *
     * Attemp with Enzyme failed while waiting for the async datasources to run.
     */
  });
});
