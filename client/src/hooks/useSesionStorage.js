import { useState } from 'react';

export const useSesionStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const storedData = sessionStorage.getItem(key);

        return storedData ? JSON.parse(storedData) : defaultValue;
    });

    const setSesionStorageValue = (newValue) => {
        sessionStorage.setItem(key, JSON.stringify(newValue));

        setValue(newValue);
    };

    return [
        value,
        setSesionStorageValue,
    ];
}
