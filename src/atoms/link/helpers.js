import { compact, compose, isBlank } from '../../common/toolset';
import { DEFAULT } from '../../common/constants';
import { INSECURE_HREF } from './constants';

export const checkHref = ( props ) => {
	const { href, ...others } = props;

	if ( isBlank( href ) ) {
		return props;
	}

	if ( INSECURE_HREF.test( `${ href }` ) ) {
		// security risk, thus, removing it
		return others;
	}

	return props;
};

export const checkTarget = ( props ) => {
	let changes = {};
	const { target, rel } = props;

	if ( isBlank( target ) ) {
		return props;
	}

	const sanitizedRel = new Set( compact( ( rel || DEFAULT.STRING ).split( /\s+/ ) ) );

	if ( target === '_blank' ) {
		sanitizedRel.add( 'noopener' );
	}

	/**
	 * To avoid exploitation of the window.opener API, Adding noreferrer,
	 * as recommended in https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
	 */
	sanitizedRel.add( 'noreferrer' );

	changes = { rel: Array.from( sanitizedRel ).join( ' ' ) };

	return { ...props, ...changes };
};

export const sanitizeProps = ( props ) => {
	return compose( checkTarget, checkHref )( props );
};
