import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Box } from '../../atoms/box';
import { Checkbox } from '../../atoms/checkbox';
import { DEFAULT } from '../../common/constants';
import { List } from '../../atoms/list';

import './table.scss';

class Table extends React.PureComponent {
	get classes() {
		const { className } = this.props;

		return clsx( 'cb-table', {}, className );
	}

	get columns() {
		const { columns } = this.props;

		return columns ?? DEFAULT.ARRAY;
	}

	get data() {
		const { data } = this.props;

		return data ?? DEFAULT.ARRAY;
	}

	get style() {
		const widths = [];

		for ( const column of this.columns ) {
			widths.push( column?.props?.style?.width ?? '1fr' );
		}

		return {
			display: 'grid',
			gridTemplateColumns: widths.join( ' ' ),
		};
	}

	render() {
		const { id, bordered, hoverable, striped } = this.props;

		/**
		 * TODO: Remove literal objects/arrays
		 * TODO: Remove fake row actions (dropdown)
		 * TODO: Isolate children (think of a better way to pass props into box's children)
		 * TODO: Break this component into super small parts
		 */
		return (
			<section id={ id } className={ this.classes } data-testid="cb-table">
				<Box
					block
					data-testid="header"
					className="header row"
					paddingless="vertical"
					borderless={ [ 'horizontal', 'top' ] }
					leading={ <Checkbox /> }
				>
					<div style={ this.style }>
						{ this.columns.map( ( column ) => (
							<Box
								key={ column.name }
								as="span"
								borderless
								paddingless="horizontal"
								className="cell"
								data-testid={ column.name }
								style={ column?.props?.style }
							>
								{ column.name }
							</Box>
						) ) }
					</div>
				</Box>
				<List
					data-testid="body"
					className="body"
					bordered={ bordered }
					hoverable={ hoverable }
					striped={ striped }
				>
					{ this.data.map( ( entry ) => (
						<List.Item
							key={ entry.id }
							block
							className="row"
							data-testid="row"
							leading={ <Checkbox /> }
							padding="vertical"
						>
							<div style={ this.style }>
								{ this.columns.map( ( column ) => (
									<Box
										key={ column.name }
										as="span"
										borderless
										className="cell"
										paddingless
										data-testid={ column.name }
										style={ column?.props?.style }
									>
										{ entry[ column.name ] }
									</Box>
								) ) }
							</div>
						</List.Item>
					) ) }
				</List>
			</section>
		);
	}
}

Table.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape( {
			name: PropTypes.string.isRequired,
			label: PropTypes.string,
		} ),
	),
	bordered: PropTypes.bool,
	striped: PropTypes.bool,
	hoverable: PropTypes.bool,
};

Table.defaultProps = {
	bordered: true,
	striped: false,
	hoverable: true,
};

export default Table;

// children={{
//   style: this.style,
//   children: this.columns.map(column => (
//     <Box
//       key={column.name}
//       as="span"
//       borderless
//       className="cell"
//       paddingless="horizontal"
//       data-testid={column.name}
//       style={column?.props?.style}
//     >
//       {entry[column.name]}
//     </Box>
//   )),
// }}
