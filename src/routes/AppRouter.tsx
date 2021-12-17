import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import MainPage from "../Pages/MainPage";
import LoginPage from "../Pages/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage";
import AllUsers from "../Pages/AllUsers";
import UserSettingsPage from "../Pages/UserSettingsPage";
import ChangePasswordPage from "../Pages/ChangePasswordPage";
import UserProfilePage from "../Pages/UserProfilePage";
import Board from "../Pages/Board";
import Messenger from "../Pages/Messenger/Messenger";
import ChangeAvatar from "../Pages/ChangeAvatar";

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
      return <Navigate to="/board" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="users"
          element={
            <RequireAuth>
              <AllUsers />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <RequireAuth>
              <UserProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
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
        <Route
          path="board"
          element={
            <RequireAuth>
              <Board />
            </RequireAuth>
          }
        />
        <Route
          path="chat"
          element={
            <RequireAuth>
              <Messenger />
            </RequireAuth>
          }
        />
        <Route
          path="settings/avatar"
          element={
            <RequireAuth>
              <ChangeAvatar />
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
