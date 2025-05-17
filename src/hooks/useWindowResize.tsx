"use client"

//Importing built-in dependencies
import { useState, useEffect } from 'react';

/**
* A custom hook that returns a boolean value indicating whether the window width is larger than a given threshold
* @param {number} width
* @param {boolean} defaultState
* @return {boolean} isLargerScreen
*/
export function useWindowResize(width: number, defaultState: boolean = true): boolean {
	const [isLargeScreen, setIsLargeScreen] = useState<boolean>(defaultState);

    function isWindowBigger(width: number): boolean {
        return window.innerWidth > width;
    }

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);

		return () => window.removeEventListener('resize', handleWindowResize);
        
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); 

	function handleWindowResize() {
		setIsLargeScreen(isWindowBigger(width));
	}

	return isLargeScreen;
}