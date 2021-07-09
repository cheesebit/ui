import { useCallback, useEffect, useRef } from 'react';

const useUnmounted = () => {
	const isUnmountedRef = useRef( false );

	useEffect( () => {
		return () => {
			isUnmountedRef.current = true;
		};
	}, [] );

	const isUnmounted = useCallback( () => {
		return isUnmountedRef.current;
	}, [] );

	return isUnmounted;
};

export default useUnmounted;
