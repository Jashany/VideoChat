import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ScheduleMeeting from '../components/ScheduleMeeting';
import { Video, Calendar, Users, LogOut, User as UserIcon } from 'lucide-react';

export default function Landing() {
  const [roomId, setRoomId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const createMeeting = () => {
    const name = user?.name || displayName.trim();
    if (!name) {
      alert('Please enter your name or sign in');
      return;
    }
    setIsCreating(true);
    const newRoomId = Math.random().toString(36).substring(2, 9);
    setTimeout(() => {
      navigate(`/room/${newRoomId}?name=${encodeURIComponent(name)}`);
    }, 300);
  };

  const joinMeeting = () => {
    const name = user?.name || displayName.trim();
    if (!name) {
      alert('Please enter your name or sign in');
      return;
    }
    if (!roomId.trim()) {
      alert('Please enter a meeting ID');
      return;
    }
    navigate(`/room/${roomId}?name=${encodeURIComponent(name)}`);
  };

  const openScheduleMeeting = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setIsScheduleOpen(true);
  };

  return (
    <div className="h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 min-h-[60px] flex flex-row w-full items-center justify-between">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-base sm:text-xl font-semibold text-gray-900">Video Meet</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/my-meetings')}
                  className="px-2 py-1.5 sm:px-4 sm:py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-1 sm:gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">My Meetings</span>
                </button>
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                  <UserIcon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="px-4 py-1.5 sm:px-6 sm:py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm sm:text-base font-medium transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 lg:py-16 flex min-h-[calc(100vh-60px)] items-center overflow-y-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">
          {/* Left - Hero */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Video meetings for everyone
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Connect, collaborate, and create from anywhere with secure, high-quality video calls.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">Free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">Easy</span>
              </div>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm w-full max-w-md mx-auto lg:max-w-none">
            {!user && (
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>
            )}

            <div className="space-y-3 mb-4 sm:mb-6">
              <button
                onClick={createMeeting}
                disabled={isCreating || (!user && !displayName.trim())}
                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 text-sm sm:text-base rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                    New Meeting
                  </>
                )}
              </button>

              <button
                onClick={openScheduleMeeting}
                className="w-full bg-white hover:bg-gray-50 border-2 border-black text-black font-semibold py-3 sm:py-4 text-sm sm:text-base rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                Schedule Meeting
              </button>
            </div>

            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-white text-gray-500">or join with code</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter meeting code"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && roomId.trim() && joinMeeting()}
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              />
              <button
                onClick={joinMeeting}
                disabled={!roomId.trim() || (!user && !displayName.trim())}
                className="px-6 py-2.5 sm:py-3 bg-white border-2 border-black text-black text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Schedule Meeting Modal */}
      {user && (
        <ScheduleMeeting
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          userEmail={user.email}
          userName={user.name}
        />
      )}
    </div>
  );
}
