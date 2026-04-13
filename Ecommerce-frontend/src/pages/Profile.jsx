import React, { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    username: 'janedoe88',
    bio: 'Product Designer & Frontend Developer based in San Francisco. Building things for the web.',
    location: 'San Francisco, CA',
    website: 'https://janedoe.dev'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Saved user data:', userData);
    // Add API call here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          {/* Cover Photo Area */}
          <div className="h-32 sm:h-48 w-full bg-gradient-to-red from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="px-6 sm:px-10 pb-8">
            <div className="sm:flex sm:items-end sm:space-x-5">
              {/* Avatar */}
              <div className="relative -mt-16 sm:-mt-24">
                <img
                  className="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-white bg-white object-cover shadow-md"
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Jane&backgroundColor=f3f4f6"
                  alt="User avatar"
                />
              </div>
              
              {/* Header Info */}
              <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    {userData.firstName} {userData.lastName}
                  </h1>
                  <p className="text-sm text-gray-500">@{userData.username}</p>
                </div>
                
                {/* Edit Button */}
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Mobile Header Info (hidden on larger screens to prevent duplication) */}
            <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-sm text-gray-500">@{userData.username}</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex px-6 sm:px-10 space-x-8" aria-label="Tabs">
              {['profile', 'security', 'notifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors
                    ${activeTab === tab 
                      ? 'border-indigo-500 text-indigo-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Panels */}
          <div className="p-6 sm:p-10">
            {activeTab === 'profile' && (
              <form onSubmit={handleSave}>
                <div className="space-y-8 divide-y divide-gray-200">
                  
                  {/* Public Profile Section */}
                  <div>
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Public Profile</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                          About You
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="bio"
                            name="bio"
                            rows={3}
                            disabled={!isEditing}
                            value={userData.bio}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500 p-2"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="location"
                            id="location"
                            disabled={!isEditing}
                            value={userData.location}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border disabled:bg-gray-50 disabled:text-gray-500 p-2"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                          Website
                        </label>
                        <div className="mt-1">
                          <input
                            type="url"
                            name="website"
                            id="website"
                            disabled={!isEditing}
                            value={userData.website}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border disabled:bg-gray-50 disabled:text-gray-500 p-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information Section */}
                  <div className="pt-8">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Use a permanent address where you can receive mail.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            disabled={!isEditing}
                            value={userData.firstName}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border disabled:bg-gray-50 disabled:text-gray-500 p-2"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            disabled={!isEditing}
                            value={userData.lastName}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border disabled:bg-gray-50 disabled:text-gray-500 p-2"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            disabled={!isEditing}
                            value={userData.email}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border disabled:bg-gray-50 disabled:text-gray-500 p-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Actions */}
                {isEditing && (
                  <div className="pt-8 mt-8 border-t border-gray-200">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98]"
                      >
                        Save Settings
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}

            {/* Placeholder for other tabs */}
            {activeTab === 'security' && (
              <div className="text-center py-12 text-gray-500">Security Settings Panel (Password, 2FA, etc.)</div>
            )}
            {activeTab === 'notifications' && (
              <div className="text-center py-12 text-gray-500">Notification Preferences Panel (Email, SMS, Push)</div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;