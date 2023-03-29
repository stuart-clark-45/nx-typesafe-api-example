import {
  typesafeApi,
  typesafeApiErrors,
  TypesafeApiHandler,
} from '@typesafe-api/serverless';
import {
  HelloWorldEndpointDef,
  throwHttpError,
} from '@nx-typesafe-api-example/api-spec';
import middy from '@middy/core';

const handlerFn: TypesafeApiHandler<HelloWorldEndpointDef> = async (
  event,
  context
) => {
  // `req.query` is typesafe so you know which keys have been set in the request
  const name = event.typesafeApi.query.yourName;

  // As an example, let's return an error the name parameter is a number
  const isNumber = (s: string) => /^\d+$/.test(s);
  if (isNumber(name)) {
    throwHttpError<HelloWorldEndpointDef>(
      400,
      "Surely your name isn't a number?? 😵"
    );
  }

  return {
    statusCode: 200,
    body: {
      msg: `Hello ${name} from a serverless backend`,
      date: new Date(),
    },
  };
};

// Finally we need to add the typesafe api middleware to our handler. It can be useful to create a
// function manage this and any other standard middleware your handlers use.
export const handler = middy(handlerFn)
  // Add the typesafe api middleware, this is responsible for parsing requests
  .use(typesafeApi())
  // Error handling middleware
  .use(
    typesafeApiErrors({
      // Custom logging functions can be added here, by default console.log will be used
      httpErrorLogFn: undefined,
      otherErrorLogFn: undefined,
      // The default error body that will be returned to users when an unhandled error occurs
      internalServerErrorBody: {
        msg: 'Internal server error',
      },
    })
  );
