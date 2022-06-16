import React from 'react';
import PropTypes from 'prop-types';

/**
 * HoC to detect if an interaction has happened outside the given component.
 */
class ClickOutside extends React.Component {
	constructor( props ) {
		super( props );

		this.ref = React.createRef();

		this.state = {
			active: false,
		};

		this.handleEvent = this.handleEvent.bind( this );
		this.handleBlurEvent = this.handleBlurEvent.bind( this );
	}

	componentDidMount() {
		document.addEventListener( 'mousedown', this.handleEvent, true );
		document.addEventListener( 'keyup', this.handleEvent, true );
		document.addEventListener( 'blur', this.handleBlurEvent, true );
	}

	componentWillUnmount() {
		document.removeEventListener( 'mousedown', this.handleEvent, true );
		document.removeEventListener( 'keyup', this.handleEvent, true );
		document.addEventListener( 'blur', this.handleBlurEvent, true );
	}

	activate = () => {
		this.setState( { active: true } );
	};

	deactivate = () => {
		this.setState( { active: false } );
	};

	handleEvent( e ) {
		const { active } = this.state;
		const { disabled, onClickOutside } = this.props;

		const ref = this.ref.current;

		if ( ! ref || disabled ) {
			return;
		}

		if ( ref.contains( e.target ) && ! active ) {
			this.activate();
		} else if ( ! ref.contains( e.target ) && active ) {
			this.deactivate();
			onClickOutside?.();
		}
	}

	handleBlurEvent( e ) {
		const { active } = this.state;
		const { disabled, onClickOutside } = this.props;

		const ref = this.ref.current;

		if ( ! ref || disabled ) {
			return;
		}

		if ( ref.contains( e.target ) && active ) {
			/**
			 * if the blur event happened in the watched element and the click outside
			 * watcher is activated, then we deactivate it
			 */
			this.deactivate();
			onClickOutside?.();
		}
	}

	render() {
		const { children } = this.props;

		// @ts-ignore
		return children( {
			ref: this.ref,
		} );
	}
}

ClickOutside.propTypes = {
	children: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	onClickOutside: PropTypes.func.isRequired,
};

ClickOutside.defaultProps = {
	disabled: false,
};

export default ClickOutside;
