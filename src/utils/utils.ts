import { ServerResponse, IncomingMessage } from 'http';
import { User } from '../interfaces/interfaces';

export class Utils {

  public async getRequestBody(req: IncomingMessage): Promise<string>{
    return new Promise((res, rej) => {
      try {
        let requestBody = '';
        req.on('data', (data) => {
          requestBody += data;
        });
        req.on('end', () => {
          res(requestBody);
        });
      } catch (error) {
        rej(error);
      }
    });
  };

  public showData(res: ServerResponse, status: number, message?: { statusCode?: number, message: string } | User[] | User) {
    return new Promise((response) => {
      res.writeHead(status, { 'Content-Type': 'application/json' });
      if (!message) {
        response(res.end());
      } else {
        response(res.end(JSON.stringify(message)));
      }
    });
  };
}
