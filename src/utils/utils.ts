import { ServerResponse, IncomingMessage } from 'http';
import { User } from '../interfaces/interfaces';

export const getRequestBody = (req: IncomingMessage): Promise<string> => {
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

export const showData = (res: ServerResponse, status: number, message?: { statusCode?: number, message: string } | User[] | User) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  if (!message) {
    res.end();
  } else {
    res.end(JSON.stringify(message));
  }
};

