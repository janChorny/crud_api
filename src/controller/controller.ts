import { createNewUser, deleteUser, getAllUsers, getRequestBody, getUser, showData } from "../services/services";
import { IncomingMessage, ServerResponse } from 'http';
import { StatusCode } from "../constants/constants";
import { validate } from "uuid";

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  const users = await getAllUsers();
  showData(res, 200, users);
}

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  const requestBody = await getRequestBody(req);
  const requestBodyToObject = JSON.parse(requestBody);
  const { username, age, hobbies } = requestBodyToObject;
  if (!requestBodyToObject.username || !requestBodyToObject.age || !requestBodyToObject.hobbies) {
    showData(res, 400, {message: StatusCode.NO_REQUIRED_FIELDS});
  } else {
    const newUser = await createNewUser({ username, age, hobbies });
    showData(res, 201, newUser);
  }
}

export const findUserById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const userToFind = await getUser(id);
  if (userToFind){
    showData(res, 200, userToFind);
  } else if (!validate(id)) {
    showData(res, 400, { message: StatusCode.USER_ID_INVALID });
  } else {
    showData(res, 404, { message: StatusCode.USER_DOESNOT_EXIST });
  }
}

export const deleteUserById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const userToDelete = await getUser(id);
  if (userToDelete && validate(id)) {
    await deleteUser(id)
    showData(res, 204);
  } else if (userToDelete && !validate(id)) {
    showData(res, 400, { message: StatusCode.USER_ID_INVALID });
  } else {
    showData(res, 404, { message: StatusCode.USER_DOESNOT_EXIST });
  }
}
