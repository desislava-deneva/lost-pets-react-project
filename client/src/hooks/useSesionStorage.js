import { useState } from 'react';

export const useSesionStorage = (defoultValue) => {
    const [value, setValue] = useState(defoultValue);


    return[
        value,
        setValue
    ];
}

