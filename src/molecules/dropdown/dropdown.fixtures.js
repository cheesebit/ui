import generator from 'test/data-generator';

export function generateDropdownOptions() {
	return generator.array( ( { index } ) => {
		const label = generator.word( { length: 10 } );

		return {
			id: generator.id(),
			children: label,
			// icon: generator.pick(keys(icons)),
			onClick: () => {
				// eslint-disable-next-line no-alert
				alert( `You clicked ${ label } (Index ${ index })` );
			},
		};
	}, 5 );
}
