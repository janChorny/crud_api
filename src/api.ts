import { Methods } from "./methods/methods";
import { Controller } from "./controller/controller";
import { Services } from "./services/services";
import { Utils } from "./utils/utils";


export class API {

  public async runAPI() {
    const services = new Services();
    const utils = new Utils()
    const methods = new Methods(services, utils);
    const controller = new Controller(methods, utils);
    await controller.createNewServer();
  }
}
