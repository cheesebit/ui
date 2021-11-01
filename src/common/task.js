// Based on https://gist.github.com/andrewcourtice/ef1b8f14935b409cfe94901558ba5594

function safeRun( bodyInvokee, finallyInvokee ) {
	return ( ...args ) => {
		try {
			return bodyInvokee( ...args );
		} finally {
			finallyInvokee();
		}
	};
}

class Task extends Promise {
/**
 * @class
 * @param {*} executor
 * @param {AbortController} controller
 */
	constructor( executor, controller = new AbortController() ) {
		if ( controller.signal.aborted ) {
			throw new Error( 'Cannot attach task to an already aborted controller' );
		}

		const listeners = new Set();

		const addListener = ( listener ) => {
			listeners.add( listener );
			controller.signal.addEventListener( 'abort', listener );
		};

		const removeListener = ( listener ) => {
			listeners.delete( listener );
			controller.signal.removeEventListener( 'abort', listener );
		};

		const cleanup = () => {
			if ( listeners.size > 0 ) {
				listeners.forEach( removeListener );
			}
		};

		super( ( _resolve, _reject ) => {
			const resolve = safeRun( _resolve, cleanup );
			const reject = safeRun( _reject, cleanup );

			const onAbort = ( callback ) => {
				const listener = safeRun(
					() => callback( ),
					() => removeListener( listener ),
				);

				addListener( listener );
			};

			executor( resolve, reject, controller, onAbort );
		} );

		this.controller = controller;
	}

	get signal() {
		return this.controller.signal;
	}

	get hasAborted() {
		return this.signal.aborted;
	}

	abort( ) {
		this.controller.abort();

		return this;
	}
}

export default Task;
