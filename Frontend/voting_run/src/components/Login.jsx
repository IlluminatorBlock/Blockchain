import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faFingerprint, faCircleUser, faLock } from '@fortawesome/free-solid-svg-icons';
import FloatingShape from './shapes/FloatingShape';
import FaceAuth from '../auth/FaceAuth'; // Import the FaceAuth component
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState(''); // State for username
    const [password, setPassword] = useState(''); // State for password
    const [voterId, setVoterId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate checking Voter ID and Biometric Data
        const registeredVoterId = 'validVoterId'; // Replace with actual registered voter ID
        const registeredBiometricData = 'validBiometricData'; // Replace with actual biometric data

        if (voterId !== registeredVoterId || biometricData !== registeredBiometricData) {
            setError('The registered number on the Aadhar card and the registered number on the Voter ID should match.');
        } else {
            setError('');
            navigate('/dashboard'); // Navigate to the dashboard or next page
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900 relative overflow-hidden">
            <FloatingShape />
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded shadow-md w-96 z-10">
                <h2 className="text-2xl font-bold text-green-300 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4 flex items-center">
                        <FontAwesomeIcon icon={faCircleUser} className="text-green-300 mr-2" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-green-300"
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <FontAwesomeIcon icon={faLock} className="text-green-300 mr-2" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-green-300"
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <FontAwesomeIcon icon={faIdCard} className="text-green-300 mr-2" />
                        <input
                            type="text"
                            placeholder="Voter ID"
                            value={voterId}
                            onChange={(e) => setVoterId(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-green-300"
                            required
                        />
                    </div>
                  
                    <FaceAuth /> {/* Include the FaceAuth component here */}
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mt-4">Login</button>
                    <p className='text-white flex justify-center'>Not yet Registered?<a href="/signup" className=" text-green-500 flex ml-2">Signup</a></p>
                </form>
            </div>
        </div>
    );
};

export default Login;