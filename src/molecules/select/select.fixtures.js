import generator from 'test/data-generator';
import icons from 'atoms/icon/icon-mapping';

export function generateSelectOptions() {
	return generator.array( () => {
		const label = generator.name();

		return {
			value: generator.id(),
			label,
			icon: generator.pick( icons ),
		};
	}, generator.natural( { min: 5, max: 10 } ) );
}
