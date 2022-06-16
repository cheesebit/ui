import React from 'react';
import { classy } from '@cheesebit/classy';
import PropTypes from 'prop-types';

import { Panels } from 'atoms/panels';
import { Tabs } from 'molecules/tabs';

import './tabbed.scss';

function Tabbed( { children, className, tabs, ...others } ) {
	return (
		<section
			className={ classy( 'cb-tabbed', className ) }
			data-testid="cb-tabbed"
		>
			<Tabs { ...others } items={ tabs } />

			<Panels>{ children }</Panels>
		</section>
	);
}

Tabbed.propTypes = {
	active: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
	onChange: PropTypes.func,
	tabs: Tabs.propTypes.items,
};

Tabbed.Panel = Panels.Panel;

export default Tabbed;
