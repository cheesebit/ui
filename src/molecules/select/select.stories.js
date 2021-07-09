import React from 'react';
import { action } from '@storybook/addon-actions';

import generator from 'test/data-generator';
import icons from 'atoms/icon/icon-mapping';

import Select from './select';

const generateSelectOptions = () =>
	generator.array( () => {
		const label = generator.name();

		return {
			value: generator.id(),
			label,
			icon: generator.pick( icons ),
		};
	}, generator.natural( { min: 5, max: 10 } ) );

export default {
	title: 'Molecules/Select',
	component: Select,
	argTypes: {
		unroll: {
			control: {
				type: 'select',
				options: [ 'right', 'left', 'block' ],
			},
		},
		className: {
			table: {
				disable: true,
			},
		},
		multiple: {
			control: {
				type: 'boolean',
			},
		},
		id: {
			table: {
				disable: true,
			},
		},
		value: {
			table: {
				disable: true,
			},
		},
		options: {
			table: {
				disable: true,
			},
		},
	},
};

const Template = ( args ) => {
	return (
		<div className="block">
			<p className="mb-2">This is me, a cool Select.</p>
			<p className="mb-2">
				As I&apos;m <b>still a work in progress</b>, there&apos;s some maintenance going
				on, but soon enough you will be able to try me :)
			</p>

			<Select
				{ ...args }
				options={ generateSelectOptions() }
				onChange={ action( 'select' ) }
			/>
		</div>
	);
};

export const Playground = Template.bind( {} );
