import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { CURRENT_PAGE, PAGE_SIZE, MAX_PAGES } from './constants';
import { getID, omit, isNil } from '../../common/toolset';
import { compareProps } from '../../common/props-toolset';
import PaginationModel from './pagination-model';

import { keys } from '../../common/toolset';
import { Emphasis } from '../../atoms/button';
import Page from './pagination-page';

const ICON_PREVIOUS = {
  name: 'chevron-left',
  size: 16,
};

const ICON_NEXT = {
  name: 'chevron-right',
  size: 16,
};

import './pagination.scss';

const OMITTED_PROPS = ['pages'];

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.model = new PaginationModel({
      ...props,
    });

    this.state = {
      ...this.model.get(),
    };

    const { id } = props;
    this.id = getID(id);
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    const areEqual = compareProps(['totalItems', 'currentPage', 'pageSize']);

    if (!areEqual(prevProps, props)) {
      this.model = new PaginationModel({
        ...props,
      });

      this.setState({
        ...this.model.get(),
      });
    }
  }

  get classes() {
    const { className } = this.props;

    return clsx('cb-pagination', className);
  }

  publish = () => {
    const { onChange } = this.props;

    if (!onChange) {
      return;
    }

    const paginationParams = this.model.get();
    onChange({ ...omit(OMITTED_PROPS, paginationParams) });
  };

  handleGoToPage = ({ page }) => {
    if (isNil(page)) {
      return;
    }

    this.model.setCurrentPage(page);

    const paginationParams = this.model.get();
    this.setState(
      {
        ...paginationParams,
      },
      this.publish,
    );
  };

  render() {
    const { label } = this.props;
    const { pageSize, totalPages = 0, pages } = this.state;
    let { currentPage = 0 } = this.state;

    currentPage = parseInt(currentPage, 10);

    return (
      <ul className={this.classes}>
        <li className="item">
          <Page
            disabled={currentPage === 0}
            emphasis={Emphasis.text}
            icon={ICON_PREVIOUS}
            onClick={this.handleGoToPage}
            page={currentPage - 1}
          />
        </li>
        {keys(pages).map(key => {
          const { value, label } = pages[key];
          const isCurrent = currentPage == value;
          const emphasis = isCurrent ? Emphasis.flat : Emphasis.text;

          return (
            <li key={key} className="item">
              <Page
                className={clsx({
                  'is-current': isCurrent,
                })}
                emphasis={emphasis}
                onClick={this.handleGoToPage}
                page={value}
              >
                {label}
              </Page>
            </li>
          );
        })}
        <li className="item">
          <Page
            disabled={currentPage === totalPages - 1}
            emphasis={Emphasis.text}
            icon={ICON_NEXT}
            onClick={this.handleGoToPage}
            page={currentPage + 1}
          />
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  maxPages: PropTypes.number,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  currentPage: CURRENT_PAGE,
  maxPages: MAX_PAGES,
  pageSize: PAGE_SIZE,
  label: 'Registros por página',
};

export default Pagination;
