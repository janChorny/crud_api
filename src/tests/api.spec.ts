import request from 'supertest';
import { StatusCodeText } from '../constants/constants';
import { runAPI } from '../api';
import { User } from "../interfaces/interfaces";

const CRUD_API = runAPI();
const apiUsers = `/api/users`;
const userInfo = {
  username: 'newUser',
  age: 20,
  hobbies: ['sports', 'reading'],
};
const newUserInfo = {
  username: 'newUser',
  age: 25,
  hobbies: ['sleeping', 'languages'],
}
const noExistUser = `${apiUsers}/b9b05eff-7e19-4330-8796-5fdc66c77ca6`;
const invalidUser = `${apiUsers}/b9b05eff-7e19-4330-8796-5fdc66c77ca`;

describe('From creating user to deleting it', () => {
  let user: User;
  let id: string;

  it('Get all records with a GET api/users request (an empty array is expected)', async () => {
    const response = await request(CRUD_API).get(apiUsers);
    expect(response.body).toEqual([]);
    expect(response.statusCode).toBe(200);
  });

  it('A new object is created by a POST api / users request(a response containing newly created record is expected) ', async () => {
    const response = await request(CRUD_API).post(apiUsers).send(userInfo);
    ({ id } = response.body);

    user = { id, ...userInfo };
    expect(response.body).toEqual(user);
    expect(response.statusCode).toBe(201);
  });

  it('With a GET api/users/{userId} request, we try to get the created record by its id (the created record is expected)', async () => {
    const response = await request(CRUD_API).get(`${apiUsers}/${id}`);
    expect(response.body).toEqual(user);
    expect(response.statusCode).toBe(200);
  });

  it('We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)', async () => {
    const response = await request(CRUD_API).put(`${apiUsers}/${id}`).send(newUserInfo);
    user = { id, ...newUserInfo };
    expect(response.body).toEqual(user);
    expect(response.statusCode).toBe(200);
  });

  it('With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)', async () => {
    const response = await request(CRUD_API).delete(`${apiUsers}/${id}`);
    expect(response.statusCode).toBe(204);
  });

  it('With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)', async () => {
    const response = await request(CRUD_API).get(`${apiUsers}/${id}`);
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text).message).toBe(StatusCodeText.USER_DOESNOT_EXIST);
  });
});

describe('From creating user to no valid user', () => {
  let user: User;
  let id: string;

  it('Get all records with a GET api/users request (an empty array is expected)', async () => {
    const response = await request(CRUD_API).get(apiUsers);
    expect(response.body).toEqual([]);
    expect(response.statusCode).toBe(200);
  });

  it('A new object is created by a POST api / users request(a response containing newly created record is expected) ', async () => {
    const response = await request(CRUD_API).post(apiUsers).send(userInfo);
    ({ id } = response.body);
    user = { id, ...userInfo };
    expect(response.body).toEqual(user);
    expect(response.statusCode).toBe(201);
  });

  it('With a GET api/users/{userId} request, we try to get the created record by its id (the created record is not expected)', async () => {
    const response = await request(CRUD_API).get(invalidUser);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).message).toBe(StatusCodeText.USER_ID_INVALID);
  });

  it('We try to update the created record with a PUT api/users/{userId}request (a response of invalid user id is expected)', async () => {
    const response = await request(CRUD_API).put(invalidUser).send(newUserInfo);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).message).toBe(StatusCodeText.USER_ID_INVALID);
  });

  it('With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)', async () => {
    const response = await request(CRUD_API).delete(`${apiUsers}/${id}`);
    expect(response.statusCode).toBe(204);
  });

  it('With a GET api/users/{userId} request, we are trying to get a deleted object by id (a response of invalid user id is expected)', async () => {
    const response = await request(CRUD_API).get(invalidUser);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).message).toBe(StatusCodeText.USER_ID_INVALID);
  });
});

describe('From creating user to no existing user', () => {
  let user: User;
  let id: string;

  it('Get all records with a GET api/users request (an empty array is expected)', async () => {
    const response = await request(CRUD_API).get(apiUsers);
    expect(response.body).toEqual([]);
    expect(response.statusCode).toBe(200);
  });

  it('A new object is created by a POST api / users request(a response containing newly created record is expected) ', async () => {
    const response = await request(CRUD_API).post(apiUsers).send(userInfo);
    ({ id } = response.body);
    user = { id, ...userInfo };
    expect(response.body).toEqual(user);
    expect(response.statusCode).toBe(201);
  });

  it('With a GET api/users/{userId} request, we try to get the created record by its id (the created record is not expected)', async () => {
    const response = await request(CRUD_API).get(noExistUser);
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text).message).toBe(StatusCodeText.USER_DOESNOT_EXIST);
  });

  it('We try to update the created record with a PUT api/users/{userId}request (a response of no existing user id is expected)', async () => {
    const response = await request(CRUD_API).put(noExistUser).send(newUserInfo);
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text).message).toBe(StatusCodeText.USER_DOESNOT_EXIST);
  });

  it('With a DELETE api/users/{userId} request, we delete the created object by id (a response of no existing user id is expected))', async () => {
    const response = await request(CRUD_API).delete(noExistUser);
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text).message).toBe(StatusCodeText.USER_DOESNOT_EXIST);
  });

  it('With a GET api/users/{userId} request, we are trying to get a deleted object by id (a response of no existing user id is expected))', async () => {
    const response = await request(CRUD_API).get(noExistUser);
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text).message).toBe(StatusCodeText.USER_DOESNOT_EXIST);
  });
});
