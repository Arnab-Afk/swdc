const DashboardHome = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">Applied Jobs</h3>
          <p className="text-3xl font-bold mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">Interviews</h3>
          <p className="text-3xl font-bold mt-2">1</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">Offers</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>
      
      {/* Recent Applications */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Recent Applications</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold">Company</th>
                <th className="py-3 px-4 font-semibold">Position</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Tech Corp</td>
                <td className="py-3 px-4">Software Developer</td>
                <td className="py-3 px-4">Mar 24, 2025</td>
                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Applied</span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Data Systems</td>
                <td className="py-3 px-4">Full Stack Engineer</td>
                <td className="py-3 px-4">Mar 20, 2025</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Interview</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">InnoTech</td>
                <td className="py-3 px-4">Frontend Developer</td>
                <td className="py-3 px-4">Mar 15, 2025</td>
                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Applied</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 pl-4">
            <p className="text-sm text-gray-500">Apr 2, 2025 • 10:00 AM</p>
            <h4 className="font-medium">Interview with Data Systems</h4>
            <p className="text-sm text-gray-600">Virtual - Google Meet</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-sm text-gray-500">Apr 5, 2025 • 02:00 PM</p>
            <h4 className="font-medium">Campus Recruitment Drive</h4>
            <p className="text-sm text-gray-600">Main Auditorium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;