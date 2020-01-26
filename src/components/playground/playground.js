import React from "react";
import classNames from "classnames";

const Playground = ({ children, className, ...others }) => (
  <div className={classNames("cb-playground", className)} {...others}>
    {children}
  </div>
);

export default Playground;
