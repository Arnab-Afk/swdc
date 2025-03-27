import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApiProvider } from './contexts/ApiContext';
import DashboardLayout from './layouts/DashboardLayout';
import Applications from './pages/Applications';

// Import these pages as they're created
// import Students from './pages/Students';
// import Companies from './pages/Companies';
// import Jobs from './pages/Jobs';
// import Reports from './pages/Reports';
// import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<div>Dashboard Home</div>} />
            <Route path="students" element={<div>Students Page</div>} />
            <Route path="companies" element={<div>Companies Page</div>} />
            <Route path="jobs" element={<div>Jobs Page</div>} />
            <Route path="applications" element={<Applications />} />
            <Route path="reports" element={<div>Reports Page</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
          </Route>

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 Route */}
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-red-500">404</h1>
                <p className="text-xl mt-2">Page not found</p>
              </div>
            </div>
          } />
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;