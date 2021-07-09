import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { omit, isNil } from 'common/toolset';
import { resolveProp, evaluateBorderless, evaluatePaddingless } from 'common/props-toolset';

import './box.scss';

const OMITTED_PROPS = [
	'as',
	'borderless',
	'children',
	'leading',
	'paddingless',
	'block',
	'trailing',
];

class Box extends React.PureComponent {
	get classes() {
		const { borderless, paddingless, block, className } = this.props;

		return clsx(
			'cb-box',
			{ '-block': block },
			evaluateBorderless( borderless ),
			evaluatePaddingless( paddingless ),
			className,
		);
	}

	get style() {
		const { leading, children, trailing, style } = this.props;

		const widths = [];

		! isNil( leading ) && widths.push( 'min-content' );
		! isNil( children ) && widths.push( '1fr' );
		! isNil( trailing ) && widths.push( 'min-content' );

		return {
			gridTemplateColumns: widths.join( ' ' ),
			...style,
		};
	}

	renderLeading() {
		const { leading } = this.props;

		return (
			! isNil( leading ) && (
				<span className="leading" { ...resolveProp( leading, 'children' ) } />
			)
		);
	}

	renderChildren() {
		const { children } = this.props;

		return children;
		// return (
		//   !isNil(children) && (
		//     <span className="children" {...resolveProp(children, 'children')} />
		//   )
		// );
	}

	renderTrailing() {
		const { trailing } = this.props;

		return (
			! isNil( trailing ) && (
				<span className="trailing" { ...resolveProp( trailing, 'children' ) } />
			)
		);
	}

	render() {
		const { as: Tag = 'div', forwardedRef, ...others } = this.props;

		return (
			<Tag
				data-testid="cb-box"
				ref={ forwardedRef }
				{ ...omit( OMITTED_PROPS, others ) }
				style={ this.style }
				className={ this.classes }
			>
				{ this.renderLeading() }
				{ this.renderChildren() }
				{ this.renderTrailing() }
			</Tag>
		);
	}
}

Box.propTypes = {
	children: PropTypes.node,
	leading: PropTypes.oneOfType( [
		PropTypes.node,
		PropTypes.element,
		PropTypes.func,
	] ),
	borderless: PropTypes.oneOfType( [
		PropTypes.bool,
		PropTypes.oneOf( [
			'top',
			'right',
			'bottom',
			'left',
			'horizontal',
			'vertical',
		] ),
		PropTypes.arrayOf(
			PropTypes.oneOf( [
				'top',
				'right',
				'bottom',
				'left',
				'horizontal',
				'vertical',
			] ),
		),
	] ),
	trailing: PropTypes.oneOfType( [
		PropTypes.node,
		PropTypes.element,
		PropTypes.func,
	] ),
	paddingless: PropTypes.oneOfType( [
		PropTypes.bool,
		PropTypes.oneOf( [
			'top',
			'right',
			'bottom',
			'left',
			'horizontal',
			'vertical',
		] ),
		PropTypes.arrayOf(
			PropTypes.oneOf( [
				'top',
				'right',
				'bottom',
				'left',
				'horizontal',
				'vertical',
			] ),
		),
	] ),
	block: PropTypes.bool,
};

Box.defaultProps = {
	block: false,
	borderless: false,
};

export default Box;
