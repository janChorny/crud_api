import { User } from "../interfaces/interfaces";
import { v4 } from "uuid";

export class Services {
  private storage: User[] = [];

  public async getAllUsers(): Promise<User[]> {
      return new Promise((res) => {
        res(this.storage);
      });
  };

  public async createNewUser(user: User): Promise<User>{
      return new Promise((res) => {
        const addedUser = { id: v4(), ...user };
        this.storage.push(addedUser);
        res(addedUser);
      });
  };

  public async getUser(id: string): Promise<User> {
      return new Promise((res) => {
        const userToFind = this.storage.filter(el => el.id === id)[0];
        res(userToFind);
      });
  };

  public async deleteUser(id: string): Promise<void> {
      return new Promise((res) => {
        this.storage = this.storage.filter(el => el.id !== id);
        res();
      });
  };

  public async updateUser(id: string, userNewInfo: User): Promise<User>  {
      return new Promise(async (res) => {
        const user = Object.assign(await this.getUser(id), userNewInfo);
        res(user)
      });
  };
}
