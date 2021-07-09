import React from 'react';

import generator from 'test/data-generator';
import Dropdown from './dropdown';

export default {
	title: 'Molecules/Dropdown',
	component: Dropdown,
	argTypes: {
		unroll: {
			control: {
				type: 'select',
				options: [ 'right', 'left', 'block' ],
			},
		},
		className: {
			table: {
				disable: true,
			},
		},
	},
};

const generateDropdownOptions = () =>
	generator.array( ( { index } ) => {
		const label = generator.word( { length: 10 } );

		return {
			id: generator.id(),
			children: label,
			// icon: generator.pick(keys(icons)),
			onClick: () => {
				// eslint-disable-next-line no-alert
				alert( `You clicked ${ label } (Index ${ index })` );
			},
		};
	}, 5 );

const ITEMS = generateDropdownOptions();

// export function Playground(args) {
//   return (
//     <div className="block">
//       <p className="mb-2">This is me, a cool Dropdown.</p>
//       <p className="mb-2">
//         As I'm <b>still a work in progress</b>, there's some maintenance going
//         on, but soon enough you will be able to try me :)
//       </p>

//       <div className="flex flex-row space-x-4">
//         <Dropdown
//           toggle={({ disabled, collapsed, onClick }) => (
//             <Dropdown.Toggle
//               disabled={disabled}
//               collapsed={collapsed}
//               onClick={onClick}
//               icon="more-horizontal"
//               trailing={null}
//               borderless
//             />
//           )}
//           items={ITEMS}
//           {...args}
//         />
//         <Dropdown
//           unroll="block"
//           toggle="Action"
//           items={ITEMS}
//           className="w-64"
//         />
//         <Dropdown
//           toggle={({ disabled, collapsed, onClick }) => (
//             <Dropdown.Toggle
//               disabled={disabled}
//               collapsed={collapsed}
//               onClick={onClick}
//               icon="more-horizontal"
//               borderless
//             />
//           )}
//           items={ITEMS}
//           unroll="left"
//         />{' '}
//         */}
//       </div>
//     </div>
//   );
// }

export function Playground( args ) {
	return <Dropdown toggle="Action" hoverable items={ ITEMS } { ...args } />;
}
