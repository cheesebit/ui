import React from 'react';

/**
 * Check whether component is mounted.
 * Be aware that it cannot be list as a dependency, otherwise it will be triggered at the wrong moment.
 *
 * @return {boolean} Whether the component is mounted or not.
 */
function useMounted() {
	const mounted = React.useRef(false);

	React.useEffect(function onMount() {
		mounted.current = true;
	}, []);

	return mounted.current;
}

export default useMounted;
