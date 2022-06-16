import React from 'react';

import { render, screen } from 'test/helpers';
import Field from './form-field';
import generator from 'test/data-generator';

function setup( props ) {
	return render( <Field { ...props } /> );
}

describe( '<Field />', () => {
	it( 'renders correctly', () => {
		const props = {
			label: generator.word(),
			children: generator.word(),
			prompt: '',
			feedback: {},
		};

		setup( props );

		const component = screen.getByTestId( 'cb-form-field' );
		const label = screen.getByTestId( 'field-label' );
		const content = screen.getByTestId( 'field-content' );
		const prompt = screen.getByTestId( 'field-prompt' );

		expect( component ).toBeTruthy();
		expect( label ).toBeTruthy();
		expect( content ).toBeTruthy();
		expect( prompt ).toBeTruthy();
	} );

	it( 'renders label correctly', () => {
		const props = {
			label: generator.word(),
			children: generator.word(),
			prompt: '',
			feedback: {},
		};

		setup( props );

		const label = screen.getByTestId( 'field-label' );

		expect( label ).toHaveTextContent( props.label );
	} );

	it( 'renders prompt correctly', () => {
		const props = {
			label: generator.word(),
			children: generator.word(),
			prompt: generator.sentence(),
		};

		setup( props );

		const prompt = screen.getByTestId( 'field-prompt' );

		expect( prompt ).toHaveTextContent( props.prompt );
	} );

	it( 'renders content correctly', () => {
		const props = {
			label: generator.word(),
			children: generator.word(),
		};

		setup( props );

		const content = screen.getByTestId( 'field-content' );

		expect( content ).toHaveTextContent( props.children );
	} );

	it( 'renders feedback correctly', () => {
		const props = {
			label: generator.word(),
			children: generator.word(),
			feedback: {
				icon: 'help',
				message: generator.sentence(),
			},
		};

		setup( props );

		const prompt = screen.getByTestId( 'field-prompt' );

		const icon = screen.getByLabelText( props.feedback.icon );

		expect( icon ).toBeInTheDocument();
		expect( prompt ).toHaveTextContent( props.feedback.message );
	} );

	it( 'renders empty prompt when no feedback text is provided', () => {
		const props = {
			label: generator.word(),
			children: generator.word(),
			feedback: {
				icon: 'help',
			},
		};

		setup( props );

		const prompt = screen.getByTestId( 'field-prompt' );
		const icon = screen.getByLabelText( props.feedback.icon );

		expect( icon ).toBeInTheDocument();
		expect( prompt ).toBeEmptyDOMElement();
	} );

	describe( 'with variant', () => {
		it( `renders correctly with variant danger`, () => {
			const props = {
				label: generator.word(),
				children: generator.word(),
				variant: 'danger',
			};

			setup( props );

			const component = screen.getByTestId( 'cb-form-field' );
			expect( component ).toHaveClass( '-danger' );
		} );

		it( `renders correctly with variant info`, () => {
			const props = {
				label: generator.word(),
				children: generator.word(),
				variant: 'info',
			};

			setup( props );

			const component = screen.getByTestId( 'cb-form-field' );
			expect( component ).toHaveClass( '-info' );
		} );

		it( `renders correctly with variant success`, () => {
			const props = {
				label: generator.word(),
				children: generator.word(),
				variant: 'success',
			};

			setup( props );

			const component = screen.getByTestId( 'cb-form-field' );
			expect( component ).toHaveClass( '-success' );
		} );

		it( `renders correctly with variant warn`, () => {
			const props = {
				label: generator.word(),
				children: generator.word(),
				variant: 'warn',
			};

			setup( props );

			const component = screen.getByTestId( 'cb-form-field' );
			expect( component ).toHaveClass( '-warn' );
		} );
	} );
} );
