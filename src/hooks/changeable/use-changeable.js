import { useCallback, useState } from 'react';

function useChangeable( { onChange: onChangeProp, value: valueProp } ) {
	const [ value, setValue ] = useState( valueProp );

	const onChange = useCallback(
		function handleChange( e ) {
			const {
				target: { value },
			} = e;
			setValue( value );
			onChangeProp?.( e );
		},
		[ onChangeProp ],
	);

	return [ value, onChange ];
}

export default useChangeable;
