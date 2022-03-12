import React from 'react';

import { Block } from './block';
import { Checkbox } from '../checkbox';
import generator from 'test/data-generator';
import Page from './page';

export default {
	title: 'Components/Organisms/Page',
	component: Page,
	parameters: {
		options: { showPanel: false },
	},
};

export function Playground() {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Page block ready to be played around. Try me :)
			</p>

			<Page>
				<Page.Header>
					<h1 className="text-2xl font-semibold">{generator.sentence({ words: 5 })}</h1>
				</Page.Header>
				<Page.Body>
					<Block main borderless={['top', 'horizontal']}>
						<p>
							This is the main block. Notice how its borders are a little darker than
							a regular block.
						</p>
					</Block>
					<Block borderless>
						<p>{generator.paragraph()}</p>
					</Block>
					<Block borderless={['top', 'horizontal']}>
						<p>{generator.paragraph()}</p>
						<p>{generator.paragraph()}</p>
						<p>{generator.paragraph()}</p>
					</Block>
					<Block borderless>
						<p>This is just a regular block</p>
					</Block>
					<Block borderless={['bottom', 'horizontal']} paddingless="vertical">
						<Checkbox
							aria-labelledby="checkbox-label answer-1"
							name="checkbox-generic"
							value="1"
						>
							I agree with the terms.
						</Checkbox>
					</Block>
				</Page.Body>
			</Page>
		</div>
	);
}
