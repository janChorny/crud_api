import { User } from '../interfaces/interfaces';
import { ServerResponse } from 'http';
import { storage } from '../constants/constants';
import { v4 } from 'uuid';
import { IncomingMessage } from 'http';

export const showData = (res: ServerResponse, status: number, message?: { message: string } | User[] | User) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  if (!message) {
    res.end();
  } else {
    res.end(JSON.stringify(message));
  }
};

export const getRequestBody = (req: IncomingMessage) => {
  return new Promise<string>((res,rej) => {
    try {
      let requestBody = '';
      req.on('data', (data) => {
        requestBody += data;
      });
      req.on('end', () => {
        res(requestBody);
      });
    } catch (error) {
      rej(error);
    }
  });
};

let { users } = storage;

export const getAllUsers = () => {
  return new Promise<User[]>((res) => {
    res(users);
  });
};

export const createNewUser = (user: User) => {
  return new Promise<User>((res) => {
    const addedUser = { id: v4(), ...user };
    users.push(addedUser);
    res(addedUser);
  });
};

export const getUser = (id: string) => {
  return new Promise<User | undefined>((res) => {
    const userToFind = users.filter(el => el.id === id)[0];
    res(userToFind);
  });
};

export const deleteUser = (id: string) => {
  return new Promise<void>((res) => {
    users = users.filter(el => el.id !== id);
    res();
  });
};

export const updateUser = (id: string, userInfo: User) => {
  return new Promise<User>((res) => {
    const userIndex= users.findIndex(el => el.id === id);
    users[userIndex] = { id, ...userInfo };
    res(users[userIndex]);
  });
};
