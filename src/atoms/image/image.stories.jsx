import React from 'react';

import Image from './image';

export default {
	title: 'Components/Atoms/Image',
	component: Image,
};

export function Playground() {
	return (
		<div className="block">
			<p className="mb-2">This is me, a cool Image ready to be played around. Try me :)</p>

			<Image src="https://images.unsplash.com/photo-1578030639376-8e9cf3f26b68" />

			<Image src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" />
		</div>
	);
}
