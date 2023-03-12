import { Controller } from "./controller/controller";
import { createServer } from 'http';
import { Utils } from "./utils/utils";
import { PORT, showMessageWithStatus, StatusCodeMessage, USERS_ENDPOINT } from "./constants/constants";
import { Services } from "./services/services";

export function runAPI() {
  const services = new Services();
  const utils = new Utils()
  const methods = new Controller(services, utils);
  const server = createServer(async (req, res) => {
    try {
      let id = req.url?.split('/')[3];
      if (id) {
        switch (req.method) {
          case 'GET':
            await methods.findUserById(req, res, id);
            break
          case 'DELETE':
            await methods.deleteUserById(req, res, id);
            break
          case 'PUT':
            await methods.updateUserById(req, res, id);
            break
          default:
            break;
        }
      } else if (req.url === USERS_ENDPOINT) {
        switch (req.method) {
          case 'GET':
            await methods.getUsers(req, res);
            break
          case 'POST':
            await methods.createUser(req, res);
            break
          default:
            break;
        }
      } else {
        utils.showData(res, 404, showMessageWithStatus(StatusCodeMessage.wrongWay));
      }
    } catch (error) {
      utils.showData(res, 500, showMessageWithStatus(StatusCodeMessage.errorOnServerSide));
    }
  });

  server.listen(PORT, 'localhost', () => {
    console.log(`Server is listening on http://localhost:${PORT}/`);
  });

  return server;
}
