import React from 'react';
import { addDecorator } from '@storybook/react';
import { Playground } from '../../src/components/playground';

addDecorator(story => <Playground>{story()}</Playground>);
