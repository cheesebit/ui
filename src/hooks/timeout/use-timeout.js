import React from 'react';

// Based on https://medium.com/javascript-in-plain-english/usetimeout-react-hook-3cc58b94af1f
function useTimeout(
  callback,
  delay = 500,
  {
    // manage re-render behavior.
    // by default, a re-render in your component will re-define the callback,
    //    which will cause this timeout to cancel itself.
    // to avoid cancelling on re-renders (but still cancel on unmounts),
    //    set `persistRenders: true,`.
    persistRenders = false,
  } = {},
) {
  let timeoutID;
  const cancel = () => timeoutID && clearTimeout(timeoutID);

  React.useEffect(
    () => {
      timeoutID = setTimeout(callback, delay);

      return cancel;
    },
    persistRenders
      ? [setTimeout, clearTimeout]
      : [callback, delay, setTimeout, clearTimeout],
  );

  return cancel;
}

export default useTimeout;
