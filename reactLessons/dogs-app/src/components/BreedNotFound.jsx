import React from 'react'
import { useRouteError } from 'react-router-dom';

const BreedNotFound = () => {
    const error = useRouteError();

    return (
        <div>
            Breed Not Found
            <i>{error.statusText || error.message}</i>
        </div>
    );
};

export default BreedNotFound;
