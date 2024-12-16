import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard, faLock } from '@fortawesome/free-solid-svg-icons';
import FloatingShape from './shapes/FloatingShape';
import FaceAuth from '../auth/FaceAuth';
import PasswordStrengthMeter from './utils/PasswordStrengthMeter';
import axiosInstance from '../axiosInstance';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [aadharId, setAadharId] = useState('');
    const [voterId, setVoterId] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [capturedImage, setCapturedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('register_voter/', {
                voter_id: voterId,
                full_name: fullName,
                adhaar_card: aadharId,
                username,
                password,
            });
            if (response.data.status === 'success') {
                setSuccessMessage('USER REGISTERED SUCCESSFULLY!');
                setError(''); // Clear any previous error messages
                setIsModalOpen(true); // Open the modal
                // Clear the form fields after successful registration
                setFullName('');
                setUsername('');
                setPassword('');
                setAadharId('');
                setVoterId('');
                setCapturedImage(null); // Clear captured image if any
            } else {
                setError(response.data.message || 'An error occurred during registration.');
                setSuccessMessage(''); // Clear success message if there's an error
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred during registration.');
            setSuccessMessage(''); // Clear success message if there's an error
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900 relative`} style={{
            backgroundAttachment: 'fixed',
        }}>
            <FloatingShape />
            
            <div
                style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.7)',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '24rem',
                    zIndex: 10,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    paddingRight: '15px',
                    scrollbarWidth: 'none',
                    margin: '0 auto',
                }}
                className="scrollable-container"
            >
                <h2 className="text-2xl font-bold text-green-300 mb-6 text-center">Signup</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4 flex items-center">
                        <FontAwesomeIcon icon={faUser} className="text-green-300 mr-2" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
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
                    <PasswordStrengthMeter password={password} />
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
                        }} 
                    />
                    {capturedImage && <img src={capturedImage} alt="Captured" style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />}
                    
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mt-4">Signup</button>
                </form>

                <p className="mt-4 text-center text-gray-300">
                    Already a user? <a href="/voting" className="text-green-500 hover:underline">Vote</a>
                </p>
            </div>

            {/* Success Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-20">
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div> {/* Translucent and blurred background */}
                    <div className="bg-gradient-to-br from-green-600 via-teal-600 to-green-800 p-8 rounded-lg text-center text-white w-3/4 max-w-md z-30">
                        <h2 className="text-4xl font-extrabold mb-4">USER REGISTERED SUCCESSFULLY!</h2>
                        <p className="text-xl mb-6">You can now proceed to vote.</p>
                        <button
                            onClick={closeModal}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
