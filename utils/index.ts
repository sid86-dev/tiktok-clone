import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { IUser } from '../types';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  var decoded: { name: string, picture: string, sub: string } = jwt_decode(response.credential);
  const { name, picture, sub } = decoded;

  const user: IUser = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
  };

  addUser(user);

  await axios.post('/api/auth', user)

};