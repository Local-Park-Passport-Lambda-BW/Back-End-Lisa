
FOR LOCAL FUNCTIONALITY:

Here are the steps.

- Clone the repo
- npm install
- npx knex migrate:latest
- npx knex seed:run
- npm start


The React code should should use "dynamic" URLs for the endpoints. If process.env.NODE_ENV is "development", the base URL for the endpoints should be something like http://localhost:4400. If it's "production", it should be something like https://someapp.herokuapp.com. The NODE_ENV will be one or the other depending on whether the frontend was bundled with start or with build.

The React devs can see when new commits are pushed to the master branch of the backend repo thanks to VSCode. To develop against the latest and greatest, they should (A) delete their local SQLite db (because the migration code might have changed), (B) pull the latest, and (C) re-run the install, migration and start scripts.

