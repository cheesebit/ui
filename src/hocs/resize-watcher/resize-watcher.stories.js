import React from 'react';

import ResizeWatcher from './resize-watcher';

export default {
	title: 'HOCs/ResizeWatcher',
	component: ResizeWatcher,
};

export function Playground() {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool ResizeWatcher HOC ready to be played around.
				Try me :)
			</p>

			<div>
				<ResizeWatcher onResize={() => {}}>
					{({ width }) => {
						return (
							<p className="p-4 bg-gray-200 border">
								Viewport width <code>{width}px</code>
							</p>
						);
					}}
				</ResizeWatcher>

				<div>
					<ResizeWatcher onResize={() => {}}>
						{({ width, ref }) => {
							return (
								<div
									className="p-4 bg-gray-200 border"
									ref={ref}
								>
									Grey area width <code>{width}px</code>
								</div>
							);
						}}
					</ResizeWatcher>
				</div>
			</div>
		</div>
	);
}
