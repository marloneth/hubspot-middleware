# Hubspot Middleware

This repo was developed to create an API that is working as a middleware between [Hubspot API](https://developers.hubspot.com/docs/api/overview) and the final user.

It consists in a simple API built with Nodejs and Express which is using the [Hubspot API Nodejs library](https://github.com/HubSpot/hubspot-api-nodejs) to interact with it.

It is possible to get Hubspot contacts, filter them by email, create new ones, edit the existing ones and also delete them.

## Installation

### Requirements

- Node v20.10.0
- Git (for clone the repo)

### Steps

1. Clone the repository on your local machine.

```sh
git clone git@github.com:marloneth/hubspot-middleware.git
```

2. Create a new `.env` file on your root directory.

```sh
cd hubspot-middleware
touch .env
```

3. Fill the `.env` file with the required env variables, please take a look at `.env.example` to know what variables you need.

4. Install dependencies

```sh
npm install
```

5. Done. The server is ready to be run.

## Run the server

To run the server you have two options:

1. Run it in development mode.

```sh
npm run start:dev
```

2. Build it and run it in production mode.

```sh
npm run start
```

## Execute unit tests

To execute the unit tests you just need to run the related command.

```sh
npm run test
```

That will start running the tests suites and will show if everything was ok or if some test failed.
