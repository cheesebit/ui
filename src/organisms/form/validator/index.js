import { DEFAULT } from '../../../common/constants';
import logger from '../../../common/logger';

import {
  isBoolean,
  isFunction,
  isNil,
  isObject,
  isPromise,
  isString,
  keys,
  toArray,
} from '../../../common/toolset';

import * as commonValidators from './common';
import * as numberValidators from './number';
import * as stringValidators from './string';
import {
  InvalidExceptCheckerError,
  InvalidValidatorError,
  RuleTypeError,
} from './exceptions';

export const validators = {
  'number.max': numberValidators.validateMaxValue,
  'number.min': numberValidators.validateMinValue,
  'number.range': numberValidators.validateRange,
  'string.blank': stringValidators.isBlank,
  'string.empty': stringValidators.isEmpty,
  'string.length.max': stringValidators.validateMinLength,
  'string.length.min': stringValidators.validateMinLength,
  'string.length.range': stringValidators.validateRangeLength,
  'string.length': stringValidators.validateLength,
  permissive: commonValidators.validatePermissive,
  required: commonValidators.validateRequired,
};

/**
 * Performs validation over `values` using the given validation `schema`.
 * @param {object} values - Values object from where `field` will be retrieved.
 * @param {object} rules - Object containing validation rules to be applied.
 */
export async function validate(values, schema) {
  const safeSchema = schema || mandatory('Schema is required');
  let status = keys(values).reduce((status, field) => {
    return {
      ...status,
      [field]: true,
    };
  }, {});

  for (const field in safeSchema) {
    const rules = safeSchema[field] || DEFAULT.ARRAY;

    for (const rule of rules) {
      const { args, custom = false, except, name, validator } = resolveRule(
        rule,
      );

      if (except && (await except.apply(this, [values]))) {
        logger.debug('rule', name, ': skipped due to except rule');
        continue;
      }

      const valid = await validator.apply(this, [
        getValue(values, field, custom),
        ...(args || DEFAULT.ARRAY),
      ]);

      status[field] = getStatus(status[field], valid, name);

      logger.debug('rule', name, ': ', Boolean(valid) ? 'VALID' : 'INVALID');
    }
  }

  return status;
}

/**
 * Creates an object representing the validation given by `rule`.
 * It handles it based on its type.
 * @param {Array|object|string} rule - Rule that determines the validation.
 * @returns {ValidationRule}
 * @throws RuleTypeError
 */
function resolveRule(rule) {
  if (Array.isArray(rule)) {
    return handleArrayRule(rule);
  } else if (isObject(rule)) {
    return handleObjectRule(rule);
  } else if (isString(rule)) {
    return handleStringRule(rule);
  }

  throw new RuleTypeError(`${rule} is not a valid rule type.`);
}

/**
 * Breaks rule as array into named properties.
 * @param {Array} rule - Rule as array
 * @return {object}
 */
function handleArrayRule(rule) {
  const [ruleName, ...args] = rule;
  const validator = getValidator(rule);

  return {
    name: ruleName,
    validator,
    args,
  };
}

/**
 * Breaks rule as object into named properties.
 * @param {object} rule - Rule as object
 * @return {object}
 *
 * @throws InvalidValidatorError
 * @throws InvalidExceptCheckerError
 */
function handleObjectRule(rule) {
  const { name: ruleName, on, except, handler, args } = rule;
  const validator = handler || getValidator(rule);

  if (!isFunction(validator) && !isPromise(validator)) {
    throw new InvalidValidatorError(
      `Validator for ${ruleName} is nor a function, neither a Promise.`,
    );
  }

  if (except && !isFunction(except) && !isPromise(except)) {
    throw new InvalidExceptCheckerError(
      `Except checker for ${ruleName} is nor a function, neither a Promise.`,
    );
  }

  return {
    args: toArray(args),
    custom: true,
    except,
    name: ruleName,
    on,
    validator,
  };
}

/**
 * Breaks rule as string into named properties.
 * @param {string} rule - Rule as string
 * @return {string}
 */
function handleStringRule(rule) {
  const ruleName = rule;
  const validator = getValidator(rule);

  return {
    name: ruleName,
    validator,
  };
}

/**
 * Gets validator by `ruleName`, or in case it cannot find it, returns a permissive validator,
 * which always returns `true` (valid).
 * @param {string} ruleName - Name of the validation rule to be returned.
 * @returns {function} The validator function
 */
function getValidator(ruleName) {
  if (ruleName in validators) {
    return validators[ruleName];
  }

  return validators.permissive;
}

/**
 * Gets the value to be provided to validation `function`/`Promise`.
 * If it is a custom validator (`isCustomHandler = true`), then we return
 * a shallow copy of `values` (since we don't know beforehand which fields it will use).
 * @param {object} values - Values object from where `field` will be retrieved.
 * @param {string} field - Field to be validated.
 * @param {boolean} isCustomHandler - Is a custom validator (not a predefined one).
 */
function getValue(values, field, isCustomHandler) {
  if (isCustomHandler) {
    return { ...values };
  }

  return values[field];
}

/**
 * Consolidates new validation status with the current one.
 * @param {boolean|Array<string>} prev - previous validation status
 * @param {boolean} curr - result of current validator
 * @param {string} validator - name of the current validator
 *
 * @returns {boolean|Array<string>}
 */
function getStatus(prev, curr, validator) {
  if ((!Array.isArray(prev) || isNil(prev)) && curr) {
    return '';
  }

  return [...(isBoolean(prev) ? [] : prev), validator];
}

/**
 * @typedef {Object} ValidationRule
 * @property {Array} [args] - Addional to run validation.
 * @property {boolean} [custom] - It is a custom validator.
 * @property {function} [except] - Function/Promise to check if validation should be skipped.
 * @property {string} name - Validator name.
 * @property {Validator} validator - Function/Promise to check if value is valid.
 */

/**
 * @callback Validator
 * @param {*} value - Value to be validated
 * @param {*} ...args - Additional args
 * @returns {boolean} `true` if the provided value is valid according to this validator,
 * `false` otherwise.
 */
