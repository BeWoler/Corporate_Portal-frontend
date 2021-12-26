import {FC, useEffect, useState, useContext} from 'react';
import { Context } from "../../index";
import "./friendsList.css";

const FriendsList: FC = () => {
  const { store } = useContext(Context);
  const [friends, setFriends] = useState();

  useEffect(() => {
    
  }, [])

  return (
    <ul className="friends__list">
      
    </ul>
  )
}

export default FriendsList;
