import {createError, createHandler, TypesafeApiHandler} from '../../lib';
import { HelloWorldEndpointDef } from '@nx-typesafe-api-example/api-spec';

export const typesafeHandler: TypesafeApiHandler<HelloWorldEndpointDef> = async (
  event,
  context
) => {

  // `req.query` is typesafe so you know which keys have been set in the request
  const name = event.typesafeApi.query.yourName;

  // As an example, let's return an error the name parameter is a number
  const isNumber = (s: string) => /^\d+$/.test(s);
  if (isNumber(name)) {
    // This error object is typesafe, including the status so you can only select from the
    // statuses given in the endpoint definition
    return createError({
      status: 400,
      msg: "Surely your name isn't a number?? 😵",
    });
  }

  return {
    statusCode: 200,
    body: {
      msg: `Hello ${name} from a serverless backend`,
      date: new Date(),
    }
  };
};

export const handler = createHandler<HelloWorldEndpointDef>(typesafeHandler);
