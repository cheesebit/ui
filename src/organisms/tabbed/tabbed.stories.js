import React from 'react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';

import { capitalize } from '../../utils/utilities';
import { Tabbed } from './index';
import { NotificationBadge } from '../../atoms/badge';
import generator from '../../../test/data-generator';

export default {
  title: 'Components/Tabbed',
  component: Tabbed,
  parameters: {
    props: `{
      active: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
      onChange: PropTypes.func,
      tabs: PropTypes.arrayOf(
        PropTypes.shape({
          for: IDPropType.isRequired,
          props: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
          label: RenderablePropType,
        }),
      ).isRequired,
    }`,
  },
  decorators: [withKnobs, withA11y],
};

const generateTabs = (options = { min: 2, max: 5 }) =>
  generator.array({
    template: () => {
      return {
        for: generator.id(),
        label: capitalize(generator.word({ length: 10 })),
      };
    },
    amount: generator.natural(options),
  });

export const generic = () => {
  const tabs = generateTabs();

  return (
    <Tabbed onChange={action('generic')} tabs={tabs}>
      {tabs.map(tab => (
        <Tabbed.Panel key={tab.for} id={tab.for}>
          <h1>{tab.label}</h1>
          <p>{generator.paragraph()}</p>
        </Tabbed.Panel>
      ))}
    </Tabbed>
  );
};

export const withItemProps = () => (
  <Tabbed
    onChange={action('with-item-props')}
    tabs={[
      {
        for: 'panel-#21',
        label: 'Panel 1',
        props: { style: { color: 'red' } },
      },
      {
        for: 'panel-#22',
        label: 'Panel 2',
        props: ({ active }) => ({
          style: { color: active ? '#000' : '#ccc' },
          disabled: true,
        }),
      },
    ]}
  >
    <Tabbed.Panel id="panel-#21">
      {generator.paragraph({
        sentences: generator.natural({ min: 10, max: 15 }),
      })}
    </Tabbed.Panel>
    <Tabbed.Panel id="panel-#22">
      {generator.paragraph({
        sentences: generator.natural({ min: 10, max: 15 }),
      })}
    </Tabbed.Panel>
  </Tabbed>
);

export const withOverflow = () => {
  const tabs = generateTabs({ min: 15, max: 25 });

  return (
    <Tabbed tabs={tabs}>
      {tabs.map(tab => (
        <Tabbed.Panel key={tab.for} id={tab.for}>
          <h1>{tab.label}</h1>
          <p>
            {generator.paragraph({
              sentences: generator.natural({ min: 5, max: 15 }),
            })}
          </p>
        </Tabbed.Panel>
      ))}
    </Tabbed>
  );
};

export const withNotification = () => {
  return (
    <Tabbed
      onChange={action('with-notification')}
      tabs={[
        {
          for: 'panel-#11',
          label: 'Panel 1',
        },
        {
          for: 'panel-#12',
          label: () => (
            <React.Fragment>
              Panel 2
              <NotificationBadge
                position={NotificationBadge.POSITION.TOP_RIGHT}
                style={{
                  top: 6,
                  right: -6,
                }}
              />
            </React.Fragment>
          ),
        },
        {
          for: 'panel-#13',
          label: 'Panel 3',
        },
      ]}
    >
      <Tabbed.Panel id="panel-#11">
        {generator.paragraph({
          sentences: generator.natural({ min: 5, max: 15 }),
        })}
      </Tabbed.Panel>
      <Tabbed.Panel id="panel-#12">
        {generator.paragraph({
          sentences: generator.natural({ min: 5, max: 15 }),
        })}
      </Tabbed.Panel>
      <Tabbed.Panel id="panel-#13">
        {generator.paragraph({
          sentences: generator.natural({ min: 5, max: 15 }),
        })}
      </Tabbed.Panel>
    </Tabbed>
  );
};
