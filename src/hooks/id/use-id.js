import React from 'react';

import { getID } from '../../common/toolset';

function useID({ id: propId }) {
  const [id, setID] = React.useState(getID(propId));

  React.useEffect(
    function updateID() {
      setID(getID(propId));
    },
    [propId],
  );

  return id;
}

export default useID;
