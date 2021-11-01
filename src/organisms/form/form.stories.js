import React from 'react';

import { Button } from 'atoms/button';
import { Checkbox } from 'atoms/checkbox';
import { Icon } from 'atoms/icon';
import { Input } from 'atoms/input';
import { Label } from 'atoms/label';
import { Radio } from 'atoms/radio';
import { Select } from 'molecules/select';
import { Tooltip } from 'atoms/tooltip';
import { toVariant, getFieldProperties } from './form.helpers';
import Form from './form';
import generator from 'test/data-generator';

export default {
	title: 'Components/Organisms/Form',
	component: Form,
};

const FormContext = Form.Context;

export function Playground() {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Form, <b>still a work in progress</b>, but
				you can play me around. Try me :)
			</p>

			<Form
				initial={{
					name: generator.name(),
					email: generator.email(),
					age: 18,
				}}
				schema={{
					name: [
						'required',
						['string.length.min', 8],
						{
							name: 'custom-validator',
							handler: function validate({ name }) {
								return new Promise((resolve) => {
									setTimeout(() => {
										resolve(name === 'Welington Silva');
									}, 2000);
								});
							},
						},
					],
					email: ['required', ['string.length.max', 12]],
					age: [['number.range', 18, 65]],
				}}
			>
				<FormContext.Consumer>
					{({ values, status, dispatch }) => {
						const onChange = ({ target: { name, value } }) => {
							dispatch({
								type: 'field.set',
								payload: {
									name,
									value,
									validate: true,
								},
							});
						};

						return (
							<React.Fragment>
								<Form.Field
									required
									label={
										<Label
											trailing={
												<Tooltip
													text={
														<ul className="pl-2 text-left list-disc">
															<li>
																Min length 8
																characters
															</li>
															<li>
																Custom async
																validator that
																checks if name
																is "Welington
																Silva"
															</li>
														</ul>
													}
												>
													<Icon
														name="help"
														size={18}
													/>
												</Tooltip>
											}
										>
											Name
										</Label>
									}
									className="w-full md:w-auto"
									prompt="Type you first and last name"
									{...getFieldProperties(status.name)}
								>
									<Input
										variant={toVariant(status.name)}
										name="name"
										type="text"
										value={values.name}
										onChange={onChange}
										trailing={<span>&spades;</span>}
									/>
								</Form.Field>

								<Form.Field
									required
									label={
										<Label
											trailing={
												<Tooltip
													text={
														<ul className="pl-2 text-left list-disc">
															<li>
																Custom{' '}
																<b>
																	sync
																	validator
																</b>{' '}
																that checks if
																email is
																"email@email.io"
																and name is
																"Welington
																Silva"
															</li>
														</ul>
													}
												>
													<Icon
														name="help"
														size={18}
													/>
												</Tooltip>
											}
										>
											Email
										</Label>
									}
									className="w-full md:w-auto"
									prompt="Type your email"
									{...getFieldProperties(status.email)}
								>
									<Input
										variant={toVariant(status.email)}
										name="email"
										type="email"
										value={values.email}
										onChange={onChange}
									/>
								</Form.Field>

								<Form.Field
									label={
										<Label
											trailing={
												<Tooltip
													text={
														<ul className="pl-2 text-left list-disc">
															<li>
																Min value{' '}
																<i>18</i>
															</li>
															<li>
																Max value{' '}
																<i>65</i>
															</li>
														</ul>
													}
												>
													<Icon
														name="help"
														size={18}
													/>
												</Tooltip>
											}
										>
											Age
										</Label>
									}
									className="w-full md:w-auto"
									prompt="Type your age"
									{...getFieldProperties(status.age)}
								>
									<Input
										variant={toVariant(status.age)}
										name="age"
										type="number"
										value={values.age}
										onChange={onChange}
									/>
								</Form.Field>

								<Form.Field
									label={<Label>Favorite character</Label>}
									className="w-full md:w-auto"
									{...getFieldProperties(
										status['favorite-character']
									)}
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
									/>
								</Form.Field>

								<Form.Field
									label={
										<Label id="notifications-label">
											Notification
										</Label>
									}
									className="flex flex-col w-full md:w-auto"
									prompt="We will not spam you"
									{...getFieldProperties(
										status.notifications
									)}
								>
									<div
										aria-role="none"
										className="flex space-x-4"
									>
										<Radio
											aria-labelledby="notifications-label"
											name="notifications"
											value="1"
											checked={
												values.notifications == '1'
											}
											onChange={onChange}
										>
											Yes
										</Radio>

										<Radio
											aria-labelledby="notifications-label"
											name="notifications"
											value="0"
											checked={
												values.notifications == '0'
											}
											onChange={onChange}
										>
											No
										</Radio>
									</div>
								</Form.Field>

								<Form.Field
									label={
										<Label
											trailing={
												<Tooltip text="We are cool like that">
													<Icon
														name="help"
														size={18}
													/>
												</Tooltip>
											}
										>
											Type
										</Label>
									}
									className="flex flex-col w-full md:w-auto"
									// @ts-ignore
									onChange={onChange}
									{...getFieldProperties(status.type)}
								>
									<div
										aria-role="none"
										className="flex space-x-4"
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
									</div>
								</Form.Field>

								<Button
									onClick={function reset() {
										dispatch({
											type: 'reset',
											payload: {
												name: '',
												email: '',
												notifications: null,
											},
										});
									}}
								>
									Reset
								</Button>
							</React.Fragment>
						);
					}}
				</FormContext.Consumer>
			</Form>
		</div>
	);
}

Playground.parameters = { options: { showPanel: false } };
