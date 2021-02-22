import React from 'react';

import Suggestion from './suggestion';
import generator from '../../../test/data-generator';

export default {
  title: 'Molecules/Suggestion',
  component: Suggestion,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
};

function useDs1() {
  return {
    fetch: async function ds1(query) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([1, 2, 3, 4].map(n => `1) ${query} - ${n}`));
        }, 5000);
      });
    },
  };
}

function useDs2() {
  return {
    fetch: function ds2(query) {
      return [1, 2, 3, 4].map(n => `2) ${query} - ${n}`);
    },
  };
}

function useDs3() {
  return {
    fetch: async function ds2(query) {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject([1, 2, 3, 4].map(n => `2) ${query} - ${n}`));
        }, 500);
      });
    },
  };
}

function useDs4() {
  return {
    fetch: async function ds4(query) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([1, 2, 3, 4].map(n => `4) ${query} - ${n}`));
        }, 2000);
      });
    },
  };
}

const Template = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Suggestion ready to be played around. Try me :)
      </p>
      <Suggestion
        {...args}
        delay={450}
        datasources={[useDs1, useDs2, useDs3, useDs4]}
      />
    </div>
  );
};

export const Playground = Template.bind({});
