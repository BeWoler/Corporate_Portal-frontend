import { FC } from "react";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import "./changePasswordPage.css";

const ChangePasswordPage: FC = () => {
  return (
    <div className="changePasswordPage__container">
      <h2 className="changePasswordPage__title">Change Password</h2>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;
