import clsx from 'clsx';
import React from 'react';

import Field from './form-field';
import { Label } from '../../atoms/label';
import FormContext from './form-context';
import { useForm, useField } from './use-form';

import './form.scss';

/**
 *
 * @param {object} initial - Fields with the initial value to be managed by the form hook.
 * @param {object} schema - Validation schema for the given fields.
 */
function Form({ className, children, initial, schema }) {
  const [fields, dispatch] = useForm(initial, schema);

  return (
    <div className={clsx('cb-form', className)}>
      <div className="my-4">
        <code>{JSON.stringify(fields)}</code>
      </div>
      <FormContext.Provider value={{ fields, dispatch }}>
        {children}
      </FormContext.Provider>
    </div>
  );
}

Form.Field = function FormField({ className, children, name, id, ...others }) {
  // const [field, ] = useField(name || id, fields, dispatch);

  return (
    <Label className={clsx('cb-field', className)} {...others}>
      {children}
    </Label>
  );
};

Form.Context = FormContext;

export default Form;
