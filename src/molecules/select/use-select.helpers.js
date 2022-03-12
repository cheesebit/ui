import { isEmpty, toArray } from 'common/toolset';

import GenericAdapter from './generic-adapter';

/**
 *
 * @param {SelectProps} props
 * @return {SelectDatasource[]} includes provided datasources and datasource generated from the provided options (if any).
 */
export function getDatasources(props) {
	/**
	 *
	 * @param {GenericOption[] | null} [options]
	 * @return {SelectDatasourceFunction[]} datasource function that returns the provided options.
	 */
	function getDatasourceFromOptions(options) {
		if (!options) {
			return [];
		}

		return [
			function useGenericDatasource() {
				return {
					type: 'generic',
					adapter: GenericAdapter,
					fetch: function fetch({ regex }) {
						return options.filter(({ label }) => regex.test(label));
					},
				};
			},
		];
	}

	/** @type {SelectDatasourceFunction[]} */
	let datasources = [];

	datasources = datasources.concat(props.datasources || []);
	datasources = datasources.concat(getDatasourceFromOptions(props.options));

	return datasources.map((ds) => ds());
}

/**
 *
 * @param {SelectDatasource[]} datasources
 * @return {Record<string, SelectDatasourceAdapter>} adapters for the provided datasources.
 */
export function extractAdapters(datasources) {
	return toArray(datasources).reduce((map, ds) => {
		return {
			...map,
			[ds.type]: ds.adapter,
		};
	}, {});
}

/**
 *
 * @param {Record<string, SelectDatasourceAdapter>} adapters
 * @param {string} [type]
 * @return {SelectDatasourceAdapter} return the adapter for the given type, or a generic adapter if no adapter was found.
 */
export function getAdapter(adapters, type) {
	if (type == null) {
		return GenericAdapter;
	}

	return adapters[type] || GenericAdapter;
}

/**
 *
 * @param {SelectionState} selection
 * @param {boolean} [multiple]
 * @return { Option | Option[] | null} get select value base on the current selection.
 */
export function getValue(selection, multiple) {
	const pairs = Array.from(selection);

	if (isEmpty(pairs)) {
		return null;
	}

	if (multiple) {
		const options = [];
		for (const [, option] of pairs) {
			options.push(option);
		}

		return options;
	}
	const [[, option]] = pairs;
	return option;
}

/**
 *
 * @param {Record<string, SelectDatasourceAdapter>} adapters
 * @param {SelectionState} selection
 * @param {boolean} [multiple]
 * @return {string} get displayable value for the current selection.
 */
export function getDisplayValue(adapters, selection, multiple) {
	if (selection.size == 0) {
		return '';
	}

	if (multiple) {
		return `${selection.size} item${selection.size == 1 ? '' : 's'} selected`;
	}

	const value = getValue(selection, multiple);
	// @ts-ignore
	const adapter = getAdapter(adapters, value._type);
	return adapter.getLabel(value);
}

/**
 * @typedef {import('./selection-strategy').SelectionState} SelectionState
 * @typedef {import('./selection-strategy').Selectable} Option
 */

/**
 * @typedef {import('./select.types').GenericOption} GenericOption
 * @typedef {import('./select.types').SelectDatasourceAdapter} SelectDatasourceAdapter
 * @typedef {import('./select.types').SelectDatasource} SelectDatasource
 * @typedef {import('./select.types').SelectDatasourceFunction} SelectDatasourceFunction
 * @typedef {import('./select.types').SelectProps} SelectProps
 */
