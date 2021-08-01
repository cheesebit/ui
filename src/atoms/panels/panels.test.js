import React from 'react';

import { Panels, getPanelRadioID } from './index';
import { render } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe( 'Panels', () => {
	const amount = generator.natural( { min: 2, max: 10 } );
	const data = generator.array( () => {
		return {
			id: generator.id(),
			content: generator.word( { length: 10 } ),
		};
	}, amount );

	it( 'renders correctly', () => {
		const props = {
			id: generator.id(),
			children: data.map( ( panel ) => (
				<Panels.Panel id={ panel.id } key={ panel.id }>
					{ panel.content }
				</Panels.Panel>
			) ),
		};

		const { getByTestId, getAllByTestId } = render(
			<Panels { ...props } />,
		);

		const component = getByTestId( 'cb-panels' );
		const panels = getAllByTestId( 'panel' );

		expect( component ).toBeTruthy();

		for ( let i = 0; i < data.length; i++ ) {
			expect( panels[ i ] ).toHaveTextContent( data[ i ].content );
			expect( panels[ i ] ).toHaveAttribute( 'id', data[ i ].id );
		}
	} );
} );
