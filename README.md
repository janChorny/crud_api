# CRUD API (Create, read, update, delete)

###To begin with:
1. Clone this repository - git clone https://github.com/janChorny/crud_api.git
2. Install dependencies - run 'npm install'

###Use either development or production mode:
Development mode -  npm run start:dev
Production mode - npm run start:prod

###Run Postman or something else to check requests:
**GET** `api/users` - get all users (first run starts with an empty array);
**GET** `api/users/{userId}`- get user by ID;
**POST** `api/users` - create record new user and add it to users array;
**PUT** `api/users/{userId}` - update existing user;
**DELETE** `api/users/{userId}` - delete existing user from users array;

###Users are stored as `objects` that have following properties:
- `id` — unique identifier (`string`, `uuid`) generated on server side;
- `username` — user's name (`string`, **required**);
- `age` — user's age (`number`, **required**);
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**);
