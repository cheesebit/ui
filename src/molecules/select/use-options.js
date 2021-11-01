import React from 'react';

import { to, debounce } from 'common/toolset';

/**
 *
 * @param {SelectDatasource[]} datasources -
 * @param {string} query -
 * @return {AsyncGenerator<Selectable[], void, unknown>} generator function that fetches and returns the result as soon as it is available for each queried datasource.
 */
async function* getData(datasources, query) {
	const regex = new RegExp(query, 'i');

	for (const ds of datasources) {
		const [error, data] = await to(
			Promise.resolve(ds.fetch({ query, regex }))
		);

		if (!error) {
			const items = (data || []).map((item) => {
				return {
					...item,
					_type: ds.type,
				};
			});

			yield items;
		}
	}
}

/**
 *
 * @param {useOptionsProps} props
 * @return {useOptionsReturn} functions to manage select options.
 */
function useOptions(props) {
	const { datasources } = props;
	const [query, setQuery] = React.useState('');

	/** @type {[Map<string, Selectable[]>, React.Dispatch<React.SetStateAction<Map<string, Selectable[]>>>]} */
	const [cache, setCache] = React.useState(new Map());

	/** @type {[QueryStatus, React.Dispatch<React.SetStateAction<QueryStatus>>]} */
	const [status, setStatus] = React.useState('idle');

	const fetch = React.useMemo(
		() =>
			debounce(
				/**
				 *
				 * @param {string} query
				 * @return {Promise<void>}
				 */
				async function fetch(query) {
					setQuery(query);

					if (cache.has(query)) {
						setStatus('idle');
						return;
					}

					setStatus('querying');

					// TODO: keep cache to a maximum size
					// TODO: remove startsWith `query` from cache

					setCache((cache) => {
						const newCache = new Map(cache);
						newCache.set(query, []);
						return newCache;
					});

					for await (const items of getData(datasources, query)) {
						setCache((cache) => {
							const newCache = new Map(cache);
							newCache.set(query, [
								...(cache.get(query) || []),
								...(items || []),
							]);
							return newCache;
						});
					}

					setStatus('idle');
				},
				250
			),
		[cache, datasources]
	);

	const clear = React.useCallback(
		function clear() {
			cache.clear();
		},
		[cache]
	);

	const get = React.useCallback(
		function get() {
			return cache.get(query) || [];
		},
		[cache, query]
	);

	return {
		get,
		fetch,
		clear,
		status,
	};
}

export default useOptions;

/**
 * @typedef {import('./selection-strategy').Selectable} Selectable
 */

/**
 * @typedef {import('./select.types').GenericOption} GenericOption
 * @typedef {import('./select.types').QueryStatus} QueryStatus
 * @typedef {import('./select.types').SelectDatasourceAdapter} SelectDatasourceAdapter
 * @typedef {import('./select.types').SelectDatasource} SelectDatasource
 * @typedef {import('./select.types').SelectDatasourceFunction} SelectDatasourceFunction
 * @typedef {import('./select.types').SelectProps} SelectProps
 * @typedef {import('./select.types').DebouncedFunc} DebouncedFunc
 */

/**
 * @typedef {Object} useOptionsProps
 * @property {SelectDatasource[]} datasources -
 */

/**
 * @typedef {Object} useOptionsReturn
 * @property {(() => Selectable[])} get -
 * @property {DebouncedFunc} fetch -
 * @property {(() => void)} clear -
 * @property {QueryStatus} status -
 */
