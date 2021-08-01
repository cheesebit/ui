import generator from 'test/data-generator';

export function generateTableData() {
	return generator.array( ( ) => {
		return {
			company: generator.company(),
			id: generator.guid(),
			profession: generator.profession(),
			salary: generator.float( { min: 100, max: 19999, fixed: 2 } ),
		};
	}, generator.natural( { min: 2, max: 12 } ) );
}
