import generator from 'test/data-generator';
import { capitalize } from 'common/toolset';

export function generateTabs( options = { min: 2, max: 5 } ) {
	return generator.array( ( { index } ) => {
		return {
			id: `test-tab-${ index }`,
			label: capitalize( generator.word( { length: 4 } ) ),
		};
	}, generator.natural( options ) );
}
