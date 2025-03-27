import { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    application: true,
    jobAlerts: false,
    interview: true,
  });
  
  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium mb-4">Account Settings</h3>
          
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                value="john.doe@example.com"
                readOnly
              />
              <p className="mt-1 text-sm text-gray-500">Your email cannot be changed</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-3"
                placeholder="Current password"
              />
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-3"
                placeholder="New password"
              />
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm new password"
              />
            </div>
            
            <button 
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive emails for important updates</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Application Updates</h4>
                <p className="text-sm text-gray-500">Receive notifications when your application status changes</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={notifications.application}
                  onChange={() => handleNotificationChange('application')}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Job Alerts</h4>
                <p className="text-sm text-gray-500">Receive notifications for new job postings that match your profile</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={notifications.jobAlerts}
                  onChange={() => handleNotificationChange('jobAlerts')}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Interview Reminders</h4>
                <p className="text-sm text-gray-500">Receive reminders for upcoming interviews</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={notifications.interview}
                  onChange={() => handleNotificationChange('interview')}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
          
          <button 
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
        
        <div className="border border-red-200 rounded-md p-4 bg-red-50">
          <h4 className="font-medium">Delete Account</h4>
          <p className="text-sm text-gray-600 mt-1 mb-3">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;