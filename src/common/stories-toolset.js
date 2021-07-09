import { each, merge, toArray } from './toolset';
import { DEFAULT } from './constants';

/**
 * Setup default parameters to Playground-type story (one that allows
 * controls and actions panels to be shown).
 *
 * @param {JSX.Element} Story - story to be configured.
 * @param {Object} overrides - overrides to story configuration.
 * @return {void}
 */
export function setupDefaultStory( Story, overrides ) {
	Story.parameters = merge(
		{ options: { showPanel: true } },
		overrides?.parameters || DEFAULT.OBJECT,
	);
}

/**
 * Setup default parameters to Showcase-type story (one that DOES NOT allow
 * controls and actions panels to be shown).
 *
 * @param {JSX.Element | JSX.Element[]} Stories - story to be configured.
 * @param {Object} overrides - overrides to story configuration.
 * @return {void}
 */
export function setupDerivedStory( Stories, overrides ) {
	each( function setupStory( Story ) {
		Story.parameters = merge(
			{ options: { showPanel: false } },
			overrides?.parameters || DEFAULT.OBJECT,
		);
	}, toArray( Stories ) );
}
