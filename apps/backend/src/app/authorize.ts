import {NextFunction, RequestHandler} from 'express';
import {ExampleApiEndpoint} from '@nx-typesafe-api-example/api-spec';
import {ReqOptions, ResOptions, sendError, TRequest, TResponse} from 'typesafe-api';

// Create a type that can be used to represent any endpoint in our API
type AnyEndpointDef = ExampleApiEndpoint<ReqOptions, ResOptions>

const handler: RequestHandler = (req: TRequest<AnyEndpointDef>, res: TResponse<AnyEndpointDef>, next: NextFunction) => {

  // Use {@code req.get(..)} to get headers in a typesafe way
  // Naive implementation of authentication
  // DONT TRY THIS AT HOME
  if (req.get('authorization') === "my-api-key") {
    return next()
  }

  // This error object is typesafe, including the status so you can only select from the
  // statuses given in {@link DefaultErrorCodes} (defined in the app spec)
  sendError(res, {
    status: 403,
    msg: 'Unauthorized'
  })

};

export const authorize = (): RequestHandler => handler;
