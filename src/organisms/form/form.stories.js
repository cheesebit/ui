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

export function Playground() {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Form, <b>still a work in progress</b>, but you can
				play me around. Try me :)
			</p>

			<Form
				initial={ {
					name: generator.name(),
					email: generator.email(),
					age: 18,
					// notifications: generator.pick( [ '0', '1' ] ),
					// 'favorite-character': generator.pick( [ 'mickey', 'shrek' ] ),
					// type: '',
				} }
				schema={ {
					name: [
						'required',
						[ 'string.length.min', 8 ],
						{
							name: 'custom-validator',
							except: function except( { email } ) {
								return isBlank( email );
							},
							handler: function validate( { name } ) {
								return new Promise( ( resolve ) => {
									setTimeout( () => {
										resolve( name === 'Welington Silva' );
									}, 2000 );
								} );
							},
						},
					],
					email: [
						'required',
						[ 'string.length.max', 12 ],
					],
					age: [
						[ 'number.range', 18, 65 ],
						// [ 'number.min', 18 ],
						// [ 'number.max', 65 ],
					],
				} }
			>
				<div className="flex flex-col flex-wrap space-y-4">
					<FormContext.Consumer>
						{ ( { values, status, dispatch } ) => {
							const onChange = ( { target: { name, value } } ) => {
								dispatch( 'field.set', {
									name,
									value,
									validate: true,
								} );
							};

							return (
								<React.Fragment>
									<Form.Field
										label="name"
										className="w-full md:w-auto"
										prompt="Type you first and last name"
										tooltip={ {
											icon: { name: 'help', size: 18 },
											text: (
												<ul className="pl-2 text-left list-disc">
													<li>Required</li>
													<li>Min length 8 characters</li>
													<li>
														Custom async validator that checks if name is
														&lquot;Welington Silva&rquot;, except when the value is empty
													</li>
												</ul>
											),
											placement: 'right',
										} }
										variant={ Array.isArray( status.name ) && 'danger' }
										feedback={
											Array.isArray( status.name ) && {
												icon: { name: 'cancel', size: 18 },
												text: String( status.name ),
												placement: 'right',
											}
										}
									>
										<Input
											variant={ Array.isArray( status.name ) && 'danger' }
											name="name"
											type="text"
											value={ values.name }
											onChange={ onChange }
										/>
									</Form.Field>

									<Form.Field
										label="email"
										className="w-full md:w-auto"
										prompt="Type your email"
										tooltip={ {
											icon: { name: 'help', size: 18 },
											text: (
												<ul className="pl-2 text-left list-disc">
													<li>Required</li>
													<li>
														Custom sync validator that checks if email is
														&lquot;email@email.io&rquot; and name is &lquot;Welington Silva&rquot;
													</li>
												</ul>
											),
											placement: 'right',
										} }
										variant={ Array.isArray( status.email ) && 'danger' }
										feedback={
											Array.isArray( status.email ) && {
												icon: { name: 'cancel', size: 18 },
												text: String( status.email ),
												placement: 'right',
											}
										}
									>
										<Input
											variant={ Array.isArray( status.email ) && 'danger' }
											name="email"
											type="email"
											value={ values.email }
											onChange={ onChange }
										/>
									</Form.Field>

									<Form.Field
										label="age"
										className="w-full md:w-auto"
										prompt="Type your age"
										tooltip={ {
											icon: { name: 'help', size: 18 },
											text: (
												<ul className="pl-2 text-left list-disc">
													<li>Min value 18</li>
													<li>Max value 65</li>

												</ul>
											),
											placement: 'left',
										} }
										variant={ Array.isArray( status.age ) && 'danger' }
										feedback={
											Array.isArray( status.age ) && {
												icon: { name: 'cancel', size: 18 },
												text: String( status.age ),
												placement: 'left',
											}
										}
									>
										<Input
											variant={ Array.isArray( status.age ) && 'danger' }
											name="age"
											type="number"
											value={ values.age }
											onChange={ onChange }
										/>
									</Form.Field>

									{ /* <Form.Field
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
                  </Form.Field> */ }

									<Button
										onClick={ function reset() {
											dispatch( 'reset', {
												name: '',
												email: '',
												notifications: null,
											} );
										} }
									>
										Reset
									</Button>
								</React.Fragment>
							);
						} }
					</FormContext.Consumer>
				</div>
			</Form>
		</div>
	);
}
