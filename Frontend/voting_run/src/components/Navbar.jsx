import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img 
                            src="https://images.deepai.org/art-image/84b9bc5be2ff417f897e3c1d4efaacf0/blockchain-based-voting-logo-for-that-any-cre_VwnaLnb.jpg" 
                            alt="Logo" 
                            className="h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-between flex-grow ml-8">
                        <div className="flex space-x-6">
                            <Link to="/signup" className="text-green-300 hover:text-green-400 transition-colors duration-200">Sign Up</Link>
                            <Link to="/voting" className="text-green-300 hover:text-green-400 transition-colors duration-200">Vote</Link>
                            <Link to="/add-candidate" className="text-green-300 hover:text-green-400 transition-colors duration-200">Add Candidate</Link>
                            <Link to="/remove-candidate" className="text-green-300 hover:text-green-400 transition-colors duration-200">Remove Candidate</Link>
                            <Link to="/candidate-states" className="text-green-300 hover:text-green-400 transition-colors duration-200">Candidate Details</Link>
                        </div>
                        <blockquote className="text-gray-300 italic text-sm ml-6 border-l-2 border-green-500 pl-4">
                            &quot;The most powerful weapon in the world is the vote.&quot;
                            <footer className="text-green-400 text-xs mt-1">– Lyndon B. Johnson</footer>
                        </blockquote>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                    <div className="px-2 pt-2 pb-3 space-y-3">
                        <Link to="/signup" className="block text-green-300 hover:text-green-400 transition-colors duration-200">Sign Up</Link>
                        <Link to="/voting" className="block text-green-300 hover:text-green-400 transition-colors duration-200">Vote</Link>
                        <Link to="/add-candidate" className="block text-green-300 hover:text-green-400 transition-colors duration-200">Add Candidate</Link>
                        <Link to="/remove-candidate" className="block text-green-300 hover:text-green-400 transition-colors duration-200">Remove Candidate</Link>
                        <Link to="/candidate-states" className="block text-green-300 hover:text-green-400 transition-colors duration-200">Candidate Details</Link>
                        <blockquote className="text-gray-300 italic text-sm pt-4 mt-4 border-t border-gray-700">
                            &quot;The most powerful weapon in the world is the vote.&quot;
                            <footer className="text-green-400 text-xs mt-1">– Lyndon B. Johnson</footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;