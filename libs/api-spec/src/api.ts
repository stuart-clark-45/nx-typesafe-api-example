import {EndpointDef, ErrorType, ReqOptions, ResOptions} from 'typesafe-api';

// These are the options that will be sent with every request to our API. In this example
// we are going to implement some dummy authentication for our API using the
// "authorization" header. If you don't have any default parameters then just use {@link ReqOptions}
// instead of defining a custom interface
export interface DefaultReqOpts extends ReqOptions {
  headers: {
    // If using express these headers keys must always be lowercase
    authorization: string;
  }
}

// Here we define the standard error codes we expect to see. All API should expect a 500
// (nothing is perfect). As we are implementing authentication let's add 403 as well
// You can add error codes to specific endpoints later
export type DefaultErrorCodes = 500 | 403;

// Create an interface to help us build our endpoints, this just saves adding {@code DefaultReqOpts}
// and {@code DefaultErrorType} to every endpoint we create
export type ExampleApiEndpoint<
  ReqOpt extends ReqOptions,
  RespOpt extends ResOptions,
  E = ErrorType<DefaultErrorCodes>,
  > = EndpointDef<DefaultReqOpts, ReqOpt, RespOpt, E>
