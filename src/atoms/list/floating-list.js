import React from 'react';
import { useClassy } from '@cheesebit/classy';

import List from './list';

const FloatingList = React.forwardRef(
	/**
	 *
	 * @param {import('./list').ListProps} props - floating list props
	 * @param {React.Ref<HTMLElement>} ref
	 * @return {JSX.Element} Floating list component
	 */
	function FloatingList(props, ref) {
		const { className, ...others } = props;
		const { classy } = useClassy(props);

		return (
			<List
				className={classy('-floatable', className)}
				ref={ref}
				{...others}
			/>
		);
	}
);

export default FloatingList;
