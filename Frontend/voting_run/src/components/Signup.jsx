import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faIdCard, faFingerprint, faLock } from '@fortawesome/free-solid-svg-icons';
import FloatingShape from './shapes/FloatingShape';
import FaceAuth from '../auth/FaceAuth'; // Import the FaceAuth component
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [FullName,setFullName]=useState('');
    const [username, setUsername] = useState(''); // State for username
    const [password, setPassword] = useState(''); // State for password
    const [aadharId, setAadharId] = useState('');
    const [voterId, setVoterId] = useState('');
    const [error, setError] = useState('');
    const [capturedImage, setCapturedImage] = useState(null);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        // Simulate checking Aadhar and Voter ID
        if (aadharId !== 'validAadharId' || voterId !== 'validVoterId') { // Replace with actual validation logic
            setError('Aadhar and Voter ID do not match.');
        } else {
            setError('');
            navigate('/otp-verification'); // Navigate to OTP verification page
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900 relative overflow-hidden">
            <FloatingShape />
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded shadow-md w-96 z-10">
                <h2 className="text-2xl font-bold text-green-300 mb-6">Signup</h2>
                <form onSubmit={handleSignup}>
                <div className="mb-4 flex items-center">
                        <FontAwesomeIcon icon={faUser } className="text-green-300 mr-2" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={FullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-green-300"
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <FontAwesomeIcon icon={faUser} className="text-green-300 mr-2" />
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
                            maxLength="12"
                            placeholder="Aadhar Card (12 digits)"
                            value={aadharId}
                            onChange={(e) => setAadharId(e.target.value)}
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
                    {error && <p className="text-red-500">{error}</p>}
                    
                    {/* Title for Face Authentication */}
                    <h3 className="text-lg font-bold text-green-300 mb-4">Face Authentication / KYC</h3>
                    
                    <FaceAuth onCapture={(data) => setCapturedImage(data)} /> {/* Include the FaceAuth component here */}
                    {capturedImage && <img src={capturedImage} alt="Captured" style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />}
                    
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mt-4">Signup</button>
                </form>
                <p className="mt-4 text-center text-gray-300">
                    Already a user? <a href="/login" className="text-green-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;