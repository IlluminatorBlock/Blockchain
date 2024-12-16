// PasswordStrengthMeter.js
import React, { useEffect, useState } from 'react';

const PasswordStrengthMeter = ({ password }) => {
    const [strength, setStrength] = useState('');
    const [strengthColor, setStrengthColor] = useState('');
    const [strengthPoints, setStrengthPoints] = useState(0);

    useEffect(() => {
        let score = 0;

        if (password.length > 8) score += 1; // Length criteria
        if (/[a-z]/.test(password)) score += 1; // Lowercase
        if (/[A-Z]/.test(password)) score += 1; // Uppercase
        if (/\d/.test(password)) score += 1; // Numbers
        if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special characters

        setStrengthPoints(score);

        switch (score) {
            case 0:
            case 1:
                setStrength('Very Weak');
                setStrengthColor('red');
                break;
            case 2:
                setStrength('Weak');
                setStrengthColor('orange');
                break;
            case 3:
                setStrength('Satisfactory');
                setStrengthColor('yellow');
                break;
            case 4:
                setStrength('Good');
                setStrengthColor('lightgreen');
                break;
            case 5:
                setStrength('Strong');
                setStrengthColor('green');
                break;
            default:
                setStrength('');
                setStrengthColor('');
        }
    }, [password]);

    return (
        <div>
            <div style={{
                height: '10px',
                width: '100%',
                backgroundColor: 'lightgray',
                borderRadius: '5px',
                margin: '10px 0'
            }}>
                <div style={{
                    height: '100%',
                    width: `${(strengthPoints / 5) * 100}%`,
                    backgroundColor: strengthColor,
                    borderRadius: '5px',
                    transition: 'width 0.3s'
                }} />
            </div>
            <p style={{ color: strengthColor }}>{strength}</p>
        </div>
    );
};

export default PasswordStrengthMeter;