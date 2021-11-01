import React from 'react';
import { screen, render } from 'test/helpers';
import useMounted from './use-mounted';

function Experiment() {
	const [logs, setLogs] = React.useState([]);
	const mounted = useMounted();

	React.useEffect(
		function () {
			setLogs((logs) => [...logs, mounted ? 'did mount' : 'not mounted']);
		},
		[mounted]
	);

	return (
		<div data-testid="logs">
			{logs.map((log, index) => (
				<p key={index}>{log}</p>
			))}
		</div>
	);
}

const setup = (props) => render(<Experiment {...props} />);

describe('useMounted', () => {
	it('returns true after component is mounted', () => {
		setup();

		const logs = screen.getByTestId('logs');

		expect(logs.children).toHaveLength(2);

		expect(logs.children[0]).toHaveTextContent('not mounted');
		expect(logs.children[1]).toHaveTextContent('did mount');
	});
});
