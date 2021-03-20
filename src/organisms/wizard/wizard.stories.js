import React from 'react';

import generator from '../../../test/data-generator';
import icons from '../../atoms/icon/icon-mapping';
import { keys, capitalize } from '../../common/toolset';
import { Block, Page } from '../../atoms/page';
import { Button } from '../../atoms/button';
import Wizard from './wizard';

export default {
  title: 'Organisms/Wizard',
  component: Wizard,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
};

const generateTableData = () =>
  generator.array(({ index }) => {
    return {
      company: generator.company(),
      id: generator.guid(),
      profession: generator.profession(),
      salary: generator.float({ min: 100, max: 19999, fixed: 2 }),
    };
  }, generator.natural({ min: 2, max: 12 }));

const data = generateTableData();

const today = new Date();
const Template = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Link ready to be played around. Try me :)
      </p>

      <Wizard
        current="step-0"
        title="My Wizard"
        flow={{
          'step-0': {
            on: {
              next: 'step-1',
              skip: 'step-3',
            },
          },
          'step-1': {
            on: {
              previous: 'step-0',
              next: 'step-2',
            },
          },
          'step-2': {
            on: {
              previous: 'step-1',
              next: 'step-3',
            },
          },
          'step-3': {
            on: {
              previous: 'step-1',
            },
          },
        }}
      >
        <Wizard.Step id="step-0">
          {function renderWithCustomTransition({ transition }) {
            return (
              <Page>
                <Page.Header>
                  <h1 className="text-2xl font-semibold">Step 0</h1>
                </Page.Header>
                <Page.Body>
                  <Block>
                    <p>{generator.paragraph()}</p>
                  </Block>
                  <Block>
                    <p>{generator.paragraph()}</p>
                  </Block>
                  <Block>
                    <p>{generator.paragraph()}</p>
                  </Block>
                </Page.Body>
                <Page.Footer>
                  <Button
                    size="medium"
                    emphasis="text"
                    onClick={() => {
                      transition('skip');
                    }}
                  >
                    Go to 3
                  </Button>
                </Page.Footer>
              </Page>
            );
          }}
        </Wizard.Step>
        <Wizard.Step id="step-1">
          <h1 className="text-2xl font-semibold">Step 1</h1>
          <p>{generator.paragraph({ sentences: 5 })}</p>
        </Wizard.Step>

        <Wizard.Step id="step-2">
          <h1 className="text-2xl font-semibold">Step 2</h1>
          <p>{generator.paragraph({ sentences: 5 })}</p>
        </Wizard.Step>

        <Wizard.Step id="step-3">
          {function renderWithCustomTransition({ transition }) {
            return (
              <Page>
                <Page.Header>
                  <h1 className="text-2xl font-semibold">Step 3</h1>
                </Page.Header>
                <Page.Body>
                  <Block>
                    <p>{generator.paragraph()}</p>
                  </Block>
                  <Block>
                    <p>{generator.paragraph()}</p>
                    <p>
                      Click{' '}
                      <Button
                        emphasis="text"
                        paddingless
                        borderless
                        className="h-auto"
                        onClick={() => transition('previous')}
                      >
                        here
                      </Button>{' '}
                      to go to Step 1
                    </p>
                  </Block>
                  <Block>
                    <p>{generator.paragraph()}</p>
                  </Block>
                </Page.Body>
              </Page>
            );
          }}
        </Wizard.Step>
      </Wizard>
    </div>
  );
};

export const Playground = Template.bind({});
