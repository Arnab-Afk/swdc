import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApiProvider } from './contexts/ApiContext';
import { AuthProvider } from './contexts/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/Dashboard/DashboardHome';

// These would be imported from their respective files in a full implementation
const Login = () => <div>Login Page</div>;
const StudentList = () => <div>Student List Page</div>;
const StudentDetail = () => <div>Student Detail Page</div>;
const CompanyList = () => <div>Company List Page</div>;
const CompanyDetail = () => <div>Company Detail Page</div>;
const JobList = () => <div>Job List Page</div>;
const JobDetail = () => <div>Job Detail Page</div>;
const JobApproval = () => <div>Job Approval Page</div>;
const Reports = () => <div>Reports Page</div>;
const Settings = () => <div>Settings Page</div>;
const NotFound = () => <div>404 Not Found</div>;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('tpo_auth_token');
  // return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <AuthProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              
              {/* Student Routes */}
              <Route path="students" element={<StudentList />} />
              <Route path="students/:id" element={<StudentDetail />} />
              
              {/* Company Routes */}
              <Route path="companies" element={<CompanyList />} />
              <Route path="companies/:id" element={<CompanyDetail />} />
              
              {/* Job Routes */}
              <Route path="jobs" element={<JobList />} />
              <Route path="jobs/:id" element={<JobDetail />} />
              <Route path="jobs/approval" element={<JobApproval />} />
              
              {/* Other Routes */}
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
