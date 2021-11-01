import React from 'react';
import { useClassy } from '@cheesebit/classy';

import { Button } from 'atoms/button';
import { Dropdown, GenericDropdown } from '../dropdown';
import { Empty } from 'atoms/empty';
import { Icon } from 'atoms/icon';
import { Input } from 'atoms/input';
import { isEmpty, omit } from 'common/toolset';
import { Spinner } from 'atoms/spinner';
import SelectOption from './select-option';
import useSelect, { SelectionContext } from './use-select';

const OMITTED_PROPS = ['adapter', 'options', 'placeholder'];

/**
 * Select component.
 *
 * @param {SelectProps} props
 * @return {JSX.Element} Select element
 */
function Select(props) {
	const { placeholder, ...others } = props;

	const select = useSelect(props);
	const { classy } = useClassy(props);
	const { dropdown } = select;

	function renderTrigger() {
		return (
			<Input
				{...select.getTriggerProps()}
				autoComplete="off"
				data-testid="trigger"
				placeholder={placeholder}
				paddingless={['vertical', 'right']}
				trailing={
					<>
						{select.query ? (
							<Button
								aria-hidden="true"
								{...select.getClearProps()}
								size="small"
								emphasis="text"
								busy={status === 'querying'}
							>
								<Icon name="close" />
							</Button>
						) : (
							<Button
								aria-hidden="true"
								size="small"
								emphasis="text"
								tabIndex={-1}
								onClick={dropdown.toggle}
								busy={status === 'querying'}
							>
								<Icon
									className={classy({
										'cb-u-rotate-180': dropdown.expanded,
									})}
									name="expand-more"
								/>
							</Button>
						)}
					</>
				}
			/>
		);
	}

	function renderOptions() {
		if (isEmpty(select.options)) {
			return (
				<Empty>
					{status !== 'querying'
						? 'No options available.'
						: 'Searching...'}
				</Empty>
			);
		}

		return select.options.map(function renderOption(option) {
			const { label, value, checked } = select.getOption(option);

			return (
				<SelectOption
					key={value}
					className={classy({
						'is-highlighted': checked,
					})}
					{...select.getOptionProps(option)}
				>
					{label}
				</SelectOption>
			);
		});
	}

	return (
		<GenericDropdown
			{...omit(OMITTED_PROPS, others)}
			{...select.getDropdownProps()}
			className={classy('cb-select', props.className)}
			data-testid="cb-select"
		>
			<SelectionContext.Provider value={select.selection}>
				{renderTrigger()}
				<Dropdown.Menu
					{...select.getMenuProps()}
					hoverable
					data-testid="options"
				>
					<Spinner appear={select.status === 'querying'} />
					{renderOptions()}
				</Dropdown.Menu>
			</SelectionContext.Provider>
		</GenericDropdown>
	);
}

export default Select;

/**
 * @typedef {import("./use-select").SelectProps} SelectProps
 */
