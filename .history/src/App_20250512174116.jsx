import { useState } from 'react';
import InstallButton from './InstallButton/InstallButton';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import CategoriesPage from './pages/CategoriesPage';
import DevelopersPage from './pages/DevelopersPage';
import CasesPage from './pages/CasesPage';
import HomePage from './pages/HomePage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:categorySlug" element={<HomePage />} />
        <Route path="/:categorySlug/:caseId" element={<HomePage />} />
        <Route path="/:caseId" element={<HomePage />} />
        {/* если slug нужен в path */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<CategoriesPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="developers" element={<DevelopersPage />} />
          <Route path="cases" element={<CasesPage />} />
        </Route>
      </Routes>
      <InstallButton />
    </>
  );
}

export default App;
