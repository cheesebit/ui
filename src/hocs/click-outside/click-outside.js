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
	}

	componentDidMount() {
		document.addEventListener( 'mousedown', this.handleEvent, true );
		document.addEventListener( 'keyup', this.handleEvent, true );
	}

	componentWillUnmount() {
		document.removeEventListener( 'mousedown', this.handleEvent, true );
		document.removeEventListener( 'keyup', this.handleEvent, true );
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

render() {
	const { children } = this.props;

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
