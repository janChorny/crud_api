import { createNewUser, deleteUser, getAllUsers, getRequestBody, getUser, showData, updateUser } from "../services/services";
import { IncomingMessage, ServerResponse } from 'http';
import { showMessageWithStatus, StatusCodeMessage } from "../constants/constants";
import { validate } from "uuid";

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  const users = await getAllUsers();
  showData(res, 200, users);
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  const requestBody = await getRequestBody(req);
  const requestBodyToObject = JSON.parse(requestBody);
  const { username, age, hobbies } = requestBodyToObject;
  if (!requestBodyToObject.username || !requestBodyToObject.age || !requestBodyToObject.hobbies) {
    showData(res, 400, showMessageWithStatus(StatusCodeMessage.noRequiredFields));
  } else {
    const newUser = await createNewUser({ username, age, hobbies });
    showData(res, 201, newUser);
  }
};

export const findUserById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const userToFind = await getUser(id);
  if (userToFind){
    showData(res, 200, userToFind);
  } else if (!validate(id)) {
    showData(res, 400, showMessageWithStatus(StatusCodeMessage.wrongId));
  } else {
    showData(res, 404, showMessageWithStatus(StatusCodeMessage.noSuchUser));
  }
};

export const deleteUserById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const userToDelete = await getUser(id);
  if (userToDelete) {
    await deleteUser(id)
    showData(res, 204);
  } else if (!validate(id)) {
    showData(res, 400, showMessageWithStatus(StatusCodeMessage.wrongId));
  } else {
    showData(res, 404, showMessageWithStatus(StatusCodeMessage.noSuchUser));
  }
};

export const updateUserById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const userToUpdate = await getUser(id);
  if (userToUpdate && validate(id)) {
    const requestBody = await getRequestBody(req);
    const requestBodyToObject = JSON.parse(requestBody);
    const newUserOptions = {
      username: requestBodyToObject.username ?? userToUpdate.username,
      age: requestBodyToObject.age ?? userToUpdate.age,
      hobbies: requestBodyToObject.hobbies ?? userToUpdate.hobbies,
    }
    const updatedUser = await updateUser(id, newUserOptions)
    showData(res, 200, updatedUser);
  } else if (!validate(id)) {
    showData(res, 400, showMessageWithStatus(StatusCodeMessage.wrongId));
  } else {
    showData(res, 404, showMessageWithStatus(StatusCodeMessage.noSuchUser));
  }
};
