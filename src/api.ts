import { Controller } from "./controller/controller";
import { Server } from "./server";
import { Services } from "./services/services";


export class API {
  
  public async runAPI(){
    const services = new Services();
    const controller = new Controller(services);
    const server = new Server(controller);
    server.createNewServer();
  }
}
