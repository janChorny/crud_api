import { Users } from "../interfaces/interfaces";
import 'dotenv/config';

export const USERS_ENDPOINT = '/api/users';

export const PORT = Number(process.env.PORT) || 4000;

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

export enum StatusMessage {
  wrongId,
  noSuchUser,
  noRequiredFields,
}

interface StatusMessageSpec {
  statusCode: number,
  message: string
}

export const showMessageWithStatus = (status: StatusMessage): StatusMessageSpec => {
  switch (status) {
    case StatusMessage.wrongId:
      return { statusCode: 400, message: StatusCode.USER_ID_INVALID };
    case StatusMessage.noSuchUser:
      return { statusCode: 404, message: StatusCode.USER_DOESNOT_EXIST };
    case StatusMessage.noRequiredFields:
      return { statusCode: 400, message: StatusCode.NO_REQUIRED_FIELDS };
  }
}

