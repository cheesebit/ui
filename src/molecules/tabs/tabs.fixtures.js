import generator from 'test/data-generator';
import { capitalize } from 'common/toolset';

export function generateTabs( options = { min: 2, max: 5 } ) {
	return generator.array( () => {
		return {
			id: generator.id(),

			label: capitalize( generator.word( { length: 7 } ) ),

		};
	}, generator.natural( options ) );
}
