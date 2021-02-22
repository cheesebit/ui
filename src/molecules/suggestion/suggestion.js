import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';

import { debounce, reject, to } from '../../common/toolset';
import { Input } from '../../atoms/input';
import { useChangeable } from '../../hooks/changeable';
import { Select } from '../select'

import useSuggestion from './use-suggestion';

import './suggestion.scss'

function Suggestion({ className, delay = 450, adapter, datasources = [] }) {
  const { fetch, options, loading } = useSuggestion({ delay, adapter }, ...datasources);

  const handleChange = useCallback(function handleChange(e) {
    const value = e.target.value;

    fetch(value);
  });

  const [query, setQuery] = useChangeable({
    value: '',
    onChange: handleChange,
  });

  return (
    <div className={clsx('cb-suggestion', className)}>
      <Input value={query} onChange={setQuery} />
      <Select options={options} collapsed={false} />
    </div>
  );
}

export default Suggestion;
