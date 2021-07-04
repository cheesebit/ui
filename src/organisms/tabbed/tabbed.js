import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { check } from './dom-helper';
import { Panels, getPanelRadioID } from '../../atoms/panels';
import { Tabs } from '../../molecules/tabs';

import './tabbed.scss';

function Tabbed({ active, tabs, children, className, disabled, ...others }) {
  const setPanelActive = ({ active }) => {
    // TODO improve
    const tab = (tabs || []).find(({ id }) => id == active);

    if (tab != null) {
      check(getPanelRadioID(tab.for));
    }
  };

  return (
    <section className={clsx('cb-tabbed', className)} data-testid="cb-tabbed">
      <Tabs
        active={active}
        disabled={disabled}
        items={tabs}
        onChange={setPanelActive}
        {...others}
      />

      <Panels>{children}</Panels>
    </section>
  );
}

Tabbed.propTypes = {
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      for: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      props: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      label: PropTypes.node,
      icon: PropTypes.string,
    }),
  ).isRequired,
};

Tabbed.Panel = Panels.Panel;

export default Tabbed;
