/**
 * @typedef {import('./selection-strategy').Selectable} Selectable
 * @typedef {import('./selection-strategy').Selectable} Option
 * @typedef {import('./selection-strategy').SelectionState} SelectionState
 * @typedef {import('./selection-strategy').SelectionAdapter} SelectionAdapter
 * @typedef {import('./selection-strategy').SelectionStrategy} SelectionStrategy
 */

/**
 * @typedef {import('lodash').DebouncedFunc} DebouncedFunc
 */

/**
 * @typedef {Object} GenericOption
 * @property {string} label - option' label
 * @property {string} value - option' value'
 */

/**
 * @typedef {('idle' | 'querying')} QueryStatus
 */

/**
 * @typedef {Object} SelectDatasourceAdapter
 * @property {((o: any) => string)} getID Function to get the item's identifier
 * @property {((o: any) => string)} getLabel Function to get the item's readable label
 */

/**
 * @typedef {Object} SelectDatasource
 * @property {string} type - unique type identifier for the items this datasource returns.
 * @property {SelectDatasourceAdapter} adapter - the adapter that handles the item this datasource returns.
 * @property {(({ query, regex }: { query: string; regex: RegExp }) => any[] | Promise<any[]>)} fetch - a function that fetches and/or returns items based on the provided query or regex.
 */

/**
 * @typedef {() => SelectDatasource} SelectDatasourceFunction
 */

/**
 * @typedef {Object} SelectProps
 * @property {string} [id] -
 * @property {string} [name] -
 * @property {string} [placeholder] -
 * @property {string} [className] -
 * @property {Option | Option[] | null} [value] -
 * @property {boolean} [multiple] -
 * @property {boolean} [disabled] -
 * @property {SelectDatasourceFunction | SelectDatasourceFunction[]} [datasources] -
 * @property {GenericOption[]} [options] -
 * @property {(({ target } : { target: { id?: string; name?: string; value: Option | Option[] | null}}) => void)} [onChange] -
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

// dummy export so we can consume the JSDoc types
export default function noop() {}
