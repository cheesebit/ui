import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT } from 'common/constants';
import { DEFAULT_WIDTH_GAP, DEFAULT_WAIT } from './constants';
import { getWidth } from 'common/ui-toolset';
import { ResizeWatcher } from '../resize-watcher';

/**
 * This HOC checks, given a parent node (referred to by the provided ref), how many
 * of its children it can fit.
 */
class OverflowWatcher extends React.Component {
	constructor( props ) {
		super( props );

		const { from = 0, to = 0 } = props;
		this.state = {
			from,
			to,
		};
	}

	componentDidMount() {
		this.publish();
	}

	get options() {
		const { options } = this.props;

		return options || DEFAULT.OBJECT;
	}

	getChildren = ( { ref } ) => {
		const hostElement = ref.current;

		if ( ! hostElement ) {
			return DEFAULT.ARRAY;
		}

		const { selector } = this.props;
		const matchingChildren = Array.from(
			hostElement.querySelectorAll( selector )
		);

		return matchingChildren;
	};

	calculateOverflow = ( { width, ref } ) => {
		const { offset = 0, options } = this.props;

		const matchingChildren = this.getChildren( { ref } );
		const totalChildren = matchingChildren.length;

		const from = 0;
		let to = from;

		if ( totalChildren > 0 ) {
			let occupiedWidth = offset;
			const availableWidth = width - DEFAULT_WIDTH_GAP;

			while ( to < totalChildren ) {
				const childElement = matchingChildren[ to ];
				const childWidth = getWidth( childElement, options );
				const nextOccupiedWidth = occupiedWidth + childWidth;

				if ( nextOccupiedWidth > availableWidth ) {
					to--;
					break;
				}

				occupiedWidth += childWidth;

				to++;
			}
		}

		this.setState(
			{
				from,
				to,
			},
			this.publish
		);
	};

	publish = () => {
		const { from, to } = this.state;
		const { onUpdate } = this.props;

		onUpdate && onUpdate( { from, to } );
	};

	renderChildren = ( { width, ref } ) => {
		const { children } = this.props;
		const { from, to } = this.state;

		// @ts-ignore
		return children( {
			ref,
			from,
			to,
			width,
		} );
	};

	render() {
		const { wait, containerRef } = this.props;

		return (
			<ResizeWatcher
				forwardedRef={ containerRef }
				onResize={ this.calculateOverflow }
				wait={ wait }
			>
				{ this.renderChildren }
			</ResizeWatcher>
		);
	}
}

OverflowWatcher.propTypes = {
	children: PropTypes.func.isRequired,
	containerRef: PropTypes.oneOfType( [
		PropTypes.func,
		PropTypes.shape( { current: PropTypes.instanceOf( Element ) } ),
	] ),
	offset: PropTypes.number,
	onUpdate: PropTypes.func.isRequired,
	options: PropTypes.shape( {
		add: PropTypes.func,
	} ),
	selector: PropTypes.string.isRequired,
	wait: PropTypes.number,
};

OverflowWatcher.defaultProps = {
	wait: DEFAULT_WAIT,
};

export default OverflowWatcher;
