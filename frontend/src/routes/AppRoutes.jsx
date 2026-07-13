import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminTasksPage from "../pages/AdminTasksPage";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
function AppRoutes() {
  return (
    <Routes>
      <Route
  path="/"
  element={
    <AuthLayout>
      <LoginPage />
    </AuthLayout>
    
  }
/>
      <Route
  path="/register"
  element={
    <AuthLayout>
      <RegisterPage />
    </AuthLayout>
   
  }
/>
      <Route
  path="/forgot-password"
  element={
<AuthLayout>
      <ForgotPasswordPage />
    </AuthLayout>
    
  }
/>
      <Route
  path="/reset-password"
  element={
    <AuthLayout>
      <ResetPasswordPage />
    </AuthLayout>
    
  }
/>
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    </ProtectedRoute>
  }
/>
      <Route
  path="/profile"
  element={
    <ProtectedRoute><MainLayout>
      <ProfilePage />
    </MainLayout></ProtectedRoute>
    
  }
/>
      <Route
  path="/admin"
  element={
    <ProtectedRoute><MainLayout>
      <AdminDashboardPage />
    </MainLayout></ProtectedRoute>
    
  }
/>
      <Route
  path="/admin/users"
  element={
    <ProtectedRoute><MainLayout>
      <AdminUsersPage />
    </MainLayout></ProtectedRoute>
    
  }
/>
      <Route
  path="/admin/tasks"
  element={
    <ProtectedRoute><MainLayout>
      <AdminTasksPage />
    </MainLayout></ProtectedRoute>
    
  }
/>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;