import React from 'react';
import clsx from 'clsx';

import { Calendar } from '../calendar';
import { Dropdown } from 'molecules/dropdown';
import { Input } from 'atoms/input';
import CBDate, { DateFormatter } from 'common/date';

import './date-picker.scss';

const t = new CBDate();
const f = new DateFormatter( 'MM/DD/YYYY', {} );

function DatePicker( { className, value: valueProp } ) {
	const [ value, setValue ] = React.useState( valueProp );

	return (
		<div className={ clsx( 'cb-date-picker', className ) }>
			<Dropdown
				toggle={ ( { disabled, expanded, onClick } ) => (
					<div
						className="input-toggle"
						onFocus={ () => {
							expanded && ! disabled && onClick();
						} }
					>
						<Input
							name="day"
							className="input"
							readOnly
							value={ f.format( value ) }
							onChange={ function( e ) {
								// TODO: handle input with debouce + blur to parser
								const {
									target: { value },
								} = e;

								// 1

								let input = value;
								const parts = `${ input }`.match( /(\d{1,2})-(\d{1,2})-(\d{4})/ );

								if ( parts == null ) {
									input = input.replace( /[\W\s\._\-]+/g, '' );
								}
								{

								}
								// 2
							} }
						/>
					</div>
				) }
				unroll="right"
			>
				<Dropdown.Items>
					<Calendar
						date={ value }
						onChange={ ( { target: { value } } ) => {
							setValue( value );
						} }
					/>
				</Dropdown.Items>
			</Dropdown>
		</div>
	);
}

DatePicker.defaultProps = {
	value: t.date,
};

export default DatePicker;
