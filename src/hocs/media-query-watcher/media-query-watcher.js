import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../common/constants';
import { DEFAULT_WAIT } from './constants';
import { isEmpty } from '../../common/toolset';
import { withResizeWatcher } from '../resize-watcher';

/**
 * HoC to watch window resizing events and trigger the proper handler based on
 * media query matching.
 * Use `initial` to indicates that match media should be run when component is mounted.
 */
class MediaQueryWatcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuery: null,
    };
  }

  componentDidMount() {
    const { initial } = this.props;

    initial && this.executeQueries();
  }

  componentDidUpdate(prevProps) {
    const { width, initial } = this.props;

    if ((initial || prevProps.width) && width !== prevProps.width) {
      this.executeQueries();
    }
  }

  get queries() {
    const { queries } = this.props;

    return queries || DEFAULT.ARRAY;
  }

  executeQueries = () => {
    const { currentQuery } = this.state;
    const queries = this.queries;

    if (isEmpty(queries)) {
      return;
    }

    let newCurrentQuery = null;
    for (let i = 0; i < queries.length && !newCurrentQuery; i++) {
      const query = queries[i];

      if (window.matchMedia(query).matches) {
        newCurrentQuery = query;
      }
    }

    if (currentQuery !== newCurrentQuery) {
      this.setState(
        {
          currentQuery: newCurrentQuery,
        },
        this.publish
      );
    }
  };

  publish = () => {
    const { currentQuery } = this.state;
    const { onQueryMatch } = this.props;

    onQueryMatch && onQueryMatch({ query: currentQuery });
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

MediaQueryWatcher.propTypes = {
  initial: PropTypes.bool,
  onQueryMatch: PropTypes.func.isRequired,
  queries: PropTypes.arrayOf(PropTypes.string).isRequired,
};

MediaQueryWatcher.defaultProps = {
  initial: false,
};

export default withResizeWatcher(MediaQueryWatcher, { wait: DEFAULT_WAIT });
