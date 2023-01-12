import { createServer } from 'http';
import { PORT, USERS_ENDPOINT } from './constants/constants';
import { createUser, deleteUserById, findUserById, getUsers, updateUserById } from './controller/controller';

export const API = () => {
  const server = createServer(async (req, res) => {
    let id = req.url?.split('/')[3];
    if (id){
      switch (req.method) {
        case 'GET':
          await findUserById(req, res, id);
          break;

        case 'DELETE':
          await deleteUserById(req, res, id);
          break;

        case 'PUT':
          await updateUserById(req, res, id);
          break;
      
        default:
          break;
      }
    } else if (req.url === USERS_ENDPOINT) {
      switch (req.method) {
        case 'GET':
          await getUsers(req, res);
          break;

        case 'POST':
          await createUser(req, res);
          break;

        default:
          break;
      }
    }
  });

  server.listen(PORT, 'localhost', () => {
    console.log(`Server is listening on http://localhost:${PORT}/`);
  });

  return server;
}
