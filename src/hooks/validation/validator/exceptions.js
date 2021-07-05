export class RuleTypeError extends Error {
  constructor(message) {
    super(message || 'Unkown rule type');
  }
}

export class InvalidValidatorError extends Error {
  constructor(message) {
    super(message || 'Validator must be a function or a Promise');
  }
}

export class InvalidExceptCheckerError extends Error {
  constructor(message) {
    super(message || 'Except must be a function or a Promise');
  }
}
