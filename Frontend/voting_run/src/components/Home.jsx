import FloatingShape from './shapes/FloatingShape';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900 relative overflow-hidden">
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded shadow-md w-96 z-10 text-center">
                <h1 className="text-3xl font-bold text-green-300 mb-6">Welcome to Blockchain Based Voting</h1> {/* Updated title */}
                <p className="text-green-200 mb-6">The most secure voting is your right!</p>
                <button 
                    onClick={() => navigate('/voting')} 
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mb-4"
                >
                    Vote
                </button>
                <button 
                    onClick={() => navigate('/signup')} 
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mb-4"
                >
                    Sign Up
                </button>
                <button 
                    onClick={() => navigate('/add-candidate')} 
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mb-4"
                >
                    Add Candidate
                </button>
                <button 
                    onClick={() => navigate('/remove-candidate')} 
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mb-4"
                >
                    Remove Candidate
                </button>
                <button 
                    onClick={() => navigate('/candidate-states')} 
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                >
                    Candidate Details
                </button>
            </div>
            <FloatingShape />
          
        </div>
    );
};

export default HomePage;