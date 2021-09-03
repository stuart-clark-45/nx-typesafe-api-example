import express, { RequestHandler } from 'express';
import { addRoute, ExpressRoute } from 'typesafe-api';
import { helloWorldController } from './app/hello-world';
import {
  helloWoldRoute,
  HelloWorldEndpointDef,
} from '@nx-typesafe-api-example/api-spec';
import cors from 'cors';
import { authorize } from './app/authorize';

const app = express();

app.use(cors(), express.json());

// Define the middleware we want for the route
const middleware: RequestHandler[] = [authorize()];

// Import the route from the api-spec then add the additional fields needed for an {@link ExpressRoute}
const eHelloWorldRoute: ExpressRoute<HelloWorldEndpointDef> = {
  ...helloWoldRoute,
  middleware,
  controller: helloWorldController,
};

// Add the route to the express app
addRoute(app, eHelloWorldRoute);

// Start the server
const port = 7809;
const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
