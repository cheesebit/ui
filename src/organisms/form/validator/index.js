import { DEFAULT } from '../../../common/constants';
import {
  identity,
  isFunction,
  isObject,
  isPromise,
  isString,
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
import logger from '../../../common/logger';

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
 * Creates an object representing the validation given by `rule`.
 * It handles it based on its type.
 * @param {Array|object|string} rule - Rule that determines the validation.
 * @returns object
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

  throw new RuleTypeError(`${String(rule)} is not a valid rule type.`);
}

/**
 * Performs validation over `field` present in `values`, applying
 * `rules`.
 * @param {object} values - Values object from where `field` will be retrieved.
 * @param {string} field - Field to be validated.
 * @param {object} rules - Object containing validation rules to be applied.
 */
export async function validate(values, field, rules) {
  const safeRules = toArray(rules);
  logger.debug('validation', values);
  for (const rule of safeRules) {
    const { args, custom = false, except, name, validator } = resolveRule(rule);

    if (except && (await except.apply(this, [values]))) {
      logger.debug('rule', name, ': skipped due to except rule');
      continue;
    }

    logger.debug('rule', name, ': running...');

    const valid = await validator.apply(this, [
      getValue(values, field, custom),
      ...(args || DEFAULT.ARRAY),
    ]);

    logger.debug('rule', name, ': ', Boolean(valid) ? 'VALID' : 'INVALID');
  }
}
