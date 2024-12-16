import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Spinner = () => {
    return (
        <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="30"
            visible={true}
        />
    );
};

export default Spinner;