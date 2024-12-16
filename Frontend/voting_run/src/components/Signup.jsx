import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faIdCard, faLock } from '@fortawesome/free-solid-svg-icons';
import FloatingShape from './shapes/FloatingShape';
import FaceAuth from '../auth/FaceAuth'; // Import the FaceAuth component
import { useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from './utils/PasswordStrengthMeter'; // Import the PasswordStrengthMeter component


const Signup = () => {
    const [FullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [aadharId, setAadharId] = useState('');
    const [voterId, setVoterId] = useState('');
    const [error, setError] = useState('');
    const [capturedImage, setCapturedImage] = useState(null);
    const navigate = useNavigate();
    const [isCameraOpen, setIsCameraOpen] = useState(false); // State for camera visibility

    const handleSignup = (e) => {
        e.preventDefault();
            navigate('/voting'); 
        }

    return (
        <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900 relative`} style={{
            backgroundAttachment: 'fixed',
        }}>
            <FloatingShape />
            <div
                style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.7)', // bg-gray-800 with opacity
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '24rem',
                    zIndex: 10,
                    maxHeight: '90vh', // Limit height for scrolling
                    overflowY: 'auto', // Enable vertical scrolling
                    paddingRight: '15px', // Prevent content from being cut off
                    scrollbarWidth: 'none', // Hide scrollbar for Firefox
                    margin: '0 auto', // Center the container
                }}
                className="scrollable-container"
            >
                <h2 className="text-2xl font-bold text-green-300 mb-6 text-center">Signup</h2>
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
                        <FontAwesomeIcon icon={faUser } className="text-green-300 mr-2" />
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
                    <PasswordStrengthMeter password={password} /> {/* Add the strength meter here */}
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
                    
                    <h3 className="text-lg font-bold text-green-300 mb-4 text-center">Face Authentication / KYC</h3>
                    
                    <FaceAuth 
                        onCapture={(data) => {
                            setCapturedImage(data);
                            setIsCameraOpen(false); // Close camera after capturing
                        }} 
                        onOpenCamera={() => setIsCameraOpen(true)} 
                    />
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