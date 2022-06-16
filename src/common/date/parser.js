function merge( m1, m2 ) {
	const merged = {};

	for ( const key in { ...m1, ...m2 } ) {
		merged[ key ] = m1[ key ] || [];

		if ( key in m2 ) {
			if ( Array.isArray( m2[ key ] ) ) {
				merged[ key ].concat( m2[ key ] );
			} else {
				merged[ key ].push( m2[ key ] );
			}

			merged[ key ] = merged[ key ].sort( function comparator( a, b ) {
				return b - a;
			} );
		}
	}

	return merged;
}

function serialize( expression ) {
	if ( expression == null ) {
		return [];
	}

	expression = String( expression ).trim();

	if ( expression.length === 0 ) {
		return [];
	}

	let token;
	let counter;
	const batata = [];

	for ( let index = 0; index < expression.length; index++ ) {
		if ( token == null ) {
			token = expression[ index ];
			counter = 1;
		} else if ( token !== expression[ index ] ) {
			batata.push( [ token, counter ] );
			token = expression[ index ];
			counter = 1;
		} else {
			counter++;
		}

		if ( index === expression.length - 1 ) {
			batata.push( [ token, counter ] );
		}
	}

	return batata;
}

export default function parser( expressions ) {
	let map = {};

	for ( const expression of expressions ) {
		map = serialize( expression ).reduce( function (
			acc,
			[ token, counter ]
		) {
			return merge( acc, { [ token ]: counter } );
		},
		map );
	}

	return function parse( text ) {
		const slices = [];
		const serialized = serialize( text );

		for ( let i = 0; i < serialized.length; i++ ) {
			const [ token, counter ] = serialized[ i ];
			const counters = map[ token ];

			// unknown token
			if ( counters == null ) {
				slices.push( String( token ).repeat( counter ) );
				continue;
			}

			let j = 0;
			let remaining = counter;
			while ( remaining > 0 && j < counters.length ) {
				while ( remaining >= counters[ j ] ) {
					slices.push( String( token ).repeat( counters[ j ] ) );
					remaining -= counters[ j ];
				}
				j++;
			}

			if ( remaining > 0 ) {
				slices.push( String( token ).repeat( remaining ) );
			}
		}

		return slices;
	};
}
