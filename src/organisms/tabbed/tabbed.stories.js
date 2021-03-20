import React from 'react';

import generator from '../../../test/data-generator';
import icons from '../../atoms/icon/icon-mapping';
import { keys, capitalize } from '../../common/toolset';
import Tabbed from './tabbed';

export default {
  title: 'Organisms/Tabbed',
  component: Tabbed,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
};

const today = new Date();
const Template = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Link ready to be played around. Try me :)
      </p>

      <Tabbed
        tabs={[
          {
            id: 'sample-tab-home',
            for: 'sample-tabbed-tab-home',
            label: 'Home',
          },
          {
            id: 'sample-tab-atoms',
            for: 'sample-tabbed-tab-atoms',
            label: 'Atoms',
          },
          {
            id: 'sample-tab-molecules',
            for: 'sample-tabbed-tab-molecules',
            label: 'Molecules',
          },
          {
            id: 'sample-tab-organisms',
            for: 'sample-tabbed-tab-organisms',
            label: 'Organisms',
          },
        ]}
      >
        <Tabbed.Panel id="sample-tabbed-tab-home">
          <h3>Home</h3>
          <p>
            {generator.paragraph({
              sentences: generator.natural({ min: 5, max: 15 }),
            })}
          </p>
        </Tabbed.Panel>
        <Tabbed.Panel id="sample-tabbed-tab-atoms">
          <h3>Atoms</h3>
          <p>
            {generator.paragraph({
              sentences: generator.natural({ min: 5, max: 15 }),
            })}
          </p>
        </Tabbed.Panel>
        <Tabbed.Panel id="sample-tabbed-tab-molecules">
          <h3>Molecules</h3>
          <p>
            {generator.paragraph({
              sentences: generator.natural({ min: 5, max: 15 }),
            })}
          </p>
        </Tabbed.Panel>
        <Tabbed.Panel id="sample-tabbed-tab-organisms">
          <h3>Organisms</h3>
          <p>
            {generator.paragraph({
              sentences: generator.natural({ min: 5, max: 15 }),
            })}
          </p>
        </Tabbed.Panel>
      </Tabbed>
    </div>
  );
};

export const Playground = Template.bind({});