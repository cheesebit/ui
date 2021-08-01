import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { equals, isNil } from '../../common/toolset';
import { DEFAULT } from '../../common/constants';
import { SVGAttributes } from '../../common/props-dom';
import mapping from './icon-mapping';

import './icon.scss';

export const Variant = {
	danger: 'danger',
	info: 'info',
	success: 'success',
	warn: 'warn',
};

class Icon extends React.PureComponent {
	get classes() {
		const { className, variant } = this.props;

		return clsx(
			'cb-icon',
			{
				'-danger': equals( variant, Variant.danger ),
				'-info': equals( variant, Variant.info ),
				'-success': equals( variant, Variant.success ),
				'-warn': equals( variant, Variant.warn ),
			},
			className,
		);
	}

	get style() {
		const { size, style = DEFAULT.OBJECT } = this.props;

		return { ...style, width: size, height: size };
	}

	render() {
		const { name } = this.props;

		const IconSVG = mapping[ name ];

		if ( isNil( IconSVG ) ) {
			return '?';
		}

		return (
			<IconSVG
				className={ this.classes }
				aria-label={ name }
				focusable="false"
				aria-hidden="true"
				style={ this.style }
				data-testid="cb-icon"
			/>
		);
	}
}

Icon.propTypes = {
	...SVGAttributes,
	size: PropTypes.number,
	name: PropTypes.oneOf( Object.keys( mapping ) ).isRequired,
	variant: PropTypes.oneOf( [
		Variant.danger,
		Variant.info,
		Variant.success,
		Variant.warn,
	] ),
};

Icon.defaultProps = { size: 16 };

export default Icon;
