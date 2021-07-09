import React from 'react';

import { render, userEvent } from '../../../test/helpers';
import { Tabbed } from './index';
import generator from '../../../test/data-generator';

describe( 'Tabbed', () => {
	const amount = generator.natural( { min: 2, max: 10 } );
	const tabs = generator.array( () => {
		const id = generator.id();

		return {
			id: `tab-${ id }`,
			for: `panel-${ id }`,
			label: generator.word( { length: 10 } ),
		};
	}, amount );

	it( 'renders correctly', () => {
		const props = {
			tabs,
			children: tabs.map( ( tab ) => (
				<Tabbed.Panel key={ tab.for } id={ tab.for }>
					<h1>{ tab.label }</h1>
					<p>{ generator.paragraph() }</p>
				</Tabbed.Panel>
			) ),
		};

		const { getByTestId } = render( <Tabbed { ...props } /> );

		const component = getByTestId( 'cb-tabbed' );
		const activeIndicator = getByTestId( 'active-indicator' );

		expect( component ).toBeTruthy();
		expect( activeIndicator ).toBeTruthy();
	} );

	it( 'renders all the individual tabs', () => {
		const props = {
			tabs,
			children: tabs.map( ( tab ) => (
				<Tabbed.Panel key={ tab.for } id={ tab.for }>
					<h1>{ tab.label }</h1>
					<p>{ generator.paragraph() }</p>
				</Tabbed.Panel>
			) ),
		};

		const { getAllByTestId } = render( <Tabbed { ...props } /> );

		expect( getAllByTestId( 'tab' ) ).toHaveLength( amount );
	} );

	it( 'sets tab as active on tab click', () => {
		const props = {
			tabs,
			children: tabs.map( ( tab ) => (
				<Tabbed.Panel key={ tab.for } id={ tab.for }>
					<h1>{ tab.label }</h1>
					<p>{ generator.paragraph() }</p>
				</Tabbed.Panel>
			) ),
		};

		const { getAllByRole } = render( <Tabbed { ...props } /> );

		const tabComponents = getAllByRole( 'tab' );
		const at = generator.natural( { min: 0, max: amount - 1 } );

		userEvent.click( tabComponents[ at ] );
		expect( tabComponents[ at ] ).toHaveClass( 'is-active' );
	} );

	it( 'shows the referred panel when a tab is clicked', () => {
		const props = {
			tabs,
			children: tabs.map( ( tab ) => (
				<Tabbed.Panel
					key={ tab.for }
					id={ tab.for }
					data-testid={ `panel-${ tab.for }` }
				>
					<h1>{ tab.label }</h1>
					<p>{ generator.paragraph() }</p>
				</Tabbed.Panel>
			) ),
		};

		const { getAllByRole, getByTestId } = render( <Tabbed { ...props } /> );

		const tabComponents = getAllByRole( 'tab' );

		const at = generator.natural( { min: 0, max: amount - 1 } );

		userEvent.click( tabComponents[ at ] );

		expect( tabComponents[ at ] ).toHaveClass( 'is-active' );
		expect( getByTestId( `panel-${ tabs[ at ].for }` ) ).toBeVisible();
	} );
} );
