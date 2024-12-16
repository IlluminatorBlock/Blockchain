import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faLock, faCircleUser  } from '@fortawesome/free-solid-svg-icons';
import FloatingShape from './shapes/FloatingShape';
import FaceAuth from '../auth/FaceAuth';
import { useNavigate } from 'react-router-dom';
import Spinner from './shapes/Spinner';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [voterId, setVoterId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!username || !password || !voterId) {
            alert('All fields are required.');
            return; // Stop the function if any field is empty
        }

        setIsLoading(true); // Set loading state to true

        // Simulate a login process with a timeout
        setTimeout(() => {
            setIsLoading(false); // Reset loading state
            toast.success('Login successful!'); // Show success alert
            navigate('/voting'); // Navigate to the voting page
        }, 2000); // 2 seconds delay
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900 relative overflow-hidden">
            <FloatingShape />
            <div className={`bg-gray-800 bg-opacity-70 p-8 rounded shadow-md w-96 z-10 ${isVisible ? 'fade-in' : ''}`}>
                <h2 className="text-2xl font-bold text-green-300 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4 flex items-center">
                        <FontAwesomeIcon icon={faCircleUser } className="text-green-300 mr-2" />
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
                            type="number"
                            placeholder="Voter ID"
                            value={voterId}
                            onChange={(e) => {
                                // Limit the input to a maximum of 10 digits
                                if (e.target.value.length <= 10) {
                                    setVoterId(e.target.value);
                                }
                            }}
                            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-green-300"
                            required
                        />
                    </div>
                    <FaceAuth />
                    <button 
                        type="submit" 
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mt-4 flex items-center justify-center" 
                        disabled={isLoading} // Disable button while loading
                    >                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <Spinner /> {/* Show spinner */}
                            </div>
                        ) : (
                            'Login' // Show text when not loading
                        )}
                    </button>
                    <p className='text-white flex justify-center'>Not yet Registered?<a href="/signup" className="text-green-500 flex ml-2">Signup</a></p>
                </form>
            </div>
        </div>
    );
};

export default Login;