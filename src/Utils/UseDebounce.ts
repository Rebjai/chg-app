import { useState, useEffect } from "react";

export const useDebounce = <T>(value: T, delay: number, callback: (value: T) => void): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        if (value != debouncedValue) {
            
            const timer = setTimeout(() => {
                callback(value);
                setDebouncedValue(value);
            }, delay);
            
            return () => {
                clearTimeout(timer);
            };
        }
    }, [value, delay, callback]);

    return debouncedValue;
};
