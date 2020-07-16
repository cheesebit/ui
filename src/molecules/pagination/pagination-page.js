import React from 'react';
import classNames from 'classnames';

import { Button } from '../../atoms/button';

const Page = ({ className, onClick, page, ...others }) => {
  const handleClick = () => {
    onClick && onClick({ page });
  };

  return (
    <Button
      {...others}
      className={classNames('page', className)}
      onClick={handleClick}
    />
  );
};

export default Page;
