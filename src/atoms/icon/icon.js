import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { equals, isNil, pick } from 'common/toolset';
import { DEFAULT } from 'common/constants';
import { SVGAttributes } from 'common/props-dom';
import mapping from './icon-mapping';

import './icon.scss';

const SVGAttributesProps = Object.keys(SVGAttributes);
class Icon extends React.PureComponent {
	get classes() {
		const { className, variant } = this.props;

		return clsx(
			'cb-icon',
			{
				'-danger': equals(variant, 'danger'),
				'-info': equals(variant, 'info'),
				'-success': equals(variant, 'success'),
				'-warn': equals(variant, 'warn'),
			},
			className
		);
	}

	get style() {
		const { size, style = DEFAULT.OBJECT } = this.props;

		return { ...style, width: size, height: size };
	}

	render() {
		const { name } = this.props;

		const IconSVG = mapping[name];

		if (isNil(IconSVG)) {
			return '?';
		}

		return (
			<IconSVG
				{...pick(SVGAttributesProps, this.props)}
				data-testid="cb-icon"
				aria-label={name}
				aria-hidden="true"
				className={this.classes}
				focusable="false"
				style={this.style}
			/>
		);
	}
}

Icon.propTypes = {
	...SVGAttributes,
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	name: PropTypes.oneOf(Object.keys(mapping)).isRequired,
	variant: PropTypes.oneOf(['danger', 'info', 'success', 'warn']),
};

Icon.defaultProps = { size: '1em' };

export default Icon;
