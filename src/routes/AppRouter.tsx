import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import LoginPage from "../Pages/Login/LoginPage";
import RegistrationPage from "../Pages/Registration/RegistrationPage";
import UserSettingsPage from "../Pages/Settings/UserSettingsPage";
import ChangePasswordPage from "../Pages/ChangePassword/ChangePasswordPage";
import UserProfilePage from "../Pages/Profile/UserProfilePage";
import Board from "../Pages/Board/Board";
import Friends from "../Pages/Friends/Friends";
import Admin from "../Admin/Admin";
import RequireAuth from "../hoc/RequireAuth";
import AfterAuth from "../hoc/AfterAuth";
import RequireAdminAuth from "../hoc/RequireAdminAuth";
import UsersPage from "../Pages/UsersPage/UsersPage";
import ChangeAvatarPage from "../Pages/ChangeAvatar/ChangeAvatarPage";
import MessengerPage from "../Pages/MessengerPage/MessengerPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="users"
          element={
            <RequireAuth>
              <UsersPage />
            </RequireAuth>
          }
        />
        <Route
          path="friends/:userId"
          element={
            <RequireAuth>
              <Friends />
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
              <MessengerPage />
            </RequireAuth>
          }
        />
        <Route
          path="settings/avatar"
          element={
            <RequireAuth>
              <ChangeAvatarPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <Admin />
            </RequireAdminAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Board />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
