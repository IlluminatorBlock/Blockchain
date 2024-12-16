import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingShape from './shapes/FloatingShape';
import FaceAuth from '../auth/FaceAuth';
import axiosInstance from '../axiosInstance';

const VotingPage = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [votedCandidateId, setVotedCandidateId] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    const [voterId, setVoterId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [capturedImage, setCapturedImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axiosInstance.get('get_candidates/');
                if (response.data.status === 'success') {
                    setCandidates(response.data.candidates);
                } else {
                    setError('Failed to fetch candidates.');
                }
            } catch {
                setError('An error occurred while fetching candidates.');
            }
        };

        fetchCandidates();
    }, []);

    const handleVote = async () => {
        setHasVoted(true);
        setError(null);

        try {
            const response = await axiosInstance.post('vote/', {
                voter_id: voterId,
                username,
                password,
                candidate_id: selectedCandidateId,
                captured_image: capturedImage,
            });
            if (response.data.status === 'success') {
                setVotedCandidateId(selectedCandidateId);
                setTimeout(() => {
                    navigate('/thank-you');
                }, 2000);
            } else {
                setError(response.data.message || 'There was an error processing your vote. Please try again.');
                setHasVoted(false);
            }
        } catch {
            setError('An unexpected error occurred. Please try again.');
            setHasVoted(false);
        }
        setShowModal(false);
    };

    const openModal = (candidateId) => {
        setSelectedCandidateId(candidateId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setVoterId('');
        setUsername('');
        setPassword('');
        setCapturedImage(null);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900 relative overflow-hidden">
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded shadow-md w-96 z-10 text-center">
                <h1 className="text-3xl font-bold text-green-300 mb-6">Vote for Your Candidate</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-6">
                    {candidates.map(candidate => (
                        <div key={candidate.id} className="flex items-center justify-between mb-4 p-4 bg-gray-700 rounded-md shadow-md">
                            <span className={`text-green-200 ${votedCandidateId === candidate.id ? 'text-green-500 font-bold' : ''}`}>
                                {candidate.name}
                            </span>
                            <button 
                                onClick={() => openModal(candidate.id)} 
                                className={`p-2 rounded transition ${hasVoted ? (votedCandidateId === candidate.id ? 'bg-green-500' : 'bg-gray-500 cursor-not-allowed') : 'bg-green-500 hover:bg-green-600'}`}
                                disabled={hasVoted}
                            >
                                {hasVoted ? 'Voted' : 'Vote'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <FloatingShape />

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="bg-gray-800 p-6 rounded shadow-md w-80">
                        <h2 className="text-2xl font-bold text-green-300 mb-4">Enter Voting Details</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleVote(); }}>
                            <div className="mb-4">
                                <label className="block text-green-300 mb-2">Voter ID</label>
                                <input
                                    type="text"
                                    value={voterId}
                                    onChange={(e) => setVoterId(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-700 text-green-300"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-green-300 mb-2">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-700 text-green-300"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-green-300 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-700 text-green-300"
                                    required
                                />
                            </div>
                            <h3 className="text-lg font-bold text-green-300 mb-4 text-center">Face Authentication / KYC</h3>
                            <FaceAuth 
                                onCapture={(data) => {
                                    setCapturedImage(data);
                                    setIsCameraOpen(false);
                                }} 
                                onOpenCamera={() => setIsCameraOpen(true)} 
                            />
                            {capturedImage && <img src={capturedImage} alt="Captured" style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />}
                            <div className="flex justify-between mt-4">
                                <button type="button" onClick={closeModal} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition">Cancel</button>
                                <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">Submit Vote</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VotingPage;