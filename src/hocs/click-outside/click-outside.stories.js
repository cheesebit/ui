import React from 'react';

import ClickOutside from './click-outside';
import { Input } from '../../atoms/input';
import { withForwardedRef } from '../with-forwarded-ref';

const InputWithRef = withForwardedRef(Input);

export default {
  title: 'HOCs/ClickOutside',
  component: ClickOutside,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
};

const Template = args => {
  const [isOutside, setOutside] = React.useState(true);

  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Link ready to be played around. Try me :)
      </p>

      <ClickOutside onClickOutside={() => setOutside(true)}>
        {({ ref }) => {
          return (
            <div className="flex flex-col w-64 mx-auto">
              <InputWithRef
                ref={ref}
                className="h-8 border"
                onFocus={() => {
                  setOutside(false);
                }}
                type="text"
              />
              <p>{isOutside ? 'Outside' : 'Inside'}</p>
            </div>
          );
        }}
      </ClickOutside>
    </div>
  );
};

export const Playground = Template.bind({});
