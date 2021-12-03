# Installation

- Run `yarn setup`. This is going to install all the dependencies and copy over the `.env` file.
- Second step is to modify the `.env`. Take a look at [configuring the .env file](#configuring-the-env-file)
- Run `yarn setup:db`. This is going to create the tables and seed one product so you can start using the app straight away.

## Configuring the .env file

`.env` file will hold all the ENV variables that will be used by the app. Copy over `.env.example` to `.env`, this can be done by running `yarn setup:env`.

The `.env` file allows you to configure things like `SERVER_PORT`, `CLIENT_PORT` and `DB_PATH`

# Running the server locally

Go to server directory and run `yarn dev`

# Running the client locally

Go to client directory and run `yarn dev`

