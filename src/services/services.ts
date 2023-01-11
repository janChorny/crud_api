import { User } from '../interfaces/interfaces';
import { ServerResponse } from 'http';
import { storage } from '../constants/constants';

export const showData = (res: ServerResponse, status: number, message?: { message: string } | User[]) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  if (!message) {
    res.end();
  } else {
    res.end(JSON.stringify(message));
  }
};

let { users } = storage;

export const getAllUsers = () => {
  return new Promise<User[]>((res) => {
    res(users);
  });
};
