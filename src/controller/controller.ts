import { getAllUsers, showData } from "../services/services";
import { IncomingMessage, ServerResponse } from 'http';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  const users = await getAllUsers();
  showData(res, 200, users);
}
