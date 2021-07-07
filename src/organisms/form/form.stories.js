import React from 'react';

// import { Checkbox } from '../../atoms/checkbox';
// import { Icon } from 'atoms/icon';
// import { Radio } from '../../atoms/radio';
// import { Select } from '../../molecules/select';
import { Button } from 'atoms/button';
import { Input } from 'atoms/input';
import { isBlank } from 'common/toolset';
import generator from 'test/data-generator';
import Form from './form';

export default {
  title: 'Components/Organisms/Form',
  component: Form,
};

const FormContext = Form.Context;

const today = new Date();

export function Playground() {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Form, <b>still a work in progress</b>, but you can
        play me around. Try me :)
      </p>

      <Form
        initial={{
          name: generator.name(),
          email: generator.email(),
          notifications: generator.pick(['0', '1']),
          'favorite-character': generator.pick(['mickey', 'shrek']),
          type: '',
        }}
        schema={{
          name: [
            'required',
            ['string.length.min', 8],
            {
              name: 'custom-validator',
              except: function except({ email }) {
                return isBlank(email);
              },
              handler: function validate({ name }) {
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve(name === 'Welington Silva');
                  }, 5000);
                });
              },
            },
          ],
          email: [
            'required',
            {
              name: 'custom-validator-2',
              handler: function validate({ name, email }) {
                return name === 'Welington Silva' && email === 'email@email.io';
              },
            },
          ],
        }}
      >
        <div className="flex flex-col flex-wrap space-y-4">
          <FormContext.Consumer>
            {({ values, status, dispatch }) => {
              const onChange = ({ target: { name, value } }) => {
                dispatch('field.set', {
                  name,
                  value,
                  validate: true,
                });
              };

              return (
                <React.Fragment>
                  <Form.Field
                    label="name"
                    className="w-full md:w-auto"
                    prompt="Type you first and last name"
                    tooltip={{
                      icon: { name: 'help', size: 18 },
                      text: (
                        <ul className="pl-2 text-left list-disc">
                          <li>Required</li>
                          <li>Min length 8 characters</li>
                          <li>
                            Custom async validator that checks if name is
                            "Welington Silva", except when the value is empty
                          </li>
                        </ul>
                      ),
                      placement: 'right',
                    }}
                    variant={status.name && 'danger'}
                    feedback={
                      status.name && {
                        icon: { name: 'cancel', size: 18 },
                        text: String(status.name),
                        placement: 'right',
                      }
                    }
                  >
                    <Input
                      variant={status.name && 'danger'}
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={onChange}
                    />
                    {/* <Button
                      emphasis="text"
                      onClick={function clear() {
                        const field = 'name';

                        dispatch('field.set', {
                          id: field,
                          name: field,
                          value: '',
                        });
                      }}
                    >
                      <Icon name="close" className="mx-auto" />
                    </Button> */}
                  </Form.Field>

                  <Form.Field
                    label="email"
                    className="w-full md:w-auto"
                    prompt="Type your email"
                    tooltip={{
                      icon: { name: 'help', size: 18 },
                      text: (
                        <ul className="pl-2 text-left list-disc">
                          <li>Required</li>
                          <li>
                            Custom sync validator that checks if email is
                            "email@email.io" and name is "Welington Silva"
                          </li>
                        </ul>
                      ),
                      placement: 'right',
                    }}
                    variant={status.email && 'danger'}
                    feedback={
                      status.email && {
                        icon: { name: 'cancel', size: 18 },
                        text: String(status.email),
                        placement: 'right',
                      }
                    }
                  >
                    <Input
                      variant={status.email && 'danger'}
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={onChange}
                    />
                  </Form.Field>

                  {/* <Form.Field
                    label="favorite character"
                    className="w-full md:w-auto"
                    prompt="Favorite character"
                  >
                    <Select
                      placeholder="Pick your favority character"
                      options={[
                        {
                          label: 'Mickey Mouse',
                          value: 'mickey',
                        },
                        {
                          label: 'Shrek',
                          value: 'shrek',
                        },
                      ]}
                      name="favorite-character"
                      onChange={onChange}
                      unroll="right"
                    />
                  </Form.Field>

                  <Form.Field
                    label={{
                      children: 'notifications',
                      id: 'notifications-label',
                    }}
                    className="flex flex-col w-full md:w-auto"
                    prompt="We will not spam you"
                  >
                    <Radio
                      aria-labelledby="notifications-label"
                      name="notifications"
                      value="1"
                      checked={values.notifications == '1'}
                      onChange={onChange}
                    >
                      Yes
                    </Radio>

                    <Radio
                      aria-labelledby="notifications-label"
                      name="notifications"
                      value="0"
                      checked={values.notifications == '0'}
                      onChange={onChange}
                    >
                      No
                    </Radio>
                  </Form.Field>

                  <Form.Field
                    label={{ children: 'type', id: 'type-label' }}
                    className="flex flex-col w-full md:w-auto"
                    tooltip={{
                      icon: { name: 'help', size: 18 },
                      text: 'We are cool like that',
                      placement: 'right',
                    }}
                    onChange={e => {
                      console.log(e.target);
                    }}
                  >
                    <Checkbox
                      aria-labelledby="type-label"
                      name="type"
                      value="1"
                    >
                      About sales
                    </Checkbox>

                    <Checkbox
                      aria-labelledby="type-label"
                      name="type"
                      value="0"
                    >
                      About travel tips
                    </Checkbox>
                  </Form.Field> */}

                  <Button
                    onClick={function reset() {
                      dispatch('reset', {
                        name: '',
                        email: '',
                        notifications: null,
                      });
                    }}
                  >
                    Reset
                  </Button>
                </React.Fragment>
              );
            }}
          </FormContext.Consumer>
        </div>
      </Form>
    </div>
  );
}
