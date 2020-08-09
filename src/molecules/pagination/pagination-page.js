import React from 'react';
import clsx from 'clsx';

import { Button } from '../../atoms/button';

const Page = ({ className, onClick, page, ...others }) => {
  const handleClick = () => {
    onClick && onClick({ page });
  };

  return (
    <Button
      {...others}
      className={clsx('page', className)}
      onClick={handleClick}
    />
  );
};

export default Page;
