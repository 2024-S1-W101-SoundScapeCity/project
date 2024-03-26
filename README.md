readme file
## Accessing Soundscape City
https://soundscape-city.web.app/

## Important Packages

This project uses npm as a package manager: https://www.npmjs.com
npm 9.8

This project uses node.js as a runtime environment for javascript: https://nodejs.org/en
node v20.5.1

## Git Notes

wip has been used for any commits that are not ready to be merged into the master
or release branch.

## Client-side

the client-side services have been built using vue-cli: https://cli.vuejs.org

## Server-side

The server-side services have been built using express: https://expressjs.com

This server uses react as a javascript framework for user interfaces. To install and use vue3, use npm: https://vueframework.com/guide/installation.html#npm
npm install vue

## Setup:

After cloning the project, install the required dependencies for both the server and client:
  npm install

## Documentation:

To run this web application locally:
1. Start the server
   cd server
   npm start
   
2. Run the client
   cd client
   npm run serve

To generate a build of the web application:
  npm run build

Once a build has been generated, this can be tested using:
  firebase serve

Once the build is ready for production:
  firebase deploy

Be sure to push the working build to the release branch after cahanges have been implemented and tested.
