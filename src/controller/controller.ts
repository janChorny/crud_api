import { Methods } from "../methods/methods";
import { createServer } from 'http';
import { Utils } from "../utils/utils";
import { PORT, showMessageWithStatus, StatusCodeMessage, USERS_ENDPOINT } from "../constants/constants";

export class Controller {

  constructor(
    private methods: Methods,
    private utils: Utils) {
  }

  public async createNewServer() {
    const server = createServer(async (req, res) => {
      try {
        let id = req.url?.split('/')[3];
        if (id) {
          switch (req.method) {
            case 'GET':
              await this.methods.findUserById(req, res, id);
              break;

            case 'DELETE':
              await this.methods.deleteUserById(req, res, id);
              break;

            case 'PUT':
              await this.methods.updateUserById(req, res, id);
              break;

            default:
              break;
          }
        } else if (req.url === USERS_ENDPOINT) {
          switch (req.method) {
            case 'GET':
              await this.methods.getUsers(req, res);
              break;

            case 'POST':
              await this.methods.createUser(req, res);
              break;

            default:
              break;
          }
        } else {
          this.utils.showData(res, 404, showMessageWithStatus(StatusCodeMessage.wrongWay));
        }
      } catch (error) {
        this.utils.showData(res, 500, showMessageWithStatus(StatusCodeMessage.errorOnServerSide));
      }

    });

    server.listen(PORT, 'localhost', () => {
      console.log(`Server is listening on http://localhost:${PORT}/`);
    });

    return server;
  }
}
