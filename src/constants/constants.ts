export const USERS_ENDPOINT = '/api/users';

export enum StatusCode {
  USER_ID_INVALID = 'User ID is invalid (not uuid).',
  USER_DOESNOT_EXIST = `User with such ID does't exist.`,
  NO_REQUIRED_FIELDS = 'Not all the required fields are filled.',
  SERVER_ERROR = 'Server error. Try again.'
}
