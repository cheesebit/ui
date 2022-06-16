import React from 'react';

import { composeStories } from '@storybook/testing-react';

import { render, screen, userEvent } from 'test/helpers';
import * as stories from './tabbed.stories';
import generator from 'test/data-generator';
import Tabbed from './tabbed';

const { Playground } = composeStories( stories );

describe( 'Tabbed', () => {
	const amount = generator.natural( { min: 2, max: 10 } );
	const tabs = generator.array( () => {
		const id = generator.id();

		return {
			id: `tab-${ id }`,
			label: generator.word( { length: 10 } ),
		};
	}, amount );

	it( 'renders correctly', () => {
		const props = {
			tabs,
			children: tabs.map( ( tab ) => (
				<Tabbed.Panel key={ tab.id } id={ tab.id }>
					<h1>{ tab.label }</h1>
					<p>{ generator.paragraph() }</p>
				</Tabbed.Panel>
			) ),
		};

		render( <Playground { ...props } /> );

		const component = screen.getByTestId( 'cb-tabbed' );
		const activeIndicator = screen.getByTestId( 'active-indicator' );

		expect( component ).toBeTruthy();
		expect( activeIndicator ).toBeTruthy();
	} );

	it( 'renders all the individual tabs', () => {
		const props = {
			tabs,
			children: tabs.map( ( tab ) => (
				<Tabbed.Panel key={ tab.id } id={ tab.id }>
					<h1>{ tab.label }</h1>
					<p>{ generator.paragraph() }</p>
				</Tabbed.Panel>
			) ),
		};

		render( <Playground { ...props } /> );

		expect( screen.getAllByTestId( 'tab' ) ).toHaveLength( amount );
	} );

	it( 'sets tab as active on tab click', () => {
		const props = {
			tabs,
			children: tabs.map( ( tab ) => (
				<Tabbed.Panel key={ tab.id } id={ tab.id }>
					<h1>{ tab.label }</h1>
					<p>{ generator.paragraph() }</p>
				</Tabbed.Panel>
			) ),
		};

		render( <Playground { ...props } /> );

		const tabComponents = screen.getAllByRole( 'tab' );
		const at = generator.natural( { min: 0, max: amount - 1 } );

		userEvent.click( tabComponents[ at ] );
		expect( tabComponents[ at ] ).toHaveClass( 'is-active' );
	} );

	it( 'shows the referred panel when a tab is clicked', () => {
		const props = {
			tabs,
			children: tabs.map( ( tab ) => (
				<Tabbed.Panel
					key={ tab.id }
					id={ tab.id }
					data-testid={ `panel-${ tab.id }` }
				>
					<h1>{ tab.label }</h1>
					<p>{ generator.paragraph() }</p>
				</Tabbed.Panel>
			) ),
		};

		render( <Playground { ...props } /> );

		const tabComponents = screen.getAllByRole( 'tab' );

		const at = generator.natural( { min: 0, max: amount - 1 } );

		userEvent.click( tabComponents[ at ] );

		expect( tabComponents[ at ] ).toHaveClass( 'is-active' );
		expect(
			screen.getByTestId( `panel-${ tabs[ at ].id }` )
		).toBeVisible();
	} );
} );
