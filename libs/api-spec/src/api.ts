import {
  AbstractEndpointDef,
  EndpointDef,
  ErrorType,
  ReqOptions,
  ResOptions,
  TypesafeHttpError,
} from '@typesafe-api/core';

// These are the options that will be sent with every request to our API. In this example
// we are going to implement some dummy authentication for our API using the
// "authorization" header. If you don't have any default parameters then just use {@link ReqOptions}
// instead of defining a custom interface
export interface DefaultReqOpts extends ReqOptions {
  headers: {
    // If using express these headers keys must always be lowercase
    authorization: string;
  };
}

// Here we define the standard error codes we expect to see. All API should expect a 500
// (nothing is perfect). As we are implementing authentication let's add 403 as well
// You can add error codes to specific endpoints later
export type DefaultErrorCodes = 500 | 403;

export interface ApiErrorBody {
  msg: string;
}

export type ApiErrorType<S extends number> = ErrorType<S, ApiErrorBody>;

export type AbstractApiErrorType = ApiErrorType<number>;

export class ApiHttpError extends TypesafeHttpError<AbstractApiErrorType> {}

// Writing a helper function like this can make it easier to throw errors and keep them typesafe
export const throwHttpError = <T extends AbstractEndpointDef>(statusCode: T["errorType"]["statusCode"], msg: string) => {
  throw new ApiHttpError({
    statusCode: statusCode,
    body: {
      msg,
    },
  });
};

// Create an interface to help us build our endpoints, this just saves adding {@code DefaultReqOpts}
// and {@code DefaultErrorType} to every endpoint we create
export type ExampleApiEndpoint<
  ReqOpt extends ReqOptions,
  RespOpt extends ResOptions,
  E extends AbstractApiErrorType = ApiErrorType<DefaultErrorCodes>
> = EndpointDef<DefaultReqOpts, ReqOpt, RespOpt, E>;

export type AbstractExampleApiEndpoint = ExampleApiEndpoint<ReqOptions, ResOptions>;
