# CRUD API (Create, read, update, delete)
### To begin with:
1. Clone this repository - git clone https://github.com/janChorny/crud_api.git
2. Go to downloaded folder - cd crud_api
3. Move to 'development' - git checkout development
4. Install dependencies - npm install'
5. Rename .env.example to .env in the root directory

### Use either development or production mode:
- Development mode -  npm run start:dev
- Production mode - npm run start:prod

### Run test
npm test

### Users are stored as `objects` that have following properties:
- `id` — unique identifier (`string`, `uuid`) generated on server side;
- `username` — user's name (`string`, **required**);
- `age` — user's age (`number`, **required**);
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**);

### Run Postman or something else to check requests:
1. **GET** `api/users` - get all users (first run starts with an empty array);
2. **GET** `api/users/{userId}`- get user by ID;
3. **POST** `api/users` - create record new user and add it to users array;
4. **PUT** `api/users/{userId}` - update existing user;
5. **DELETE** `api/users/{userId}` - delete existing user from users array;

### In Postman it looks like:
1. GET 'http://localhost:5000/api/users'
2. POST 'http://localhost:4000/api/users' 
   body->raw     
   {
        "username": "newUser",
        "age": 40,
        "hobbies": [
            "fishing",
            "reading"
        ]
    }
3. GET 'http://localhost:4000/api/users/a2e2f307-9c5f-42d9-b9f2-ad2a78de4f56'
4. PUT 'http://localhost:4000/api/users/a2e2f307-9c5f-42d9-b9f2-ad2a78de4f56'
   body->raw
      {
        "username": "newUser2",
        "age": 20,
        "hobbies": [
            "music",
            "sports"
        ]
    }
5. DELETE 'http://localhost:4000/api/users/a2e2f307-9c5f-42d9-b9f2-ad2a78de4f56'

