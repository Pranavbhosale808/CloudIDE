import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 w-full gap-10">

      {/* Right: Text Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center text-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold mb-6">
            Welcome to <span className="text-blue-400">CloudIDe</span>
          </h1>
          <p className="text-3xl mb-8">
            A smarter way to code — coming soon!
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-3 rounded-lg text-lg font-semibold shadow-lg ml-4" 
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}