# postsAndComments
Node application to manage posts and comments based on express framework

## Required environment
```
1) nodejs v18.17.1 - to install visit https://nodejs.org/en/download/
2) postgres v14.10 - to install visit https://www.postgresql.org/download/
```

## Project setup
```
npm install
or
yarn
```

### Create and configurate .env
```
PORT - data base host address
BASE_URL - application url name or ip address
SECRET_KEY - JWT token (example: aafd57c5493d2a0ba1a567b83b1cc77d23eae455e5952385840765ab379b4e5c)
DATABASE_URL - pg database url (example: postgres://login:password@localhost/postsAndComments)
DATABASE_TEST_URL - pg test database url (example: postgres://login:password@localhost/postsAndCommentsTest)
```

### Run migrations
```
To migrate main database:
yarn migrate up

To migrate test database:
yarn migrate-test up

```

### Compiles and hot-reloads
```
Hot-reloads:
yarn dev

Compiles:
yarn build

Run builded project:
yarn start
```


### Run tests
```
yarn test
```