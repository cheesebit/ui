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

function getValidator(ruleName) {
  if (ruleName in validators) {
    return validators[ruleName];
  }

  return validators.permissive;
}

function getValue(values, field, isCustomHandler) {
  if (isCustomHandler) {
    return { ...values };
  }

  return values[field];
}

/**
 * @function
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
 * @function
 * Breaks rule as object into named properties.
 * @param {object} rule - Rule as object
 * @return {object}
 */
function handleObjectRule(rule) {
  const { name: ruleName, on, except, handler, args } = rule;
  const validator = getValidator(rule) || handler;

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
 * @function
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

export async function validate(values, field, rules) {
  const safeRules = toArray(rules);

  for (const rule of safeRules) {
    const { args, custom = false, except, name, on, validator } = resolveRule(
      rule,
    );

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
