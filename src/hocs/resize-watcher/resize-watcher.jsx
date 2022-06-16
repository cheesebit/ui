import React from 'react';
import PropTypes from 'prop-types';

import { debounce } from 'common/toolset';
import { DEFAULT_WAIT } from './constants';
import { getWidth } from 'common/ui-toolset';

/**
 * This HOC monitors a specific element (referred to by the provided ref) and
 * returns its width whenever window resizes.
 */
class ResizeWatcher extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			width: 0,
		};

		const { wait = DEFAULT_WAIT, forwardedRef } = props;

		this.ref = forwardedRef ?? React.createRef();
		this.unmounted = false;

		this.updateWidth = debounce( this.updateWidth.bind( this ), wait );
	}

	componentDidMount() {
		window.addEventListener( 'resize', this.updateWidth, false );

		const { initial } = this.props;
		initial && this.updateWidth();
	}

	componentWillUnmount() {
		window.removeEventListener( 'resize', this.updateWidth, false );

		this.unmounted = true;
	}

	updateWidth() {
		const { width } = this.state;
		const ref = this.ref.current;

		let newWidth = window.innerWidth;
		if ( ref ) {
			newWidth = getWidth( ref );
		}

		if ( width === newWidth || this.unmounted ) {
			return;
		}

		this.setState(
			{
				width: newWidth,
			},
			this.publish
		);
	}

	publish = () => {
		const { width } = this.state;
		const { onResize } = this.props;

		onResize && onResize( { width, ref: this.ref } );
	};

	render() {
		const { children } = this.props;
		const { width } = this.state;

		// @ts-ignore
		return children( { width, ref: this.ref } );
	}
}

ResizeWatcher.propTypes = {
	children: PropTypes.func.isRequired,
	forwardedRef: PropTypes.oneOfType( [
		PropTypes.func,
		PropTypes.shape( { current: PropTypes.instanceOf( Element ) } ),
	] ),
	onResize: PropTypes.func,
	wait: PropTypes.number,
};

ResizeWatcher.defaultProps = {
	initial: true,
};

export default ResizeWatcher;
