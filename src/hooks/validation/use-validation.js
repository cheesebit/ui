import React from 'react';

import { debounce } from 'common/toolset';
import { DEFAULT } from 'common/constants';
import { useAsyncReducer } from 'hooks/async-reducer';
import { validate } from './validator';
import logger from 'common/logger';

/** @type {ValidationStatus} */
const INITIAL_STATUS = {};

/**
 * useValidation hook
 *
 * Validation is run with a `750ms` debounce time and, if there is a validation
 * triggered previously that is still running, we abort it so the validation status
 * is kept synced with the changes of the managed values.
 *
 * @param {Object} schema - Validation schema
 * @return {ValidationSetup} Object with validation status and validation dispatcher.
 */
function useValidation(schema) {
	const taskRef = React.useRef(null);
	const safeSchema = schema || DEFAULT.OBJECT;

	const [status, dispatch] = useAsyncReducer(function reducer(state, action) {
		const { type, payload } = action;

		const safePayload = payload || DEFAULT.OBJECT;

		switch (type) {
			case 'validate':
			case 'field.validate': {
				const { status } = safePayload;

				return {
					...state,
					...status,
				};
			}

			default:
				return state;
		}
	}, INITIAL_STATUS);

	/** @type {DispatchValidation} */
	const dispatcher = React.useCallback(
		debounce(async function (type, payload) {
			const safePayload = payload || DEFAULT.OBJECT;
			const { values } = safePayload;

			function abortRunningValidation() {
				if (taskRef.current) {
					logger.debug(
						'use-validation',
						'aborting previous validation'
					);
					taskRef.current.abort();
				}
			}

			function startValidation() {
				abortRunningValidation();

				taskRef.current = validate(values, safeSchema);
			}

			function getValidationTask() {
				return taskRef.current;
			}

			function clearValidationTask() {
				taskRef.current = null;
			}

			dispatch(async (innerDispatch) => {
				switch (type) {
					case 'validate':
					case 'field.validate': {
						startValidation();

						try {
							const newStatus = await getValidationTask();
							clearValidationTask();

							logger.debug('use-validation', status);

							innerDispatch({
								type,
								payload: { status: newStatus },
							});
						} catch (err) {
							logger.error('use-validation', 'error', err);
						}

						break;
					}
				}
			});
		}, 750),
		[dispatch]
	);

	return { status, dispatch: dispatcher };
}

export default useValidation;

/**
 * @callback DispatchValidation
 * @param {string} type - Operation type (accepts `validate`, `field.validate`) .
 * @param {Object} payload - Additional parameters to the desired operation.
 */

/**
 * @typedef {Record<string, boolean | string[]>} ValidationStatus
 */

/**
 * @typedef {Object} ValidationSetup
 * @property {ValidationStatus} status - Object containing validation status.
 * @property {DispatchValidation} dispatch - Validation dispatcher.
 */
