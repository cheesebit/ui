import React from 'react';
import { classy } from '@cheesebit/classy';
import PropTypes from 'prop-types';

import { ImgHTMLAttributes } from 'common/props-dom';
import { Overlay } from '../overlay';
import { pick } from 'common/toolset';
import { Spinner } from '../spinner';

import './image.scss';

const ImgHTMLAttributesProps = Object.keys( ImgHTMLAttributes );

export const Status = {
	loading: 'loading',
	loaded: 'loaded',
	failed: 'failed',
};

// const getPlaceholderSrc = (width, height) =>
//   `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;

/**
 *
 * @param {ImageProps} props
 * @return
 */
function Image( props ) {
	const { className, onLoad, onError, ...others } = props;
	const [ status, setStatus ] = React.useState( Status.loading );

	function handleLoad( e ) {
		setStatus( Status.loaded );

		onLoad?.( e );
	}

	function handleError( e ) {
		setStatus( Status.failed );

		onError?.( e );
	}

	return (
		<div
			className={ classy(
				'cb-image',
				{
					'has-failed': status === Status.failed,
					'is-loading': status === Status.idle,
				},
				className
			) }
			data-testid="cb-image"
		>
			<img
				alt=""
				loading="lazy"
				{ ...pick( ImgHTMLAttributesProps, others ) }
				onLoad={ handleLoad }
				onError={ handleError }
			/>

			{ status === Status.loading && (
				<Overlay theme="light">
					<Spinner />
				</Overlay>
			) }

			{ status === Status.failed && (
				<div className="error" data-testid="image-error">
					:(
				</div>
			) }
		</div>
	);
}

// storybook use only
Image.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
};

export default Image;

/**
 * @typedef {React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>} ImageProps
 */
