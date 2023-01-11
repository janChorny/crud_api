import { Users } from "../interfaces/interfaces";

export const USERS_ENDPOINT = '/api/users';

export const PORT = 4000;

export enum StatusCode {
  USER_ID_INVALID = 'User ID is invalid (not uuid).',
  USER_DOESNOT_EXIST = `User with such ID does't exist.`,
  NO_REQUIRED_FIELDS = 'Not all the required fields are filled.',
  SERVER_ERROR = 'Server error. Try again.'
}

export const storage: Users = {
  users: [
    // {
    //   id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    //   username: 'Example',
    //   age: 33,
    //   hobbies: ['sports', 'languages'],
    // },
  ],
}


