import { createServer } from 'http';
import { PORT } from './constants/constants';
import { createUser, getUsers } from './controller/controller';

export const API = () => {
  const server = createServer(async (req, res) => {

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
    
  });

  server.listen(PORT, 'localhost', () => {
    console.log(`Server is listening on http://localhost:${PORT}/`);
  });

  return server;
}
