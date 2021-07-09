import React from 'react';

import WizardStep from './wizard-step';

import { render } from 'test/helpers';
import generator from 'test/data-generator';
import WizardContext from './wizard-context';

describe( '<WizardStep />', () => {
	it( 'renders correctly', () => {
		const props = { id: generator.id(), children: generator.word() };
		const contextValue = { id: generator.id(), transition: jest.fn() };

		const { getByTestId } = render(
			<WizardContext.Provider value={ contextValue }>
				<WizardStep { ...props } />
			</WizardContext.Provider>,
		);

		const component = getByTestId( 'wizard-step' );

		expect( component ).toHaveTextContent( props.children );
	} );

	it( 'renders function as children correctly', () => {
		const text = generator.word();
		const props = { id: generator.id(), children: () => text };
		const contextValue = { id: generator.id(), transition: jest.fn() };

		const { getByTestId } = render(
			<WizardContext.Provider value={ contextValue }>
				<WizardStep { ...props } />
			</WizardContext.Provider>,
		);

		const component = getByTestId( 'wizard-step' );

		expect( component ).toHaveTextContent( props.children() );
	} );

	it( 'calls function as children correctly', () => {
		const props = { id: generator.id(), children: jest.fn() };
		const contextValue = { id: generator.id(), transition: jest.fn() };

		render(
			<WizardContext.Provider value={ contextValue }>
				<WizardStep { ...props } />
			</WizardContext.Provider>,
		);

		expect( props.children ).toHaveBeenCalledWith( {
			transition: contextValue.transition,
		} );
	} );
} );
