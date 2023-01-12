import { createNewUser, getAllUsers, getRequestBody, showData } from "../services/services";
import { IncomingMessage, ServerResponse } from 'http';
import { StatusCode } from "../constants/constants";

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
