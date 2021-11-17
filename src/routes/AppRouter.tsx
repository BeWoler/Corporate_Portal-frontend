import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import MainPage from "../Pages/MainPage";
import LoginPage from "../Pages/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage";
import PrivateComponent from "../Pages/PrivateComponent";
import AllUsers from "../Pages/AllUsers";
import UserSettingsPage from "../Pages/UserSettingsPage";
import ChangePasswordPage from "../Pages/ChangePasswordPage";

const AppRouter = () => {
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token").length < 217
    ) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const AfterAuth = ({ children }: { children: JSX.Element }) => {
    if (localStorage.getItem("token")) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="private"
          element={
            <RequireAuth>
              <PrivateComponent />
            </RequireAuth>
          }
        />
        <Route
          path="users"
          element={
            <RequireAuth>
              <AllUsers />
            </RequireAuth>
          }
        />
        <Route
          path="login"
          element={
            <AfterAuth>
              <LoginPage />
            </AfterAuth>
          }
        />
        <Route
          path="registration"
          element={
            <AfterAuth>
              <RegistrationPage />
            </AfterAuth>
          }
        />
        <Route
          path="settings"
          element={
            <RequireAuth>
              <UserSettingsPage />
            </RequireAuth>
          }
        />
        <Route
          path="settings/password"
          element={
            <RequireAuth>
              <ChangePasswordPage />
            </RequireAuth>
          }
        />
        <Route index element={<MainPage />} />
        <Route path="*" element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
