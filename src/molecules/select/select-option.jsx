import React from 'react';

import { Dropdown } from '../dropdown';

function SelectOption( props ) {
	return <Dropdown.Item { ...props } />;
}

export default SelectOption;
