import { Controller, sendError, TRequest, TResponse } from 'typesafe-api';
import { HelloWorldEndpointDef } from '@nx-typesafe-api-example/api-spec';

export const helloWorldController: Controller<HelloWorldEndpointDef> = (
  req: TRequest<HelloWorldEndpointDef>,
  res: TResponse<HelloWorldEndpointDef>
) => {
  // `req.query` is typesafe so you know which keys have been set in the request
  const name = req.query.yourName;

  // As an example, let's return an error the name parameter is a number
  const isNumber = (s: string) => /^\d+$/.test(s);
  if (isNumber(name)) {
    // This error object is typesafe, including the status so you can only select from the
    // statuses given in the endpoint definition
    return sendError(res, {
      status: 400,
      msg: "Surely your name isn't a number?? 😵",
    });
  }

  // No surprises, this body is typesafe too!
  res.send({
    msg: `Hello ${name} from an express backend`,
    date: new Date(),
  });
};
