import React from 'react';

import generator from '../../../test/data-generator';
import Page from './page';
import { Block } from './block';
import { Checkbox } from '../checkbox';

export default {
  title: 'Atoms/Page',
  component: Page,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
};

const Template = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Link ready to be played around. Try me :)
      </p>

      <Page>
        <Page.Header>
          <h1 className="text-2xl font-semibold">
            {generator.sentence({ words: 5 })}
          </h1>
        </Page.Header>
        <Page.Body>
          <Block main>
            <p>
              This is the main block. Notice how its borders are a little darker
              than a regular block.
            </p>
          </Block>
          <Block borderless>
            <p>{generator.paragraph()}</p>
          </Block>
          <Block borderless={['bottom']}>
            <p>{generator.paragraph()}</p>
            <p>{generator.paragraph()}</p>
            <p>{generator.paragraph()}</p>
          </Block>
          <Block>
            <p>This is just a regular block</p>
          </Block>
          <Block paddingless="vertical">
            <Checkbox
              aria-labelledby="checkbox-label answer-1"
              name="checkbox-generic"
              value="1"
            >
              I agree with the terms.
            </Checkbox>
          </Block>
        </Page.Body>
      </Page>
    </div>
  );
};

export const Playground = Template.bind({});
