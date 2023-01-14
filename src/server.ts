import { Controller } from "./controller/controller";
import { createServer } from 'http';
import { showData } from "./utils/utils";
import { PORT, showMessageWithStatus, StatusCodeMessage, USERS_ENDPOINT } from "./constants/constants";

export class Server {

constructor(private controller: Controller){}

  public async createNewServer(){
  const server = createServer(async (req, res) => {
    try {
      let id = req.url?.split('/')[3];
      if (id) {
        switch (req.method) {
          case 'GET':
            await this.controller.findUserById(req, res, id);
            break;

          case 'DELETE':
            await this.controller.deleteUserById(req, res, id);
            break;

          case 'PUT':
            await this.controller.updateUserById(req, res, id);
            break;

          default:
            break;
        }
      } else if (req.url === USERS_ENDPOINT) {
        switch (req.method) {
          case 'GET':
            await this.controller.getUsers(req, res);
            break;

          case 'POST':
            await this.controller.createUser(req, res);
            break;

          default:
            break;
        }
      } else {
        showData(res, 404, showMessageWithStatus(StatusCodeMessage.wrongWay));
      }
    } catch (error) {
      showData(res, 500, showMessageWithStatus(StatusCodeMessage.errorOnServerSide));
    }

  });

  server.listen(PORT, 'localhost', () => {
    console.log(`Server is listening on http://localhost:${PORT}/`);
  });

  return server;
  }
}
