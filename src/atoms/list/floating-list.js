import React from 'react';
import clsx from 'clsx';

import List from './list';

const FloatingList = ( { className, ...others } ) => {
	return <List className={ clsx( '-floatable', className ) } { ...others } />;
};

export default FloatingList;
