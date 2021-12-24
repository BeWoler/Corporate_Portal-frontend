import { FC, useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { User } from "../../models/user";
import { Context } from "../../index";
import { URL } from "../../http/axios";
import { Link } from "react-router-dom";
import "./friends.css";

const Friends: FC = () => {
  const { store } = useContext(Context);
  const [friends, setFriends] = useState<User[]>([]);
  return (
    <div className='friends__container'>
      <h2 className='friends__title'>Friends</h2>
      <div className='friends__box'>
        <ul className='firends__ul'>

        </ul>
      </div>
    </div>
  )
}

export default Friends
