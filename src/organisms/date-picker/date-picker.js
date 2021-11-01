import React from 'react';
import clsx from 'clsx';

import { Calendar } from '../calendar';
import { Dropdown, GenericDropdown, useDropdown } from 'molecules/dropdown';
import { Input } from 'atoms/input';
import { Icon } from 'atoms/icon';
import CBDate, { DateFormatter } from 'common/date';

import './date-picker.scss';

const t = new CBDate();
const f = new DateFormatter('MM/DD/YYYY');

function DatePicker({ className, value: valueProp }) {
	const [value, setValue] = React.useState(valueProp);
	const dropdown = useDropdown({});

	return (
		<div className={clsx('cb-date-picker', className)}>
			<GenericDropdown {...dropdown} unroll="right">
				<Input
					name="day"
					className="input-toggle"
					leading={<Icon name="calendar" />}
					value={f.format(value)}
					onFocus={() => {
						dropdown.toggle();
					}}
					onChange={function (e) {
						// TODO: handle input with debouce + blur to parser
						// const {
						// 	target: { value },
						// } = e;
						// let input = value;
						// const parts = `${ input }`.match( /(\d{1,2})-(\d{1,2})-(\d{4})/ );
						// if ( parts == null ) {
						// 	input = input.replace( /[\W\s\._\-]+/g, '' );
						// }
					}}
				/>

				<Dropdown.Menu>
					<Calendar
						date={value}
						onChange={({ target: { value } }) => {
							setValue(value);
						}}
					/>
				</Dropdown.Menu>
			</GenericDropdown>
		</div>
	);
}

DatePicker.defaultProps = {
	value: t.date,
};

export default DatePicker;
