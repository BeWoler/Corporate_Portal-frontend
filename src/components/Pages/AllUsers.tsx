import { FC, useState } from 'react';
import { User } from '../../models/user';
import { Button } from '@mui/material';
import UserService from '../../services/UserService';

const AllUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async() => {
    const response = await UserService.fetchUsers();
    setUsers(response.data);
  }
  return(
    <ul>
      <Button onClick={getUsers}>Get users</Button>
      {users.map((user) => <div>{user.email}</div>)}
    </ul>
  );
}

export default AllUsers;