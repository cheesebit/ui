import { useReducer, useRef, useState } from 'react';

import { debounce, reject, to } from '../../common/toolset';
import defaultAdapter from './adapter'

async function* getData(datasources, query) {
  for (let ds of datasources) {
    const [error, data] = await to(ds().fetch(query));

    if (!error) {
      yield data;
    }
  }
}

function useSuggestion({ adapter = defaultAdapter, delay = 450 }, ...datasources) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const fetch = useRef(
    debounce(async function fetch(query) {
      setLoading(true);
      setOptions([]);

      for await (let items of getData(datasources, query)) {
        setOptions(options => [
          ...options,
          ...(items || []).map(item => ({
            label: adapter.getID(item),
            value: adapter.getLabel(item),
          })),
        ]);
      }
      setLoading(false);
    }, delay),
  );

  return { fetch: fetch.current, options, loading };
}

export default useSuggestion;
