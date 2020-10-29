import clsx from 'clsx';
import React from 'react';

import { Label } from '../../atoms/label';
import { useForm, useField } from './use-form';
import Field from './form-field';
import FormContext from './form-context';

import './form.scss';

/**
 *
 * @param {object} initial - Fields with the initial value to be managed by the form hook.
 * @param {object} schema - Validation schema for the given fields.
 */
function Form({ className, children, initial, schema }) {
  const { values, dispatch } = useForm(initial, schema);
  const [contextValue, setContextValue] = React.useState({ values, dispatch });

  React.useEffect(
    function updateContextValue() {
      setContextValue({ values, dispatch });
    },
    [values, dispatch],
  );

  return (
    <div className={clsx('cb-form', className)}>
      <div className="my-4">
        <code>{JSON.stringify(values)}</code>
      </div>
      <FormContext.Provider value={contextValue}>
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
