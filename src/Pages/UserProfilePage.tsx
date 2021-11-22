import { FC, useContext } from 'react'
import { Context } from "../index";
import { Avatar } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Input, Button } from '@mui/material';
import "../styles/userProfile.css"

const UserProfilePage: FC = () => {
  const { store } = useContext(Context);

  return (
    <div className="profile__container">
      <div className="profile__first__column">
        <Avatar sx={{
          width: "200px",
          height: "200px",
          margin: "0 0 1.5rem 0",
          backgroundColor: "#bf4444",
          fontSize: "50px"
        }}>{store.user.firstName}</Avatar>
        <ul className="profile__info">
          {store.user.birthday ? <li className="profile__info__list">My Birthday: {store.user.birthday.split('-').reverse().join('.')}</li> : null}
          {store.user.position ? <li className="profile__info__list">Position: {store.user.position}</li> : null}
          {store.user.department ? <li className="profile__info__list">Department: {store.user.department}</li> : null}
          {store.user.education ? <li className="profile__info__list">Education: {store.user.education}</li> : null}
          {store.user.skype ? <li className="profile__info__list">Skype: {store.user.skype}</li> : null}
          {store.user.phone ? <li className="profile__info__list">Phone: {store.user.phone}</li> : null}
        </ul>
      </div>
      <div className="profile__second__column">
        <p className="profile__name">{store.user.firstName && store.user.lastName ? `${store.user.firstName} ${store.user.lastName}`: "I don't have a name"}</p>
        <div>
          <ul className="profile__board">
            <li className="profile__board__list">
              Friends
              <span>20</span>
            </li>
            <li className="profile__board__list">
              Posts
              <span>25</span>
            </li>
            <li className="profile__board__list">
              Projects
              <span>10</span>
            </li>
          </ul>
        </div>
        <p className="profile__about">
          {store.user.description ? `About me: ${store.user.description}` : "Nothing at now..."}
        </p>
        <div className="profile__posts">
          <form className="posts__create">
            <Input type="file" sx={{
              margin: "0 0 1rem 0",
              width: "fit-content",
              ":after": { borderBottom: "2px solid #bf4444" },
              
            }}/>
            <Input type="text" placeholder="Tell us something" multiline={true} sx={{
              margin: "0 0 1rem 0",
              ":after": { borderBottom: "2px solid #bf4444" }
            }} />
            <Button variant="contained"        sx={{
          margin: "2rem 2rem 1rem 2rem",
          backgroundColor: "#bf4444",
          ":hover": {
            backgroundColor: "#bc6464",
          },
        }}>Create Post</Button>
          </form>
          <div className="posts__list"></div>
        </div>
      </div>
    </div>
  )
}

export default observer(UserProfilePage);
