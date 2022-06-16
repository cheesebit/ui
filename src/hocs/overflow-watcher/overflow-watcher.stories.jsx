import React from 'react';
import { classy } from '@cheesebit/classy';

import OverflowWatcher from './overflow-watcher';

export default {
	title: 'HOCs/OverflowWatcher',
	component: OverflowWatcher,
};

export function Playground() {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool OverflowWatcher HOC ready to be played
				around. Try me :)
			</p>

			<OverflowWatcher
				selector=".ow-story-child"
				options={ {
					add: () => 0,
				} }
				onUpdate={ () => {} }
			>
				{ ( { width, ref, to } ) => {
					return (
						<React.Fragment>
							<p className="mb-4 text-sm">
								Host element has width <code>{ width }px</code>
							</p>
							<div
								ref={ ref }
								className="flex flex-row flex-wrap w-full bg-gray-200 border "
							>
								{ Array.from( Array( 20 ).keys() ).map(
									( n ) => (
										<span
											key={ n }
											className={ classy(
												'inline-flex items-center justify-center w-12 ow-story-child border border-gray-200 bg-gray-400',
												{
													'opacity-25': n > to,
													'opacity-100': n <= to,
												}
											) }
										>
											{ n }
										</span>
									)
								) }
							</div>
						</React.Fragment>
					);
				} }
			</OverflowWatcher>
		</div>
	);
}
