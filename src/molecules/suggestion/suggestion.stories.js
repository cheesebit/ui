import React from 'react';

import Suggestion from './suggestion';

export default {
	title: 'Molecules/Suggestion',
	component: Suggestion,
};

const adapter = {
	getID: ( item ) => item.value,
	getLabel: ( item ) => item.label,
};

function useDs1() {
	return {
		adapter,
		fetch: async function ds1( { query } ) {
			return new Promise( ( resolve ) => {
				setTimeout( () => {
					resolve(
						[
							{
								value: 'apple',
								label: 'apple',
							},
							{
								value: 'banana',
								label: 'banana',
							},
							{
								value: 'coconut',
								label: 'coconut',
							},
							{
								value: 'kiwi',
								label: 'kiwi',
							},
							{
								value: 'pineapple',
								label: 'pineapple',
							},
							{
								value: 'watermelon',
								label: 'watermelon',
							},
							{
								value: 'orange',
								label: 'orange',
							},
						].filter( ( { value } ) => value.indexOf( query ) > -1 ),
					);
				}, 50 );
			} );
		},
	};
}

function useDs2() {
	return {
		adapter,
		fetch: function ds2( { query } ) {
			return [
				{
					value: 'monkey',
					label: 'monkey',
				},
				{
					value: 'bee',
					label: 'bee',
				},
				{
					value: 'dog',
					label: 'dog',
				},
				{
					value: 'cat',
					label: 'cat',
				},
				{
					value: 'tucan',
					label: 'tucan',
				},
				{
					value: 'sloth',
					label: 'sloth',
				},
				{
					value: 'zebra',
					label: 'zebra',
				},
			].filter( ( { value } ) => value.indexOf( query ) > -1 );
		},
	};
}

function useDs3() {
	return {
		adapter,
		fetch: async function ds2( { } ) {
			return new Promise( ( _, reject ) => {
				setTimeout( () => {
					reject( [] );
				}, 500 );
			} );
		},
	};
}

function useDs4() {
	return {
		adapter,
		fetch: async function ds4( { query } ) {
			return new Promise( ( resolve ) => {
				setTimeout( () => {
					resolve(
						[
							{
								value: 'red',
								label: 'red',
							},
							{
								value: 'blue',
								label: 'blue',
							},
							{
								value: 'green',
								label: 'green',
							},
							{
								value: 'yellow',
								label: 'yellow',
							},
							{
								value: 'pink',
								label: 'pink',
							},
							{
								value: 'gray',
								label: 'gray',
							},
							{
								value: 'purple',
								label: 'purple',
							},
						].filter( ( { value } ) => value.indexOf( query ) > -1 ),
					);
				}, 200 );
			} );
		},
	};
}

export function Playground( args ) {
	return (
		<div className="block">
			<p className="mb-2">This is me, a cool Suggestion.</p>
			<p className="mb-2">
				As I&apos;m <b>still a work in progress</b>, there&apos;s some maintenance going
				on, but soon enough you will be able to try me :)
			</p>

			<div style={ { width: 250 } }>
				<Suggestion
					{ ...args }
					delay={ 450 }
					datasources={ [ useDs1, useDs2, useDs3, useDs4 ] }
				/>
			</div>
		</div>
	);
}
