import { IncomingMessage, ServerResponse } from "http";
import { showMessageWithStatus, StatusCodeMessage } from "../constants/constants";
import { validate } from "uuid";
import { getRequestBody, showData } from "../utils/utils";
import { Services } from "../services/services";

export class Controller {
  
  constructor(private services: Services){}

  public async getUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const users = await this.services.getAllUsers();
    showData(res, 200, users);
  };

  public async createUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const requestBody = await getRequestBody(req);
    const requestBodyToObject = JSON.parse(requestBody);
    const { username, age, hobbies } = requestBodyToObject;
    if (!requestBodyToObject.username || !requestBodyToObject.age || !requestBodyToObject.hobbies) {
      showData(res, 400, showMessageWithStatus(StatusCodeMessage.noRequiredFields));
    } else {
      const newUser = await this.services.createNewUser({ username, age, hobbies });
      showData(res, 201, newUser);
    }
  };

  public async findUserById(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
    const userToFind = await this.services.getUser(id);
    if (userToFind) {
      showData(res, 200, userToFind);
    } else if (!validate(id)) {
      showData(res, 400, showMessageWithStatus(StatusCodeMessage.wrongId));
    } else {
      showData(res, 404, showMessageWithStatus(StatusCodeMessage.noSuchUser));
    }
  };

  public async deleteUserById(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
    const userToDelete = await this.services.getUser(id);
    if (userToDelete) {
      await this.services.deleteUser(id)
      showData(res, 204);
    } else if (!validate(id)) {
      showData(res, 400, showMessageWithStatus(StatusCodeMessage.wrongId));
    } else {
      showData(res, 404, showMessageWithStatus(StatusCodeMessage.noSuchUser));
    }
  };

  public async updateUserById(req: IncomingMessage, res: ServerResponse, id: string):Promise<void> {
    const userToUpdate = await this.services.getUser(id);
    if (userToUpdate && validate(id)) {
      const requestBody = await getRequestBody(req);
      const requestBodyToObject = JSON.parse(requestBody);
      const newUserOptions = {
        username: requestBodyToObject.username ?? userToUpdate.username,
        age: requestBodyToObject.age ?? userToUpdate.age,
        hobbies: requestBodyToObject.hobbies ?? userToUpdate.hobbies,
      }
      const updatedUser = await this.services.updateUser(id, newUserOptions)
      showData(res, 200, updatedUser);
    } else if (!validate(id)) {
      showData(res, 400, showMessageWithStatus(StatusCodeMessage.wrongId));
    } else {
      showData(res, 404, showMessageWithStatus(StatusCodeMessage.noSuchUser));
    }
  };
}
