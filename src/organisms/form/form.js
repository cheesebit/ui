import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { FormHTMLAttributes } from '../../common/props-dom';
import { Label } from '../../atoms/label';
import { mergeDeepWith } from '../../common/toolset';
import { useForm } from './use-form';
//import Field from './form-field';
import FormContext from './form-context';

import './form.scss';

const merge = mergeDeepWith((l, r) => {
  return [l, r];
});
/**
 *
 * @param {object} initial - Fields with the initial value to be managed by the form hook.
 * @param {object} schema - Validation schema for the given fields.
 */
function Form({ className, children, initial, schema }) {
  const { values, status, dispatch } = useForm(initial, schema);
  const [contextValue, setContextValue] = React.useState({
    values,
    status,
    dispatch,
  });

  React.useEffect(
    function updateContextValue() {
      setContextValue({ values, status, dispatch });
    },
    [values, status, dispatch],
  );

  return (
    <div className={clsx('cb-form', className)}>
      <div className="my-4">
        <code>{JSON.stringify(merge(values, status))}</code>
      </div>
      <FormContext.Provider value={contextValue}>
        {children}
      </FormContext.Provider>
    </div>
  );
}

Form.Field = function FormField({ className, children, name, id, ...others }) {
  return (
    <Label className={clsx('cb-field', className)} {...others}>
      {children}
    </Label>
  );
};

Form.Context = FormContext;

Form.propTypes = {
  ...FormHTMLAttributes,
  initial: PropTypes.object,
  schema: PropTypes.object,
};

export default Form;
