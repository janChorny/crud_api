import { StatusCodeMessageSpec } from "../interfaces/interfaces";
import "dotenv/config";

export const USERS_ENDPOINT = '/api/users';

export const PORT = Number(process.env.PORT) || 4000;

export enum StatusCodeText {
  USER_ID_INVALID = 'User ID is invalid (not uuid).',
  USER_DOESNOT_EXIST = `User with such ID does't exist.`,
  NO_REQUIRED_FIELDS = 'Not all the required fields are filled.',
  SERVER_ERROR = 'Server error. Try again.',
  WRONG_WAY = `Wrong request. Use like 'http://localhost:4000/api/users/{userID}'`
}

export enum StatusCodeMessage {
  wrongId,
  noSuchUser,
  noRequiredFields,
  errorOnServerSide,
  wrongWay,
}

export const showMessageWithStatus = (status: StatusCodeMessage): StatusCodeMessageSpec => {
  switch (status) {
    case StatusCodeMessage.wrongId:
      return { statusCode: 400, message: StatusCodeText.USER_ID_INVALID };
    case StatusCodeMessage.noSuchUser:
      return { statusCode: 404, message: StatusCodeText.USER_DOESNOT_EXIST };
    case StatusCodeMessage.noRequiredFields:
      return { statusCode: 400, message: StatusCodeText.NO_REQUIRED_FIELDS };
    case StatusCodeMessage.errorOnServerSide:
      return { statusCode: 500, message: StatusCodeText.SERVER_ERROR };
    case StatusCodeMessage.wrongWay:
      return { statusCode: 404, message: StatusCodeText.WRONG_WAY };
  }
}

