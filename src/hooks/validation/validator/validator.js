import { DEFAULT } from 'common/constants';
import logger from 'common/logger';

import {
	isBoolean,
	isFunction,
	isObject,
	isPromise,
	isString,
	keys,
	mandatory,
	toArray,
} from 'common/toolset';

import Task from 'common/task';
import * as commonValidators from './common';
import * as numberValidators from './number';
import * as stringValidators from './string';
import {
	InvalidExceptCheckerError,
	InvalidValidatorError,
	RuleTypeError,
} from './exceptions';

/**
 * 💡 Ideas:
 * - For the validation configuration:
 *  - if, para indicar quando a validação deve ser executada
 *  - needs, para indicar qual outra validação deve ser executada antes
 *  - uses, para utilizar uma validação já existente
 */

export const validators = {
	'number.max': numberValidators.validateMaxValue,
	'number.min': numberValidators.validateMinValue,
	'number.range': numberValidators.validateRange,
	'string.blank': stringValidators.isBlank,
	'string.empty': stringValidators.isEmpty,
	'string.length.max': stringValidators.validateMaxLength,
	'string.length.min': stringValidators.validateMinLength,
	'string.length.range': stringValidators.validateRangeLength,
	'string.length': stringValidators.validateLength,
	permissive: commonValidators.validatePermissive,
	required: commonValidators.validateRequired,
};

/**
 * Performs validation over `values` using the given validation `schema`.
 *
 * @param {Object} values - Values object from where `field` will be retrieved.
 * @param {Object} schema - Object containing validation rules to be applied.
 * @param {Object} [options] - Optional
 * @param {AbortSignal} signal - Signal to abort validation.
 */
export function validate( values, schema ) {
	const safeSchema = schema || mandatory( 'Schema is required' );
	const status = keys( values ).reduce( ( status, field ) => {
		return {
			...status,
			[ field ]: true,
		};
	}, {} );

	return new Task( async ( resolve, reject, _, onAbort ) => {
		onAbort( () => {
			reject( 'Aborted' );
		} );

		try {
			for ( const field in safeSchema ) {
				const rules = toArray( safeSchema[ field ] );

				for ( const rule of rules ) {
					const {
						name,
						validator,
						isCustomHandler = false,
						except,
						args,
					} = resolveRule( rule ); //?

					if ( ( isFunction( except ) || isPromise( except ) ) && await except( values ) ) {
						logger.debug( 'rule', name, ': skipped due to except rule' );
						continue;
					}

					const valid = await validator( getValue( values, field, isCustomHandler ), ...( args || DEFAULT.ARRAY ) );

					status[ field ] = getStatus( status[ field ], valid, name );

					logger.debug( 'rule', name, ': ', Boolean( valid ) ? 'VALID' : 'INVALID' );
				}
			}

			resolve( status );
		} catch ( err ) {
			reject( err );
		}
	} );
}

/**
 * Creates an object representing the validation given by `rule`.
 * It handles it based on its type.
 *
 * @param {Array | Object | string} rule - Rule that determines the validation.
 * @param {Function} resolveArrayRule
 * @param {Function} resolveObjectRule
 * @param {Function} resolveStringRule
 * @return {ValidationRule} Complete validation rule object
 * @throws RuleTypeError
 */
export function resolveRule(
	rule,
	resolveArrayRule = handleArrayRule,
	resolveObjectRule = handleObjectRule,
	resolveStringRule = handleStringRule,
) {
	if ( Array.isArray( rule ) ) {
		return resolveArrayRule( rule );
	} else if ( isObject( rule ) ) {
		return resolveObjectRule( rule );
	} else if ( isString( rule ) ) {
		return resolveStringRule( rule );
	}

	throw new RuleTypeError( `${ rule } is not a valid rule type.` );
}

/**
 * Breaks rule as array into named properties.
 *
 * @param {Array} rule - Rule as array
 * @return {Object} Complete validation rule object.
 */
export function handleArrayRule( rule ) {
	const [ ruleName, ...args ] = rule;
	const validator = getValidator( ruleName );

	return {
		name: ruleName,
		validator,
		args,
	};
}

/**
 * Breaks rule as object into named properties.
 *
 * @param {Object} rule - Rule as object
 * @return {Object} Complete validation rule object.
 *
 * @throws InvalidValidatorError
 * @throws InvalidExceptCheckerError
 */
export function handleObjectRule( rule ) {
	const { name: ruleName, except, handler, args } = rule;

	const validator = handler || getValidator( ruleName );

	if ( ! isFunction( validator ) && ! isPromise( validator ) ) {
		throw new InvalidValidatorError(
			`Validator for ${ ruleName } is nor a function, neither a Promise.`,
		);
	}

	if ( except && ! ( isFunction( except ) || isPromise( except ) ) ) {
		throw new InvalidExceptCheckerError(
			`Except checker for ${ ruleName } is nor a function, neither a Promise.`,
		);
	}

	return {
		isCustomHandler: Boolean( handler ),
		except,
		name: ruleName,
		validator,
		args: args || DEFAULT.ARRAY,
	};
}

/**
 * Breaks rule as string into named properties.
 *
 * @param {string} ruleName - Rule as string
 * @return {string} Complete validation rule object.
 */
export function handleStringRule( ruleName ) {
	const validator = getValidator( ruleName );

	return {
		name: ruleName,
		validator,
	};
}

/**
 * Gets validator by `ruleName`, or in case it cannot find it, returns a permissive validator,
 * which always returns `true` (valid).
 *
 * @param {string} ruleName - Name of the validation rule to be returned.
 * @return {Function} The validator function
 */
export function getValidator( ruleName ) {
	if ( ruleName in validators ) {
		return validators[ ruleName ];
	}

	return validators.permissive;
}

/**
 * Gets the value to be provided to validation `function`/`Promise`.
 * If it is a custom validator (`isCustomHandler = true`), then we return
 * a shallow copy of `values` (since we don't know beforehand which fields it will use).
 *
 * @param {Object} values - Values object from where `field` will be retrieved.
 * @param {string} field - Field to be validated.
 * @param {boolean} isCustomHandler - Is a custom validator (not a predefined one).
 */
export function getValue( values, field, isCustomHandler ) {
	const safeValues = values || DEFAULT.OBJECT;

	if ( isCustomHandler ) {
		return { ...safeValues };
	}

	return safeValues[ field ];
}

/**
 * Consolidates new validation status with the current one.
 *
 * @param {boolean|Array<string>} prev - previous validation status
 * @param {boolean} curr - result of current validator
 * @param {string} validator - name of the current validator
 *
 * @return {boolean|Array<string>} `true` if resulting status is valid, and array
 * with the validators name otherwise.
 */
export function getStatus( prev, curr, validator ) {
	if ( prev === true && curr ) {
		return true;
	}

	return [ ...( isBoolean( prev ) ? [] : prev ), ...( curr ? [] : [ validator ] ) ]; //?
}

/**
 * @typedef {Object} ValidationRule
 * @property {Array} [args] - Addional to run validation.
 * @property {boolean} [custom] - It is a custom validator.
 * @property {Function} [except] - Function/Promise to check if validation should be skipped.
 * @property {string} name - Validator name.
 * @property {Validator} validator - Function/Promise to check if value is valid.
 */

/**
 * @callback Validator
 * @param {*} value - Value to be validated
 * @param {*} ...args - Additional args
 * @return {boolean} `true` if the provided value is valid according to this validator,
 * `false` otherwise.
 */
