export default function UniqueMode( manager, attribute ) {
	return {
		reset() {
			manager._reset( attribute );
		},
		set( value, id ) {
			this.reset();
			manager._assign( attribute, value, id );
		},
		unset() {
			this.reset();
		},
	};
}
