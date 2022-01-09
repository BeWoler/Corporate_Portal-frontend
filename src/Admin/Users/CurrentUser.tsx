import { User } from "../../models/user";
import "./users.css";

interface CurrentUserProps {
  currentUser: User;
}

const CurrentUser = ({ currentUser }: CurrentUserProps) => {
  return (
    <div className="currentUser__box">
      <h3 className="currentUser__title">Current User: </h3>
      <ul className="currentUser__data__ul">
        <li className="currentUser__data__li">
          {currentUser.firstName && currentUser.lastName
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : null}
        </li>
        <li className="currentUser__data__li">
          {currentUser.email ? `Email: ${currentUser.email}` : null}
        </li>
        <li className="currentUser__data__li">
          {currentUser.city ? `City: ${currentUser.city}` : null}
        </li>
        <li className="currentUser__data__li">
          {currentUser.birthday
            ? `Birthday: ${currentUser.birthday.split("-").reverse().join(".")}`
            : null}
        </li>
        <li className="currentUser__data__li">
          {currentUser.department
            ? `Department: ${currentUser.department}`
            : null}
        </li>
        <li className="currentUser__data__li">
          {currentUser.skype ? `Skype: ${currentUser.skype}` : null}
        </li>
        <li className="currentUser__data__li">
          {currentUser.education ? `Education: ${currentUser.education}` : null}
        </li>
        <li className="currentUser__data__li">
          {currentUser.phone ? `Phone: ${currentUser.phone}` : null}
        </li>
        <li className="currentUser__data__li">
          {currentUser.role ? `Role: ${currentUser.role}` : null}
        </li>
      </ul>
    </div>
  );
};

export default CurrentUser;
