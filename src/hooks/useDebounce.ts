import { useState, useEffect } from "react";

/**
 *
 * @param value String
 * @param delay Time delay millisecond
 * @returns A array with two element: [debouncedValue, isLoading]
 */

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            setIsLoading(false);
        }, delay);
        // cleanup function:
        return () => clearTimeout(handler);
    }, [value, delay]);
    return [debouncedValue, isLoading];
}

export default useDebounce;
