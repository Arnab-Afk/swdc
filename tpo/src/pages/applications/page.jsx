import { useState } from "react";
import { FaDownload, FaFilter, FaSearch, FaEllipsisH } from 'react-icons/fa';

export default function Applications() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const applications = [
    {
      id: "APP001",
      student: {
        name: "John Doe",
        id: "S2021001",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      job: {
        title: "Software Engineer",
        company: "TechCorp",
      },
      appliedDate: "Apr 15, 2023",
      status: "In Review",
    },
    {
      id: "APP002",
      student: {
        name: "Alice Smith",
        id: "S2021002",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      job: {
        title: "Data Analyst",
        company: "DataSystems",
      },
      appliedDate: "Apr 10, 2023",
      status: "Selected",
    },
    {
      id: "APP003",
      student: {
        name: "Robert Johnson",
        id: "S2021003",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      job: {
        title: "DevOps Engineer",
        company: "CloudNet",
      },
      appliedDate: "Apr 12, 2023",
      status: "Rejected",
    },
    {
      id: "APP004",
      student: {
        name: "Maria Perez",
        id: "S2021004",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      job: {
        title: "UI/UX Designer",
        company: "FinTech Inc",
      },
      appliedDate: "Apr 8, 2023",
      status: "Interview",
    },
    {
      id: "APP005",
      student: {
        name: "David Lee",
        id: "S2021005",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      job: {
        title: "Product Manager",
        company: "MediTech",
      },
      appliedDate: "Apr 5, 2023",
      status: "Selected",
    },
  ];

  const filteredApplications = applications
    .filter(app => statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase())
    .filter(app => 
      searchTerm === "" || 
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "In Review":
        return "bg-yellow-100 text-yellow-800";
      case "Selected":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Interview":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50">
          <FaDownload className="mr-2 h-4 w-4" />
          Export
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            className="w-full sm:w-[180px] border border-gray-300 rounded-md py-2 px-3"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="in review">In Review</option>
            <option value="interview">Interview</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 text-sm">
            <FaFilter className="mr-2 h-3 w-3" />
            More Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">All Applications</h2>
          <p className="text-sm text-gray-500">Track and manage student applications for job postings.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">Application ID</th>
                <th className="px-6 py-3 text-left">Student</th>
                <th className="px-6 py-3 text-left">Job Position</th>
                <th className="px-6 py-3 text-left">Company</th>
                <th className="px-6 py-3 text-left">Applied Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{application.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 overflow-hidden">
                        {application.student.avatar ? (
                          <img src={application.student.avatar} alt={application.student.name} />
                        ) : (
                          application.student.name.split(" ").map((n) => n[0]).join("")
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span>{application.student.name}</span>
                        <span className="text-xs text-gray-500">{application.student.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{application.job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{application.job.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{application.appliedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                          id={`options-menu-${application.id}`}
                          aria-expanded="true"
                          aria-haspopup="true"
                        >
                          <FaEllipsisH className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}